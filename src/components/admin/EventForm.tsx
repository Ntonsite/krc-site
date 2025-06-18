
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUpload from "./ImageUpload";
import { Event } from "./EventCard";
import { useToast } from "@/hooks/use-toast";

interface EventFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (event: Event) => void;
  currentEvent: Event | null;
}

const EventForm: React.FC<EventFormProps> = ({
  isOpen,
  onOpenChange,
  onSave,
  currentEvent
}) => {
  const { toast } = useToast();
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Reset form when dialog opens with new event data
  useEffect(() => {
    if (isOpen) {
      if (currentEvent) {
        setEventTitle(currentEvent.title);
        setEventDate(currentEvent.date);
        setEventDescription(currentEvent.description);
        setEventImage(currentEvent.image);
        setImagePreview(currentEvent.image);
      } else {
        setEventTitle("");
        setEventDate("");
        setEventDescription("");
        setEventImage("");
        setImagePreview(null);
      }
    }
  }, [isOpen, currentEvent]);

  const handleSave = () => {
    // Validate form
    if (!eventTitle.trim() || !eventDate.trim() || !eventDescription.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const event: Event = {
      id: currentEvent ? currentEvent.id : crypto.randomUUID(),
      title: eventTitle.trim(),
      date: eventDate.trim(),
      description: eventDescription.trim(),
      image: eventImage || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };

    onSave(event);
    
    // Clean up any blob URLs to prevent memory leaks
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const handleImageSelected = (imageUrl: string, base64: string) => {
    setImagePreview(imageUrl);
    setEventImage(base64);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{currentEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
          <DialogDescription>
            {currentEvent 
              ? "Make changes to your event here. Click save when you're done."
              : "Add the details for your new event below."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              placeholder="e.g., May 4, 2025"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Enter event description"
              rows={3}
            />
          </div>
          <ImageUpload 
            imagePreview={imagePreview}
            onImageSelected={handleImageSelected}
            label="Event Image"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
