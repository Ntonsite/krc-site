
import React from 'react';

const ContentManagementInstructions: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
      <h3 className="font-medium text-blue-800">Content Management Instructions</h3>
      <p className="text-blue-700 text-sm mt-1">
        Click on any content section to edit text, or use the image buttons to update section images. 
        Changes are saved automatically and reflected immediately on the public website.
      </p>
    </div>
  );
};

export default ContentManagementInstructions;
