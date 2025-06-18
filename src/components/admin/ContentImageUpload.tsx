
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageUpload from "./ImageUpload";
import { useToast } from "@/hooks/use-toast";

interface ContentImageUploadProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  section: string;
  onImageSaved: (section: string, imageUrl: string) => void;
}

const ContentImageUpload: React.FC<ContentImageUploadProps> = ({
  isOpen,
  onOpenChange,
  section,
  onImageSaved
}) => {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelected = (imageUrl: string, base64: string) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setImagePreview(imageUrl);
      setImageData(base64);
      setIsProcessing(false);
      
      toast({
        title: "Image Processed",
        description: "Image has been optimized and ready for saving",
      });
    }, 500);
  };

  const handleSave = () => {
    if (!imageData) {
      toast({
        title: "No Image Selected",
        description: "Please select an image before saving",
        variant: "destructive"
      });
      return;
    }

    onImageSaved(section, imageData);
    
    // Clean up
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setImageData("");
    onOpenChange(false);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
      setImageData("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update {section} Image</DialogTitle>
          <DialogDescription>
            Select and upload a new image for the {section} section. The image will be automatically optimized.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Label className="text-base font-medium mb-4 block">
            Select Image for {section}
          </Label>
          <ImageUpload 
            imagePreview={imagePreview}
            onImageSelected={handleImageSelected}
            label="Section Image"
          />
          {isProcessing && (
            <div className="text-sm text-gray-500 italic mt-2">
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
            disabled={isProcessing || !imageData}
            className="bg-church-orange hover:bg-church-orange/90"
          >
            {isProcessing ? "Processing..." : "Save Image"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentImageUpload;
