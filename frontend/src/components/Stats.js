// src/components/Stats.js

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
    // Replace this with the real API endpoint or logic to fetch real-time data
    const fetchData = async () => {
      try {
        // Assuming you have an endpoint that provides these stats
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
      <div className="container mx-auto">
        <div className="flex justify-between items-center text-center space-x-8">
          <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <div className="text-gray-800 mb-4">
              <FaUserFriends size={50} className="animate-pulse" />
            </div>
            <h3 className="text-4xl font-bold mb-2 text-gray-800">
              <CountUp end={stats.followers / 1000} duration={2.5} separator="," suffix="k+" />
            </h3>
            <p className="text-lg text-gray-600">TikTok and Instagram Followers</p>
          </div>
          <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <div className="text-gray-800 mb-4">
              <FaChartLine size={50} className="animate-bounce" />
            </div>
            <h3 className="text-4xl font-bold mb-2 text-gray-800">
              <CountUp end={stats.impressions / 1000000} duration={2.5} separator="," suffix="M+" />
            </h3>
            <p className="text-lg text-gray-600">Impressions</p>
          </div>
          <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <div className="text-gray-800 mb-4">
              <FaLanguage size={50} className="animate-pulse" />
            </div>
            <h3 className="text-4xl font-bold mb-2 text-gray-800">
              <CountUp end={stats.speakers / 1000} duration={2.5} separator="," suffix="k+" />
            </h3>
            <p className="text-lg text-gray-600">Skool Community</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
