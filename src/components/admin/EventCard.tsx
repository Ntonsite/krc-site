
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  return (
    <Card key={event.id} className="overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <p className="text-sm text-gray-500">{event.date}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 line-clamp-3">{event.description}</p>
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(event)}
            className="flex items-center"
          >
            <Edit className="mr-1 h-4 w-4" /> Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 flex items-center"
            onClick={() => onDelete(event)}
          >
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
