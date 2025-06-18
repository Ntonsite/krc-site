
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import EventCard, { Event } from '@/components/admin/EventCard';
import EventForm from '@/components/admin/EventForm';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

// In a real app, this would come from a database
const defaultEvents = [
  {
    id: '1',
    title: "Men's Day",
    date: "May 4, 2025",
    description: "Join us for a special Men's Day service with Bishop Dr. Rogathe Z. Swai. The theme is 'Men of Faith, Men of Action'.",
    image: "/lovable-uploads/24ed29dd-2470-4442-bb92-2e387d526605.png"
  },
  {
    id: '2',
    title: "Youth Conference",
    date: "June 15, 2025",
    description: "Annual youth conference focused on empowering the next generation with practical faith for today's challenges.",
    image: "https://images.unsplash.com/photo-1523803326055-13445f272bf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: '3',
    title: "Women's Prayer Meeting",
    date: "July 2, 2025",
    description: "Monthly women's prayer meeting focusing on family and community. Special guest speaker from Nairobi.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const AdminEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  
  useEffect(() => {
    // Load events from localStorage or use default
    const storedEvents = localStorage.getItem('krc_events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(defaultEvents);
      localStorage.setItem('krc_events', JSON.stringify(defaultEvents));
    }
  }, []);

  const handleAddNewClick = () => {
    setCurrentEvent(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (event: Event) => {
    setCurrentEvent(event);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (event: Event) => {
    setCurrentEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveEvent = (event: Event) => {
    let updatedEvents;
    
    if (currentEvent) {
      // Update existing event
      updatedEvents = events.map(e => 
        e.id === event.id ? event : e
      );
      toast({
        title: "Event Updated",
        description: "The event has been successfully updated.",
      });
    } else {
      // Add new event
      updatedEvents = [...events, event];
      toast({
        title: "Event Created",
        description: "The new event has been successfully created.",
      });
    }

    // Update state and localStorage
    setEvents(updatedEvents);
    localStorage.setItem('krc_events', JSON.stringify(updatedEvents));
    setIsDialogOpen(false);
  };

  const handleDeleteEvent = () => {
    if (!currentEvent) return;
    
    // Filter out the event to be deleted
    const updatedEvents = events.filter(event => event.id !== currentEvent.id);
    
    // Update state and localStorage
    setEvents(updatedEvents);
    localStorage.setItem('krc_events', JSON.stringify(updatedEvents));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Event Deleted",
      description: "The event has been successfully removed.",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-gray-600 mt-1">Add, edit, or remove church events</p>
        </div>
        <Button 
          className="bg-church-orange hover:bg-church-orange/90 flex items-center gap-2"
          onClick={handleAddNewClick}
        >
          <Plus className="h-4 w-4" /> Add New Event
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events found. Click "Add New Event" to create one.</p>
        </div>
      )}

      {/* Event Edit/Create Dialog */}
      <EventForm
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveEvent}
        currentEvent={currentEvent}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteEvent}
        title="Confirm Deletion"
        description="Are you sure you want to delete this event? This action cannot be undone."
        itemName="Event"
      />
    </div>
  );
};

export default AdminEvents;
