
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./hooks/use-auth";
import { StrictMode } from 'react';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AdminLeaders from "./pages/AdminLeaders";
import AdminContent from "./pages/AdminContent";
import AdminUsers from "./pages/AdminUsers";
import AdminContact from "./pages/AdminContact";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <div className="flex flex-col min-h-screen">
                      <Header />
                      <main className="flex-grow">
                        <Index />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <div className="flex flex-col min-h-screen">
                      <Header />
                      <main className="flex-grow">
                        <About />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                <Route
                  path="/events"
                  element={
                    <div className="flex flex-col min-h-screen">
                      <Header />
                      <main className="flex-grow">
                        <Events />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <div className="flex flex-col min-h-screen">
                      <Header />
                      <main className="flex-grow">
                        <Contact />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                
                {/* Login Route */}
                <Route path="/login" element={<Login />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="events" element={<AdminEvents />} />
                  <Route path="leaders" element={<AdminLeaders />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="contact" element={<AdminContact />} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
