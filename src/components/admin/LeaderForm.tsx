
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUpload from "./ImageUpload";
import { Leader } from "./LeaderCard";
import { useToast } from "@/hooks/use-toast";

interface LeaderFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (leader: Leader) => void;
  currentLeader: Leader | null;
}

const LeaderForm: React.FC<LeaderFormProps> = ({
  isOpen,
  onOpenChange,
  onSave,
  currentLeader
}) => {
  const { toast } = useToast();
  const [leaderName, setLeaderName] = useState("");
  const [leaderRole, setLeaderRole] = useState("");
  const [leaderBio, setLeaderBio] = useState("");
  const [leaderImage, setLeaderImage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset form when dialog opens with new leader data
  useEffect(() => {
    if (isOpen) {
      if (currentLeader) {
        setLeaderName(currentLeader.name);
        setLeaderRole(currentLeader.role);
        setLeaderBio(currentLeader.bio || "");
        setLeaderImage(currentLeader.image);
        setImagePreview(currentLeader.image);
      } else {
        setLeaderName("");
        setLeaderRole("");
        setLeaderBio("");
        setLeaderImage("");
        setImagePreview(null);
      }
      setIsProcessing(false);
    }
  }, [isOpen, currentLeader]);

  const handleSave = () => {
    // Validate form
    if (!leaderName.trim() || !leaderRole.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name and Role)",
        variant: "destructive"
      });
      return;
    }

    if (isProcessing) {
      toast({
        title: "Processing",
        description: "Please wait while the image is being processed",
        variant: "default"
      });
      return;
    }

    const leader: Leader = {
      id: currentLeader ? currentLeader.id : crypto.randomUUID(),
      name: leaderName.trim(),
      role: leaderRole.trim(),
      bio: leaderBio.trim(),
      image: leaderImage || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };

    onSave(leader);
    
    // Clean up any blob URLs to prevent memory leaks
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const handleImageSelected = (imageUrl: string, base64: string) => {
    setIsProcessing(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      setImagePreview(imageUrl);
      setLeaderImage(base64);
      setIsProcessing(false);
      
      toast({
        title: "Image Processed",
        description: "Image has been optimized and compressed for storage",
      });
    }, 500);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open && imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {currentLeader ? "Edit Leader Profile" : "Add New Leader"}
          </DialogTitle>
          <DialogDescription>
            {currentLeader 
              ? "Make changes to the leader profile here. Click save when you're done."
              : "Add the details for the new leader below. Images will be automatically optimized for web storage."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
              placeholder="Enter leader's full name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role/Position *</Label>
            <Input
              id="role"
              value={leaderRole}
              onChange={(e) => setLeaderRole(e.target.value)}
              placeholder="e.g., Senior Pastor, Assistant Pastor, Deacon"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              value={leaderBio}
              onChange={(e) => setLeaderBio(e.target.value)}
              placeholder="Enter a detailed biography including background, experience, and ministry focus"
              rows={4}
              className="resize-none"
            />
          </div>
          <ImageUpload 
            imagePreview={imagePreview}
            onImageSelected={handleImageSelected}
            label="Profile Image"
          />
          {isProcessing && (
            <div className="text-sm text-gray-500 italic">
              Processing and optimizing image...
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleDialogClose(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isProcessing}
            className="bg-church-orange hover:bg-church-orange/90"
          >
            {isProcessing ? "Processing..." : "Save Leader"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderForm;
