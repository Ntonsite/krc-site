
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import EventCard from '../components/EventCard';
import { Event } from '@/components/admin/EventCard';

const Events = () => {
  const { t } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
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
        const parsedEvents = JSON.parse(storedEvents);
        setEvents(parsedEvents);
      } catch (error) {
        console.error("Error parsing events from localStorage:", error);
        setEvents([]);
      }
    } else {
      setEvents([]);
    }
  }, [lastUpdate]); // Re-run when localStorage changes are detected

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-church-gray py-16">
        <div className="church-container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('events')}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {t('language') === 'sw' 
              ? 'Jiunge nasi katika matukio haya yajayo na ibada maalum katika Kanisa la Uamsho la Kinondoni.'
              : 'Join us for these upcoming events and special services at Kinondoni Revival Church.'
            }
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-white">
        <div className="church-container">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  image={event.image}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">{t('noUpcomingEvents')}</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Calendar */}
      <section className="py-16 bg-gray-100">
        <div className="church-container text-center">
          <h2 className="section-title mb-8">{t('churchCalendar')}</h2>
          <p className="text-lg mb-8">
            {t('calendarDescription')}
          </p>
          <div className="flex justify-center">
            <iframe 
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23F47920&ctz=Africa%2FDar_es_Salaam" 
              className="w-full max-w-4xl h-96 border-2 border-church-orange rounded-lg"
              title={t('churchCalendar')}
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
