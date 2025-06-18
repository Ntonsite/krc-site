
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon } from "lucide-react";
import { handleImageUpload } from "@/utils/imageUpload";

interface ImageUploadProps {
  imagePreview: string | null;
  onImageSelected: (imageUrl: string, base64: string) => void;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  imagePreview, 
  onImageSelected,
  label = "Image" 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    handleImageUpload(file, (result) => {
      if (result.imageUrl && result.base64) {
        onImageSelected(result.imageUrl, result.base64);
      }
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="image">{label}</Label>
      <div className="flex flex-col gap-2">
        {imagePreview && (
          <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleUploadClick} 
            type="button"
            className="flex items-center gap-1"
          >
            <Upload className="h-4 w-4" /> Upload {label}
          </Button>
          <Input 
            id="image-upload"
            ref={fileInputRef}
            type="file" 
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
