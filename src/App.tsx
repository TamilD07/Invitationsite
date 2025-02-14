import React, { useRef } from 'react';
import LandingSection from './components/LandingSection';
import Timeline from './components/Timeline';
import Calendar from './components/Calendar';
import Countdown from './components/Countdown';
import RSVP from './components/RSVP';
import Quiz from './components/Quiz';
import Guestbook from './components/Guestbook';

function App() {
  // Refs for each section
  const timelineRef = useRef(null);
  const calendarRef = useRef(null);
  const countdownRef = useRef(null);
  const rsvpRef = useRef(null);
  const quizRef = useRef(null);
  const guestbookRef = useRef(null);

  // Function to scroll smoothly
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Landing Section with Start Journey Button */}
      <LandingSection onStartJourney={() => scrollToSection(timelineRef)} />

      {/* Sections */}
      <div ref={timelineRef}><Timeline /></div>
      <div ref={calendarRef}><Calendar /></div>
      <div ref={countdownRef}><Countdown /></div>
      <div ref={rsvpRef}><RSVP /></div>
      <div ref={quizRef}><Quiz /></div>
      <div ref={guestbookRef}><Guestbook /></div>
    </div>
  );
}

export default App;
