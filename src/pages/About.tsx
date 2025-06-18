
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Leader } from '@/components/admin/LeaderCard';

const About = () => {
  const { t } = useLanguage();
  const [leaders, setLeaders] = useState<Leader[]>([]);
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

  // Load leaders from localStorage with cache busting
  useEffect(() => {
    const storedLeaders = localStorage.getItem('krc_leaders');
    if (storedLeaders) {
      try {
        const parsedLeaders = JSON.parse(storedLeaders);
        setLeaders(parsedLeaders);
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
      {/* Hero Section */}
      <section className="bg-church-gray py-16">
        <div className="church-container">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('about')} {t('churchName')}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {t('language') === 'sw' 
              ? 'Kujua zaidi kuhusu historia yetu, maono, na timu ya uongozi katika Kanisa la Uamsho la Kinondoni.'
              : 'Learn more about our history, vision, and leadership team at Kinondoni Revival Church.'
            }
          </p>
        </div>
      </section>

      {/* Church History */}
      <section className="py-16 bg-white">
        <div className="church-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">{t('ourHistory')}</h2>
              <p className="text-lg mb-4">
                {t('language') === 'sw' 
                  ? 'Kanisa la Uamsho la Kinondoni lilianzishwa mwaka 1990 na kikundi kidogo cha waumini waliokuwa na shauku ya kueneza Injili. Tangu wakati huo, tumekuwa tukikua kwa nguvu na sasa tunayo familia kubwa ya waumini.'
                  : 'Kinondoni Revival Church was established in 1990 by a small group of believers passionate about spreading the Gospel. Since then, we have grown tremendously and now have a large family of believers.'
                }
              </p>
              <p className="text-lg">
                {t('language') === 'sw' 
                  ? 'Kama sehemu ya Tanzania Assemblies of God, tunaendelea kufuata mafundisho ya Kibiblia na kuwa na utendaji wa mipango ya kimataifa ya kanisa.'
                  : 'As part of the Tanzania Assemblies of God, we continue to follow biblical teachings and participate in the international church programs.'
                }
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Church History" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-100">
        <div className="church-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-church-orange">{t('ourVision')}</h3>
              <p className="text-lg">
                {t('language') === 'sw' 
                  ? 'Kuwa kanisa la mfano katika kueneza Injili ya Yesu Kristo na kuongoza watu katika maisha ya kiroho.'
                  : 'To be a model church in spreading the Gospel of Jesus Christ and leading people into spiritual life.'
                }
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-church-orange">{t('ourMission')}</h3>
              <p className="text-lg">
                {t('language') === 'sw' 
                  ? 'Kuwaongoza watu kwenye uhusiano wa kina na Mungu, kuwajenga katika imani, na kuwawezesha kutumika katika jamii zao.'
                  : 'To lead people into a deep relationship with God, build them in faith, and empower them to serve in their communities.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      {leaders.length > 0 && (
        <section id="leadership" className="py-16 bg-white">
          <div className="church-container">
            <h2 className="section-title text-center mb-12">{t('ourLeaders')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leaders.map((leader) => (
                <div key={leader.id} className="text-center">
                  <div className="mb-6 relative w-64 h-64 mx-auto overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{leader.name}</h3>
                  <p className="text-church-orange font-medium mb-3">{leader.role}</p>
                  {leader.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-16 bg-church-orange text-white">
        <div className="church-container">
          <h2 className="section-title text-center mb-12 text-white">{t('ourValues')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  {t('language') === 'sw' ? 'Imani' : 'Faith'}
                </h3>
                <p>
                  {t('language') === 'sw' 
                    ? 'Tunajiamini kuwa Mungu ana uwezo wa kufanya mambo makuu katika maisha yetu.'
                    : 'We believe God has the power to do great things in our lives.'
                  }
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  {t('language') === 'sw' ? 'Upendo' : 'Love'}
                </h3>
                <p>
                  {t('language') === 'sw' 
                    ? 'Tunapendekezwa na upendo wa Mungu na tunaupenda kwa wengine.'
                    : 'We are motivated by God\'s love and share that love with others.'
                  }
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  {t('language') === 'sw' ? 'Huduma' : 'Service'}
                </h3>
                <p>
                  {t('language') === 'sw' 
                    ? 'Tunajitoa kuhudumia Mungu na jamii yetu kwa moyo wetu wote.'
                    : 'We dedicate ourselves to serving God and our community wholeheartedly.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
