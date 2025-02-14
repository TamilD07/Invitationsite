import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';

const Calendar = () => {
  const handleAddToCalendar = () => {
    const event = {
      text: "Sarah & Michael's Wedding",
      dates: "20251007T160000Z/20251007T220000Z",
      location: "St. Mary's Church, 123 Wedding Lane",
      details: "We're getting married! Join us for our special day."
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.details)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="py-20 px-4 md:px-8 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-4xl font-serif mb-8">Save the Date</h2>
        
        <div className="bg-rose-50 rounded-2xl p-8 shadow-lg">
          <div className="text-6xl font-serif mb-4">November 07, 2025</div>
          <div className="text-xl text-gray-600 mb-8">Monday, 7:00 Am</div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCalendar}
            className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            <CalendarIcon className="w-5 h-5" />
            Add to Calendar
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Calendar;
