
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceTimes: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t('firstService'),
      time: '7:00 AM - 10:00 AM',
      icon: <Clock className="h-5 w-5 text-church-orange" />,
    },
    {
      title: t('secondService'),
      time: '10:00 AM - 1:00 PM',
      icon: <Clock className="h-5 w-5 text-church-orange" />,
    },
  ];

  return (
    <Card className="border-church-orange border-t-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif text-church-gray">
          {t('serviceTimes')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="flex items-center space-x-3">
              {service.icon}
              <div>
                <h4 className="font-medium text-church-gray">{service.title}</h4>
                <p className="text-sm text-gray-500">{service.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTimes;
