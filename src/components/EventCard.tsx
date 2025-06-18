
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Event } from '@/components/admin/EventCard';

interface EventCardProps {
  id?: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  description,
  image,
}) => {
  return (
    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
      {image && (
        <div className="relative h-48 w-full">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-center mb-2 text-church-orange">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{date}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-church-gray">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
