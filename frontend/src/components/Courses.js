import React from 'react';
import { Link } from 'react-router-dom';
import oneclass from '../assets/oneclass.png';
import groupclass from '../assets/groupclass.png';
import ssa from '../assets/ssa.png';
 



const courses = [
  {
    title: 'One on One Coaching',
    description: 'Start your journey with personalized, individual attention from our expert instructors.',
    image: oneclass,
    link: '/courses/OneonOne',
  },
  {
    title: 'Group Coaching',
    description: 'Learn collaboratively and practice with peers in our engaging group classes.',
    image: groupclass,
    link: '/courses/Group',
  },
  {
    title: 'Spanish Speaking Accelerator Course',
    description: 'Start speaking Spanish confidently in just 3 weeks—or your money back!',
    image: ssa,
    link: '/courses/Group',
  },
];

const Courses = () => (
  <section id="courses" className="py-24 bg-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-serif font-bold text-center mb-20 text-gray-800">Choose Your Learning Path</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Link 
                  to={course.link}
                  className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{course.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p>
              <Link 
                to={course.link}
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
              >
                Explore Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Courses;
