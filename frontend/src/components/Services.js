import React from 'react';
import './Services.css';

const services = [
  {
    title: 'Private Spanish Lessons',
    description: 'One-on-one lessons tailored to your personal needs and schedule.',
  },
  {
    title: 'Group Sessions',
    description: 'Engaging group sessions to practice with peers and learn in a collaborative environment.',
  },
  {
    title: 'Online Courses',
    description: 'Flexible online courses that allow you to learn Spanish from the comfort of your home.',
  },
];

const Services = () => {
  return (
    <section id="services" className="services-container">
      <div className="container mx-auto text-center py-12">
        <h2 className="text-4xl font-bold mb-8">My Services</h2>
        <div className="service-cards grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card p-6 shadow-lg rounded-lg bg-white">
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
