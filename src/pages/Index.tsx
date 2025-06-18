
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Hero from '../components/Hero';
import ServiceTimes from '../components/ServiceTimes';
import EventCard from '../components/EventCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '@/components/admin/EventCard';
import { Leader } from '@/components/admin/LeaderCard';

const Index = () => {
  const { t } = useLanguage();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);

  // Force refresh when localStorage changes
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Add event listener to track localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setLastUpdate(Date.now());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Load events from localStorage with cache busting
  useEffect(() => {
    const storedEvents = localStorage.getItem('krc_events');
    if (storedEvents) {
      try {
        const allEvents = JSON.parse(storedEvents);
        // Only show the first 3 events on homepage
        setUpcomingEvents(allEvents.slice(0, 3));
      } catch (error) {
        console.error("Error parsing events from localStorage:", error);
        setUpcomingEvents([]);
      }
    } else {
      setUpcomingEvents([]);
    }

    // Also load leaders
    const storedLeaders = localStorage.getItem('krc_leaders');
    if (storedLeaders) {
      try {
        const allLeaders = JSON.parse(storedLeaders);
        setLeaders(allLeaders);
      } catch (error) {
        console.error("Error parsing leaders from localStorage:", error);
        setLeaders([]);
      }
    } else {
      setLeaders([]);
    }
  }, [lastUpdate]); // Re-run when localStorage changes are detected

  return (
    <div>
      <Hero />
      
      {/* About Section */}
      <section className="bg-white py-16">
        <div className="church-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <h2 className="section-title border-l-4 border-church-orange pl-4">
                  {t('about')} {t('churchName')}
                </h2>
                <img 
                  src="/lovable-uploads/650c6a50-7fdb-496b-b9aa-e14f2dffddf9.png" 
                  alt="Tanzania Assemblies of God Logo" 
                  className="h-12 ml-4"
                />
              </div>
              <p className="text-lg mb-6">
                {t('aboutChurchDescription')}
              </p>
              <p className="text-lg mb-6">
                {t('aboutChurchDescription2')}
              </p>
              <Button asChild className="bg-church-orange hover:bg-church-orangeDark">
                <Link to="/about">
                  {t('learnMore')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div>
              <ServiceTimes />
            </div>
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="bg-gray-100 py-16">
        <div className="church-container">
          <h2 className="section-title text-center mb-10 border-b-2 border-church-orange pb-2 inline-block">
            {t('upcomingEvents')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  image={event.image}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-lg text-gray-500">{t('noUpcomingEvents')}</p>
              </div>
            )}
          </div>
          <div className="mt-10 text-center">
            <Button asChild className="bg-church-orange hover:bg-church-orangeDark">
              <Link to="/events">
                {t('viewAllEvents')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Leaders Section */}
      {leaders.length > 0 && (
        <section className="bg-white py-16">
          <div className="church-container">
            <h2 className="section-title text-center mb-10 border-b-2 border-church-orange pb-2 inline-block">
              {t('ourLeaders')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaders.slice(0, 3).map((leader) => (
                <div key={leader.id} className="text-center">
                  <div className="mb-4 relative w-48 h-48 mx-auto overflow-hidden rounded-full">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
                  <p className="text-church-orange mb-2">{leader.role}</p>
                  {leader.bio && (
                    <p className="text-gray-600 line-clamp-3">{leader.bio}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild className="bg-church-orange hover:bg-church-orangeDark">
                <Link to="/about#leadership">
                  {t('meetOurTeam')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
      
      {/* Call to Action */}
      <section className="bg-church-orange py-16 text-white">
        <div className="church-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('joinUs')}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('joinUsDescription')}
          </p>
          <Button asChild variant="outline" className="bg-white text-church-orange border-white hover:bg-gray-100">
            <Link to="/contact">
              {t('contactUs')}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
