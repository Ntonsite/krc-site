
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContentSectionProps {
  title: string;
  content: any;
  language: 'english' | 'swahili';
  page: string;
  imageButtons: Array<{
    label: string;
    onClick: () => void;
  }>;
  onEditContent: (language: 'english' | 'swahili', page: string, section: string, field: string, value: string) => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  content,
  language,
  page,
  imageButtons,
  onEditContent
}) => {
  const renderContentItems = (items: any) => {
    return Object.keys(items).map((key) => {
      const value = items[key];
      const sectionName = key.replace(/Title$|Content$|Message$|Description$/, '');
      const fieldType = key.includes('Title') ? 'Title' : 
                        key.includes('Content') ? 'Content' : 
                        key.includes('Message') ? 'Message' : 'Description';
      
      return (
        <div 
          key={key} 
          className="cursor-pointer p-3 border rounded-md hover:bg-gray-50"
          onClick={() => onEditContent(language, page, sectionName, fieldType, value)}
        >
          <div className="font-medium">{value.length > 30 ? value.substring(0, 30) + '...' : value}</div>
          <div className="text-sm text-gray-500">{sectionName} - {fieldType}</div>
        </div>
      );
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-2">
          {imageButtons.map((button, index) => (
            <Button key={index} onClick={button.onClick} size="sm">
              {button.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {renderContentItems(content)}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentSection;
