import React from 'react';
import { motion } from 'framer-motion';
import david from '../assets/david.png';
import eleonora from '../assets/Eleonora.png';
import juan from '../assets/Juan.png';
import ricardo from '../assets/Ricardo.png';

const About = () => {
  const teamMembers = [
    { name: "David Mendoza", image: david, bio: "I'm David Mendoza, a teacher and content creator passionate about languages. Originally from Colombia, I moved to Canada in 2006 and have over 20 years of teaching experience. I speak Spanish, English, and Portuguese fluently, with strong skills in Italian and basic French and German. My mission is to help you speak Spanish confidently and enjoy the process." },
    { name: "Ricardo Quintero", image: ricardo, bio: "With over six years of experience and a background in Modern Languages and Latin American Studies, I teach Spanish, French, and English in online and in-person settings. I've worked in places as diverse as the U.S. and the Colombian Amazon, creating adaptable, goal-focused language courses. My passion for exploring cultures has led me to live in the U.S., France, and the Netherlands, and I bring this global perspective to every class, using the best teaching methodologies to meet each student's unique needs." },
    { name: "Juan Vodniza", image: juan, bio: "Philosopher by profession. I have over 7 years of experience as an account executive, copywriter, expert in email marketing, digital strategy creation, marketing communication, and digital content creator, specifically memes." },
    { name: "Eleonora Alzate", image: eleonora, bio: "I'm Eleonora Alzate Tijerino, a Colombian language teacher born in Costa Rica. I hold a degree in Modern Languages from Universidad del Valle (Cali, Colombia) and a Master's in Teaching French as a Foreign Language from Blaise Pascal University (France). I speak Spanish, English, French, and Portuguese. With extensive experience teaching Spanish to adults, teens, and children both online and in person, I create a comfortable learning environment that fosters confidence and growth. I value diversity, perseverance, and motivation and love traveling and exploring new cultures." },
  ];

  return (
    <section id="about" className="py-20 mt-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto text-center px-4 md:px-12">
        <motion.h2 
          className="text-5xl font-serif font-bold mb-12 text-gray-800 select-none"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Who We Are and Why We Built This
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-6">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.name}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative mb-6"
              >
                <img
                  src={member.image} 
                  alt={member.name}
                  className="w-48 h-48 object-cover rounded-full shadow-md select-none"
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-yellow-400 mix-blend-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed overflow-y-auto h-48 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;