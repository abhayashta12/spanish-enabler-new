import React, { useEffect, useState } from 'react';
import { FaUserFriends, FaChartLine, FaLanguage } from 'react-icons/fa';
import CountUp from 'react-countup';
import axios from 'axios';

const Stats = () => {
  const [stats, setStats] = useState({
    followers: 500000,
    impressions: 3000000,
    speakers: 3000,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/social-stats');
        setStats({
          followers: response.data.followers,
          impressions: response.data.impressions,
          speakers: response.data.speakers,
        });
      } catch (error) {
        console.error('Error fetching social stats', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-6 text-center sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <div className="text-gray-800 mb-4">
              <FaUserFriends size={40} className="animate-pulse sm:size-50" />
            </div>
            <h3 className="text-3xl font-bold mb-2 text-gray-800 sm:text-4xl">
              <CountUp end={stats.followers / 1000} duration={2.5} separator="," suffix="k+" />
            </h3>
            <p className="text-base text-gray-600 sm:text-lg">TikTok and Instagram Followers</p>
          </div>
          <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <div className="text-gray-800 mb-4">
              <FaChartLine size={40} className="animate-bounce sm:size-50" />
            </div>
            <h3 className="text-3xl font-bold mb-2 text-gray-800 sm:text-4xl">
              <CountUp end={stats.impressions / 1000000} duration={2.5} separator="," suffix="M+" />
            </h3>
            <p className="text-base text-gray-600 sm:text-lg">Impressions</p>
          </div>
          <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <div className="text-gray-800 mb-4">
              <FaLanguage size={40} className="animate-pulse sm:size-50" />
            </div>
            <h3 className="text-3xl font-bold mb-2 text-gray-800 sm:text-4xl">
              <CountUp end={stats.speakers / 1000} duration={2.5} separator="," suffix="k+" />
            </h3>
            <p className="text-base text-gray-600 sm:text-lg">Skool Community</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
