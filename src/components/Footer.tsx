
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Phone, Mail, Globe, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-church-gray text-white">
      <div className="church-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-church-orange">
              Kinondoni Revival Church
            </h3>
            <p className="text-white/80 mb-6">
              Tanzania Assemblies of God
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Globe className="h-5 w-5 mr-2 mt-1 text-church-orange" />
                <p className="text-white/80">
                  Kinondoni, Dar es Salaam, Tanzania
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-church-orange" />
                <p className="text-white/80">+255 677 977 777</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-church-orange" />
                <p className="text-white/80">info@kinondonirevival.org</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-church-orange">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/80 hover:text-church-orange transition-colors"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/80 hover:text-church-orange transition-colors"
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-white/80 hover:text-church-orange transition-colors"
                >
                  {t('events')}
                </Link>
              </li>
              <li>
                <Link
                  to="/sermons"
                  className="text-white/80 hover:text-church-orange transition-colors"
                >
                  {t('sermons')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/80 hover:text-church-orange transition-colors"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-church-orange">
              {t('serviceTimes')}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium">{t('sundayService')}</p>
                <p className="text-white/80">{t('firstService')}: 7:00 AM - 10:00 AM</p>
                <p className="text-white/80">{t('secondService')}: 10:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-church-orange">
              {t('followUs')}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-church-orange hover:bg-church-orangeDark text-white p-2 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-church-orange hover:bg-church-orangeDark text-white p-2 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-church-orange hover:bg-church-orangeDark text-white p-2 rounded-full transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-black/30 py-4">
        <div className="church-container">
          <p className="text-center text-white/70 text-sm">
            &copy; {currentYear} Kinondoni Revival Church - {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
