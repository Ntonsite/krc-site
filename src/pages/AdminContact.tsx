
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminContact = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Contact information has been updated successfully",
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Contact Information</h1>
        <p className="text-gray-600 mt-1">
          Update church contact details that appear on the website
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Main Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Church Name</label>
              <Input defaultValue="Kinondoni Revival Church" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <Input defaultValue="info@kinondonirevival.org" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <Input defaultValue="+255 765 432 100" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Church Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Physical Address</label>
              <Input defaultValue="123 Kinondoni Rd" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <Input defaultValue="Dar es Salaam" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <Input defaultValue="Kinondoni" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Landmark Directions</label>
              <Textarea defaultValue="Located 200m from the Kinondoni Market, opposite the community center." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Facebook</label>
              <Input defaultValue="https://facebook.com/kinondonirevival" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Instagram</label>
              <Input defaultValue="https://instagram.com/kinondonirevival" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">YouTube</label>
              <Input defaultValue="https://youtube.com/c/kinondonirevival" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-church-orange hover:bg-church-orange/90" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
