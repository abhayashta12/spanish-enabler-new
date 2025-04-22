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
import AccCourse from './components/courses/AccCourse';
import UGCLandingPage from './components/Ugc/Ug';
import MistakesPage from './components/Leadgen/mistakes'
import VerbsGuidePage from './components/Leadgen/verbsGuide'



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
        <Route path="/courses/Acc" element={<AccCourse />} />
        <Route path="/success" element={<Success/>}/>
        <Route path="/ugc" element={<UGCLandingPage />} />
        <Route path="/mistakes" element={<MistakesPage />} />
        <Route path="/verbsguide" element={<VerbsGuidePage />} />
      </Routes>
    </Router>
  );
}

export default App;
