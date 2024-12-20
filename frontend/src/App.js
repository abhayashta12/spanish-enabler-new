// src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OneonOneCourse from './components/courses/OneonOneCourse';
import GroupCourse from './components/courses/GroupCourse';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Stats from './components/Stats';
import Resources from './components/Resources'
import Success from './components/Success'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Main Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Stats />
              <Resources/>
              <About />
              <Courses />
              <Testimonials />
              <Contact />
              <Footer />
            </>
          }
        />
        {/* Course Detail Routes */}
        <Route path="/courses/OneonOne" element={<OneonOneCourse />} />
        <Route path="/courses/Group" element={<GroupCourse />} />
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </Router>
  );
}

export default App;
