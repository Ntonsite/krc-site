
import React from 'react';
import { useAuth } from '../hooks/use-auth';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { currentUser, logout, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-church-orange mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin navigation links
  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/events', label: 'Events' },
    { path: '/admin/leaders', label: 'Leaders' },
    { path: '/admin/content', label: 'Content' },
    { path: '/admin/users', label: 'Users', superAdminOnly: true },
    { path: '/admin/contact', label: 'Contact Info' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Admin Header */}
      <header className="bg-church-orange text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/admin" className="font-bold text-xl">
              KRC Admin
            </Link>
            <span className="text-xs bg-white text-church-orange px-2 py-0.5 rounded">
              {currentUser?.role === 'super-admin' ? 'Super Admin' : 'Admin'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-white hover:text-white/80 mr-4">
              <ArrowLeft className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Back to Website</span>
            </Link>
            <span className="hidden sm:inline">{currentUser?.name || currentUser?.email}</span>
            <Button
              variant="destructive"
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold border-none"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4 mr-1" /> 
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
        
        {/* Admin Navigation */}
        <div className="bg-church-gray">
          <nav className="container mx-auto px-4 py-1">
            <ul className="flex overflow-x-auto space-x-6 text-sm">
              {navItems.map((item, index) => {
                // Skip if superAdminOnly and user is not super-admin
                if (item.superAdminOnly && currentUser?.role !== 'super-admin') {
                  return null;
                }
                
                return (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className={`block py-2 whitespace-nowrap ${
                        location.pathname === item.path
                        ? "text-white font-semibold border-b-2 border-white"
                        : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {/* Admin Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Admin Footer */}
      <footer className="bg-church-gray text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Kinondoni Revival Church - Admin Portal</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
