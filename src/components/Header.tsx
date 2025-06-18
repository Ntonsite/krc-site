
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/use-auth';
import { Menu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Navigation Links
  const navLinks = [
    { path: "/", label: t('home') },
    { path: "/about", label: t('about') },
    { path: "/events", label: t('events') },
    { path: "/contact", label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="church-container py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/650c6a50-7fdb-496b-b9aa-e14f2dffddf9.png" 
              alt="Tanzania Assemblies of God Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl lg:text-2xl font-bold text-church-orange">
              KRC<span className="hidden md:inline"> TANZANIA</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors hover:text-church-orange ${
                    location.pathname === link.path ? "font-medium text-church-orange" : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Admin Link - only visible if authenticated */}
              {isAuthenticated && (
                <Link
                  to="/admin"
                  className={`transition-colors hover:text-church-orange ${
                    location.pathname.startsWith("/admin") ? "font-medium text-church-orange" : "text-gray-600"
                  }`}
                >
                  Admin
                </Link>
              )}

              {/* Login Button - only visible if not authenticated */}
              {!isAuthenticated && (
                <Link to="/login" className="text-gray-600 hover:text-church-orange">
                  Admin Login
                </Link>
              )}
            </div>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-church-orange"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 mt-4 border-t">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block transition-colors hover:text-church-orange ${
                    location.pathname === link.path ? "font-medium text-church-orange" : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Admin Link - only visible if authenticated */}
              {isAuthenticated && (
                <Link
                  to="/admin"
                  className={`block transition-colors hover:text-church-orange ${
                    location.pathname.startsWith("/admin") ? "font-medium text-church-orange" : "text-gray-600"
                  }`}
                >
                  Admin
                </Link>
              )}

              {/* Login Button - only visible if not authenticated */}
              {!isAuthenticated && (
                <Link to="/login" className="block text-gray-600 hover:text-church-orange">
                  Admin Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
