
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-church-gray min-h-[60vh] flex items-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/lovable-uploads/24ed29dd-2470-4442-bb92-2e387d526605.png)',
          opacity: 0.3,
        }}
      ></div>
      
      <div className="church-container relative z-10 py-12 md:py-24">
        <div className="max-w-3xl">
          <div className="flex items-center mb-6">
            <img 
              src="/lovable-uploads/650c6a50-7fdb-496b-b9aa-e14f2dffddf9.png" 
              alt="Tanzania Assemblies of God Logo" 
              className="h-16 md:h-20 w-auto mr-4"
            />
            <div>
              <span className="text-church-orange text-xl mb-2 block font-medium">
                {t('welcome')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {t('churchName')}
              </h1>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-serif">
            {t('tagline')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-church-orange hover:bg-church-orangeDark text-white px-8 py-6 text-lg"
            >
              <Link to="/about">
                {t('learnMore')}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white text-church-orange border-church-orange hover:bg-church-orangeLight px-8 py-6 text-lg"
            >
              <Link to="/contact">
                {t('joinUs')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
