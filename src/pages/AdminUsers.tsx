
import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navigate } from 'react-router-dom';

// Form schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const AdminUsers = () => {
  const { currentUser, addUser } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setUsers] = useState<any[]>(() => {
    // Get users from localStorage
    const usersString = localStorage.getItem('krc_users');
    if (usersString) {
      return JSON.parse(usersString).map((user: any) => {
        // Remove password from user object
        const { password, ...safeUser } = user;
        return safeUser;
      });
    }
    return [];
  });

  // Check if user is super admin
  if (!currentUser || currentUser.role !== 'super-admin') {
    return <Navigate to="/admin" replace />;
  }

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = await addUser(values.email, values.password, values.name, 'admin');
    if (success) {
      setIsDialogOpen(false);
      form.reset();
      
      // Update users state
      const usersString = localStorage.getItem('krc_users');
      if (usersString) {
        setUsers(JSON.parse(usersString).map((user: any) => {
          const { password, ...safeUser } = user;
          return safeUser;
        }));
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600 mt-1">
            Add and manage admin users for the website
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-church-orange hover:bg-church-orange/90">
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new admin user</DialogTitle>
              <DialogDescription>
                Create a new admin who can manage website content but cannot add other users.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="admin@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" className="bg-church-orange hover:bg-church-orange/90">
                    Add User
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>List of all admin users with their permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          user.role === 'super-admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'super-admin' ? 'Super Admin' : 'Admin'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-yellow-50 p-4 border border-yellow-100 rounded-lg">
          <h3 className="font-medium text-yellow-800">Note on User Permissions</h3>
          <p className="text-yellow-700 text-sm mt-1">
            Super Admins can add new users and manage all content. Regular Admins can manage 
            content but cannot add or modify users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
