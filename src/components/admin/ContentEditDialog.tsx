
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EditingContent {
  section: string;
  field: string;
  value: string;
  language: 'english' | 'swahili';
  page: string;
}

interface ContentEditDialogProps {
  editingContent: EditingContent | null;
  onClose: () => void;
  onSave: () => void;
  onValueChange: (value: string) => void;
}

const ContentEditDialog: React.FC<ContentEditDialogProps> = ({
  editingContent,
  onClose,
  onSave,
  onValueChange
}) => {
  return (
    <Dialog open={!!editingContent} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
          <DialogDescription>
            Make changes to the selected content below.
          </DialogDescription>
        </DialogHeader>
        
        {editingContent && (
          <div className="py-4">
            <label className="block text-sm font-medium mb-2">
              {editingContent.section} {editingContent.field} 
              ({editingContent.language === 'english' ? 'English' : 'Swahili'})
            </label>
            <Textarea
              value={editingContent.value}
              onChange={(e) => onValueChange(e.target.value)}
              rows={5}
              className="w-full border rounded-md p-2"
            />
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentEditDialog;
