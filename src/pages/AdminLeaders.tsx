
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import LeaderCard, { Leader } from '@/components/admin/LeaderCard';
import LeaderForm from '@/components/admin/LeaderForm';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

// Sample leaders data for initial state
const defaultLeaders = [
  {
    id: '1',
    name: 'Bishop Dr. Rogathe Z. Swai',
    role: 'Senior Pastor',
    image: 'https://images.unsplash.com/photo-1548449112-96a38a643324?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Bishop Dr. Rogathe has been serving as our Senior Pastor since 2005. With over 30 years in ministry, he is passionate about spreading the Gospel and leading the church with wisdom and compassion. He holds a Doctorate in Theology and has been instrumental in church growth and community outreach programs.'
  },
  {
    id: '2',
    name: 'Rev. Mary Johnson',
    role: 'Assistant Pastor',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Rev. Mary oversees our youth and women ministries. She joined Kinondoni Revival Church in 2012 and has been instrumental in community outreach programs. Her heart for service and dedication to mentoring young people has made a significant impact in our community.'
  },
  {
    id: '3',
    name: 'Deacon James Wilson',
    role: 'Head Deacon',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Deacon James coordinates our welfare and service ministries. He has been a faithful member of the church since its founding and brings decades of experience in community service. His leadership in organizing church activities and supporting families in need is truly commendable.'
  },
];

const AdminLeaders = () => {
  const { toast } = useToast();

  // State management
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentLeader, setCurrentLeader] = useState<Leader | null>(null);

  useEffect(() => {
    // Load leaders from localStorage or use default
    const storedLeaders = localStorage.getItem('krc_leaders');
    if (storedLeaders) {
      try {
        const parsedLeaders = JSON.parse(storedLeaders);
        setLeaders(parsedLeaders);
      } catch (error) {
        console.error('Error parsing stored leaders:', error);
        setLeaders(defaultLeaders);
        localStorage.setItem('krc_leaders', JSON.stringify(defaultLeaders));
      }
    } else {
      setLeaders(defaultLeaders);
      localStorage.setItem('krc_leaders', JSON.stringify(defaultLeaders));
    }
  }, []);

  const handleAddNewClick = () => {
    setCurrentLeader(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (leader: Leader) => {
    setCurrentLeader(leader);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (leader: Leader) => {
    setCurrentLeader(leader);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveLeader = (leader: Leader) => {
    let updatedLeaders;
    
    if (currentLeader) {
      // Update existing leader
      updatedLeaders = leaders.map(l => 
        l.id === leader.id ? leader : l
      );
      toast({
        title: "Leader Updated",
        description: `${leader.name}'s profile has been successfully updated.`,
      });
    } else {
      // Add new leader
      updatedLeaders = [...leaders, leader];
      toast({
        title: "Leader Added",
        description: `${leader.name}'s profile has been successfully created.`,
      });
    }

    // Update state and localStorage
    setLeaders(updatedLeaders);
    localStorage.setItem('krc_leaders', JSON.stringify(updatedLeaders));
    
    // Trigger storage event for other components to update
    window.dispatchEvent(new Event('storage'));
    
    setIsDialogOpen(false);
  };

  const handleDeleteLeader = () => {
    if (!currentLeader) return;
    
    // Filter out the leader to be deleted
    const updatedLeaders = leaders.filter(leader => leader.id !== currentLeader.id);
    
    // Update state and localStorage
    setLeaders(updatedLeaders);
    localStorage.setItem('krc_leaders', JSON.stringify(updatedLeaders));
    
    // Trigger storage event for other components to update
    window.dispatchEvent(new Event('storage'));
    
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Leader Deleted",
      description: `${currentLeader.name}'s profile has been successfully removed.`,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Leaders Management</h1>
          <p className="text-gray-600 mt-1">
            Add, edit, or remove church leadership profiles. All images are automatically optimized and stored as compressed base64.
          </p>
        </div>
        <Button 
          className="bg-church-orange hover:bg-church-orange/90 flex items-center gap-2"
          onClick={handleAddNewClick}
        >
          <Plus className="h-4 w-4" /> Add New Leader
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaders.map((leader) => (
          <LeaderCard
            key={leader.id}
            leader={leader}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {leaders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No leaders found. Click "Add New Leader" to create one.</p>
        </div>
      )}

      {/* Leader Edit/Create Dialog */}
      <LeaderForm
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveLeader}
        currentLeader={currentLeader}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteLeader}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${currentLeader?.name}'s profile? This action cannot be undone.`}
        itemName="Profile"
      />
    </div>
  );
};

export default AdminLeaders;
