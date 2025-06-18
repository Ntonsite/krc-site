
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
}

interface LeaderCardProps {
  leader: Leader;
  onEdit: (leader: Leader) => void;
  onDelete: (leader: Leader) => void;
}

const LeaderCard: React.FC<LeaderCardProps> = ({ leader, onEdit, onDelete }) => {
  return (
    <Card key={leader.id} className="overflow-hidden">
      <div className="h-64 overflow-hidden">
        <img
          src={leader.image}
          alt={leader.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{leader.name}</CardTitle>
        <p className="text-gray-500">{leader.role}</p>
      </CardHeader>
      <CardContent>
        {leader.bio && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">{leader.bio}</p>
        )}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(leader)}
            className="flex items-center"
          >
            <Edit className="mr-1 h-4 w-4" /> Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 flex items-center"
            onClick={() => onDelete(leader)}
          >
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderCard;
