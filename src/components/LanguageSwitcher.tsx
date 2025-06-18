
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-2">
      <Button 
        variant={language === 'en' ? 'default' : 'outline'}
        className={language === 'en' 
          ? 'bg-church-orange hover:bg-church-orangeDark text-white' 
          : 'text-church-gray hover:bg-gray-100'}
        size="sm"
        onClick={() => setLanguage('en')}
      >
        English
      </Button>
      <Button 
        variant={language === 'sw' ? 'default' : 'outline'}
        className={language === 'sw' 
          ? 'bg-church-orange hover:bg-church-orangeDark text-white' 
          : 'text-church-gray hover:bg-gray-100'}
        size="sm"
        onClick={() => setLanguage('sw')}
      >
        Swahili
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
