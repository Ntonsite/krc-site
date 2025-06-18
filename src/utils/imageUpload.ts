import { toast } from "@/hooks/use-toast";

export interface ImageUploadResult {
  imageUrl: string | null;
  base64?: string;
  error?: string;
}

// Function to compress image to a maximum size while maintaining quality
const compressImage = (canvas: HTMLCanvasElement, maxSizeKB: number = 200): string => {
  let quality = 0.9;
  let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
  
  // Keep reducing quality until we're under the size limit
  while (compressedDataUrl.length > maxSizeKB * 1024 * 1.37 && quality > 0.1) { // 1.37 accounts for base64 overhead
    quality -= 0.1;
    compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
  }
  
  return compressedDataUrl;
};

// Function to resize image if it's too large
const resizeImage = (img: HTMLImageElement, maxWidth: number = 800, maxHeight: number = 600): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Could not get canvas context');
  
  let { width, height } = img;
  
  // Calculate new dimensions
  if (width > height) {
    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }
  }
  
  canvas.width = width;
  canvas.height = height;
  
  // Draw image with high quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, width, height);
  
  return canvas;
};

export const handleImageUpload = (
  file: File,
  callback: (result: ImageUploadResult) => void
): void => {
  if (file.size > 10 * 1024 * 1024) { // 10MB limit for original file
    toast({
      title: "File too large",
      description: "The image must be less than 10MB",
      variant: "destructive"
    });
    callback({ imageUrl: null, error: "File too large" });
    return;
  }
  
  if (!file.type.startsWith('image/')) {
    toast({
      title: "Invalid file type",
      description: "Please upload an image file",
      variant: "destructive"
    });
    callback({ imageUrl: null, error: "Invalid file type" });
    return;
  }
  
  // Create a blob URL to preview the image
  const imageUrl = URL.createObjectURL(file);
  
  // Convert and compress image
  const img = new Image();
  img.onload = () => {
    try {
      // Resize image if necessary
      const canvas = resizeImage(img, 800, 600);
      
      // Compress to base64
      const compressedBase64 = compressImage(canvas, 200); // Target 200KB
      
      console.log(`Image compressed from ${(file.size / 1024).toFixed(2)}KB to ~${(compressedBase64.length * 0.75 / 1024).toFixed(2)}KB`);
      
      callback({ 
        imageUrl: imageUrl,
        base64: compressedBase64 
      });
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Error processing image",
        description: "Failed to process the uploaded image",
        variant: "destructive"
      });
      callback({ imageUrl: null, error: "Processing failed" });
    }
  };
  
  img.onerror = () => {
    toast({
      title: "Error loading image",
      description: "Failed to load the uploaded image",
      variant: "destructive"
    });
    callback({ imageUrl: null, error: "Loading failed" });
  };
  
  img.src = imageUrl;
};
