
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ContentEditDialog from '@/components/admin/ContentEditDialog';
import ContentSection from '@/components/admin/ContentSection';
import ContentImageUpload from '@/components/admin/ContentImageUpload';
import ContentManagementInstructions from '@/components/admin/ContentManagementInstructions';

// Sample content structure
const initialContent = {
  english: {
    homepage: {
      heroTitle: "Welcome to Kinondoni Revival Church",
      heroDescription: "Transforming lives through the power of God's word",
      welcomeMessage: "We are delighted to welcome you to Kinondoni Revival Church. We are a community of believers committed to sharing the love of Christ and making disciples.",
      serviceTimesTitle: "Service Times"
    },
    about: {
      churchHistoryTitle: "Our History",
      churchHistoryContent: "Founded in 1990, Kinondoni Revival Church has been serving the community for over three decades, bringing the message of hope and salvation.",
      visionTitle: "Our Vision",
      visionContent: "To raise disciples who will transform their communities through the power of the Gospel.",
      missionTitle: "Our Mission",
      missionContent: "To equip believers with the Word of God and empower them to fulfill their God-given purpose."
    }
  },
  swahili: {
    homepage: {
      heroTitle: "Karibu Kanisa la Ufufuo la Kinondoni",
      heroDescription: "Kubadilisha maisha kupitia nguvu ya neno la Mungu",
      welcomeMessage: "Tunafuraha kukukaribisha katika Kanisa la Ufufuo la Kinondoni. Sisi ni jamii ya waumini waliojitoa kushiriki upendo wa Kristo na kutengeneza wanafunzi.",
      serviceTimesTitle: "Nyakati za Ibada"
    },
    about: {
      churchHistoryTitle: "Historia Yetu",
      churchHistoryContent: "Ikianzishwa mwaka 1990, Kanisa la Ufufuo la Kinondoni limekuwa likihudumia jamii kwa zaidi ya miaka thelathini, likiwafikishia ujumbe wa tumaini na wokovu.",
      visionTitle: "Maono Yetu",
      visionContent: "Kuinua wanafunzi watakaobadilisha jamii zao kupitia nguvu ya Injili.",
      missionTitle: "Dhamira Yetu",
      missionContent: "Kuwatayarisha waumini kwa Neno la Mungu na kuwawezesha kutimiza malengo yao yaliyotolewa na Mungu."
    }
  }
};

// Initial images structure
const initialImages = {
  homepage: {
    hero: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    about: "https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  about: {
    history: "https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    vision: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
};

const AdminContent = () => {
  const [content, setContent] = useState(
    localStorage.getItem('krc_content') 
      ? JSON.parse(localStorage.getItem('krc_content')!) 
      : initialContent
  );
  
  const [images, setImages] = useState(
    localStorage.getItem('krc_images') 
      ? JSON.parse(localStorage.getItem('krc_images')!) 
      : initialImages
  );

  const [editingContent, setEditingContent] = useState<{
    section: string;
    field: string;
    value: string;
    language: 'english' | 'swahili';
    page: string;
  } | null>(null);

  const [imageUploadOpen, setImageUploadOpen] = useState(false);
  const [currentImageSection, setCurrentImageSection] = useState<string>("");

  const { toast } = useToast();

  const handleEdit = (language: 'english' | 'swahili', page: string, section: string, field: string, value: string) => {
    setEditingContent({
      language,
      page,
      section,
      field,
      value
    });
  };

  const handleSave = () => {
    if (!editingContent) return;
    
    const { language, page, section, field, value } = editingContent;
    const newContent = { ...content };
    
    // Update the content
    newContent[language][page][section + field] = value;
    
    // Save to state and localStorage
    setContent(newContent);
    localStorage.setItem('krc_content', JSON.stringify(newContent));
    
    // Trigger storage event for other components to update
    window.dispatchEvent(new Event('storage'));
    
    // Reset editing state
    setEditingContent(null);
    
    // Show success toast
    toast({
      title: "Content Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleImageUpload = (section: string) => {
    setCurrentImageSection(section);
    setImageUploadOpen(true);
  };

  const handleImageSaved = (section: string, imageUrl: string) => {
    const newImages = { ...images };
    
    // Determine the page and section
    if (section.includes('homepage')) {
      const imageKey = section.replace('homepage-', '');
      if (!newImages.homepage) newImages.homepage = {};
      newImages.homepage[imageKey] = imageUrl;
    } else if (section.includes('about')) {
      const imageKey = section.replace('about-', '');
      if (!newImages.about) newImages.about = {};
      newImages.about[imageKey] = imageUrl;
    }
    
    // Save to state and localStorage
    setImages(newImages);
    localStorage.setItem('krc_images', JSON.stringify(newImages));
    
    // Trigger storage event for other components to update
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "Image Updated",
      description: `${section} image has been successfully updated.`,
    });
  };

  const handleValueChange = (value: string) => {
    if (editingContent) {
      setEditingContent({ ...editingContent, value });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-gray-600 mt-1">
          Edit website content and images in both English and Swahili
        </p>
      </div>

      <Tabs defaultValue="english">
        <TabsList className="mb-4">
          <TabsTrigger value="english">English Content</TabsTrigger>
          <TabsTrigger value="swahili">Swahili Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="english" className="space-y-6">
          <ContentSection
            title="Home Page Content"
            content={content.english.homepage}
            language="english"
            page="homepage"
            imageButtons={[
              { label: "Update Hero Image", onClick: () => handleImageUpload('homepage-hero') },
              { label: "Update About Image", onClick: () => handleImageUpload('homepage-about') }
            ]}
            onEditContent={handleEdit}
          />

          <ContentSection
            title="About Page Content"
            content={content.english.about}
            language="english"
            page="about"
            imageButtons={[
              { label: "Update History Image", onClick: () => handleImageUpload('about-history') },
              { label: "Update Vision Image", onClick: () => handleImageUpload('about-vision') }
            ]}
            onEditContent={handleEdit}
          />
        </TabsContent>

        <TabsContent value="swahili" className="space-y-6">
          <ContentSection
            title="Maudhui ya Ukurasa wa Mwanzo"
            content={content.swahili.homepage}
            language="swahili"
            page="homepage"
            imageButtons={[
              { label: "Sasisha Picha ya Hero", onClick: () => handleImageUpload('homepage-hero') },
              { label: "Sasisha Picha ya Kuhusu", onClick: () => handleImageUpload('homepage-about') }
            ]}
            onEditContent={handleEdit}
          />

          <ContentSection
            title="Maudhui ya Ukurasa wa Kuhusu"
            content={content.swahili.about}
            language="swahili"
            page="about"
            imageButtons={[
              { label: "Sasisha Picha ya Historia", onClick: () => handleImageUpload('about-history') },
              { label: "Sasisha Picha ya Maono", onClick: () => handleImageUpload('about-vision') }
            ]}
            onEditContent={handleEdit}
          />
        </TabsContent>
      </Tabs>

      <ContentEditDialog
        editingContent={editingContent}
        onClose={() => setEditingContent(null)}
        onSave={handleSave}
        onValueChange={handleValueChange}
      />

      <ContentImageUpload
        isOpen={imageUploadOpen}
        onOpenChange={setImageUploadOpen}
        section={currentImageSection}
        onImageSaved={handleImageSaved}
      />
      
      <ContentManagementInstructions />
    </div>
  );
};

export default AdminContent;
