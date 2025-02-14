import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [showFireworks, setShowFireworks] = useState(false);
  const [isFinished, setIsFinished] = useState(false); // New state for completion check

  useEffect(() => {
    const weddingDate = new Date('2025-11-08T16:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference <= 0) {
        setIsFinished(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Ensure immediate update on mount

    return () => clearInterval(timer);
  }, []);

  const handleHover = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 1000);
  };

  return (
    <div className="py-20 px-4 md:px-8 bg-gray-900 relative overflow-hidden text-center">
      {showFireworks && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-500 rounded-full" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-pink-500 rounded-full" />
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-500 rounded-full" />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-green-500 rounded-full" />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-white"
        onMouseEnter={handleHover}
      >
        <h2 className="text-4xl font-serif mb-12">
          {isFinished ? "It's Our Wedding Day! 🎉" : "Counting Down to Our Special Day"}
        </h2>

        {!isFinished ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <motion.div
                key={unit}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
              >
                <div className="text-4xl font-bold mb-2">{value}</div>
                <div className="text-lg capitalize">{unit}</div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-2xl font-semibold mt-6 text-rose-400">Let's celebrate our love! 💖</p>
        )}
      </motion.div>
    </div>
  );
};

export default Countdown;
