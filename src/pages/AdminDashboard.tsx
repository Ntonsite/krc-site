
import React from 'react';
import { useAuth } from '../hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const isSuperAdmin = currentUser?.role === 'super-admin';
  
  // Admin features
  const adminFeatures = [
    {
      title: "Events Management",
      description: "Add, edit, or remove church events",
      link: "/admin/events",
      icon: "📅"
    },
    {
      title: "Content Management",
      description: "Edit website content in English & Swahili",
      link: "/admin/content",
      icon: "📝"
    },
    {
      title: "Leaders Information",
      description: "Manage leaders' profiles",
      link: "/admin/leaders",
      icon: "👥"
    },
    {
      title: "Contact Information",
      description: "Update church contact details",
      link: "/admin/contact",
      icon: "📞"
    },
    {
      title: "User Management",
      description: "Add or manage admin users",
      link: "/admin/users",
      superAdminOnly: true,
      icon: "👤"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {currentUser?.name || currentUser?.email}. Manage your church website content here.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminFeatures.map((feature, index) => {
          // Skip if superAdminOnly and user is not super-admin
          if (feature.superAdminOnly && !isSuperAdmin) {
            return null;
          }
          
          return (
            <Link 
              to={feature.link} 
              key={index}
              className="no-underline text-foreground"
            >
              <Card className="h-full transition-all hover:shadow-md hover:border-church-orange">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">{feature.icon}</span>
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-lg font-semibold text-blue-800">Getting Started</h2>
        <p className="text-blue-600 mt-1">
          Click on any card above to start managing your church website. You can edit content, manage events, 
          update leaders information, and more.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
