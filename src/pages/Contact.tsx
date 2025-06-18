
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Globe } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const { t } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success('Message sent successfully!');
    reset();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-church-gray py-16">
        <div className="church-container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('contact')}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            We'd love to hear from you. Reach out to us with any questions or prayer requests.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="church-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="section-title border-l-4 border-church-orange pl-4 mb-8">
                {t('getInTouch')}
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Input
                    placeholder={t('yourName')}
                    {...register('name', { required: true })}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">Name is required</p>
                  )}
                </div>
                
                <div>
                  <Input
                    type="email"
                    placeholder={t('yourEmail')}
                    {...register('email', { 
                      required: true,
                      pattern: /^\S+@\S+$/i
                    })}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">Valid email is required</p>
                  )}
                </div>
                
                <div>
                  <Input
                    placeholder={t('subject')}
                    {...register('subject', { required: true })}
                    className={errors.subject ? 'border-red-500' : ''}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">Subject is required</p>
                  )}
                </div>
                
                <div>
                  <Textarea
                    placeholder={t('message')}
                    rows={5}
                    {...register('message', { required: true })}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">Message is required</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-church-orange hover:bg-church-orangeDark w-full"
                >
                  {t('sendMessage')}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="section-title border-l-4 border-church-orange pl-4 mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Globe className="h-10 w-10 mr-4 text-church-orange" />
                      <div>
                        <h3 className="font-bold text-xl mb-2">{t('address')}</h3>
                        <p className="text-gray-600">
                          Kinondoni Revival Church<br />
                          P.O. Box 12345<br />
                          Kinondoni, Dar es Salaam<br />
                          Tanzania
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Phone className="h-10 w-10 mr-4 text-church-orange" />
                      <div>
                        <h3 className="font-bold text-xl mb-2">{t('phone')}</h3>
                        <p className="text-gray-600">
                          Office: +255 677 977 777<br />
                          Pastor: +255 677 977 778
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Mail className="h-10 w-10 mr-4 text-church-orange" />
                      <div>
                        <h3 className="font-bold text-xl mb-2">{t('email')}</h3>
                        <p className="text-gray-600">
                          General Inquiries: info@kinondonirevival.org<br />
                          Pastor's Office: pastor@kinondonirevival.org
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map */}
      <section className="py-16 bg-gray-100">
        <div className="church-container">
          <h2 className="section-title text-center mb-8">Find Us</h2>
          <div className="h-96 rounded-lg overflow-hidden border-2 border-church-orange">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63547.91126901197!2d39.20099269872855!3d-6.777193933399467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4c1278af3097%3A0x81c3d70732e72fb0!2sKinondoni%2C%20Dar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1653389620742!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Church Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
