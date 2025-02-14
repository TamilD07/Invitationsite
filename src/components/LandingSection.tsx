import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const LandingSection = ({ onStartJourney }) => {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number }[]>([]);
  const [poopers, setPoopers] = useState<{ id: number }[]>([]);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; delay: number; color: string }[]>([]);

  // Floating hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts,
        { id: Date.now(), x: Math.random() * window.innerWidth, size: Math.random() * 15 + 10 },
      ]);

      setTimeout(() => {
        setHearts((prevHearts) => prevHearts.slice(1));
      }, 4000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Poopers popping at the same time (left & right)
  useEffect(() => {
    const interval = setInterval(() => {
      const pooperId = Date.now();
      setPoopers([{ id: pooperId }]); // Both poopers appear at the same time

      setTimeout(() => {
        setConfetti((prev) => [
          ...prev,
          ...Array.from({ length: 20 }).map((_, i) => ({
            id: pooperId + i, // Unique ID for each confetti
            x: (i < 10 ? 100 : window.innerWidth - 100) + Math.random() * 50 - 25, // Left or Right
            y: Math.random() * 20,
            delay: Math.random() * 1.5,
            color: ["#FF5733", "#FFD700", "#FF69B4", "#00CFFF", "#28A745"][Math.floor(Math.random() * 5)],
          })),
        ]);
      }, 800); // Confetti appears shortly after poopers

      // Remove poopers after popping
      setTimeout(() => {
        setPoopers([]);
      }, 1000);
    }, 4000); // New pooper set every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-rose-100 relative overflow-hidden"
    >
      {/* Floating Hearts Animation */}
      <AnimatePresence>
        {hearts.map(({ id, x, size }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: -200, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute"
            style={{ left: x }}
          >
            <Heart className="text-rose-400" style={{ width: size, height: size }} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Popping Poopers (Left & Right) */}
      <AnimatePresence>
        {poopers.map(({ id }) => (
          <>
            {/* Left Pooper */}
            <motion.div
              key={`${id}_left_${Math.random()}`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0, scale: 1.3 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-10"
              style={{ left: "100px" }}
            >
              <Sparkles className="w-10 h-10 text-yellow-400" />
            </motion.div>

            {/* Right Pooper */}
            <motion.div
              key={`${id}_right_${Math.random()}`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0, scale: 1.3 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-10"
              style={{ right: "100px" }}
            >
              <Sparkles className="w-10 h-10 text-yellow-400" />
            </motion.div>
          </>
        ))}
      </AnimatePresence>

      {/* Falling Confetti */}
      <AnimatePresence>
        {confetti.map(({ id, x, y, delay, color }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: y }}
            animate={{ opacity: 1, y: window.innerHeight - 80 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, delay, ease: "easeInOut" }}
            className="absolute"
            style={{ left: x }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Heart Icon in Top Right Corner */}
      <Heart className="w-12 h-12 text-rose-500 absolute top-10 right-10" />

      {/* Animated Bride Image - Centered Above Names */}
      <motion.img
        src="/images/bride.png" // Ensure the image is inside public/images/
        alt="Bride Doodle"
        className="w-48 opacity-90 absolute top-20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Title */}
      <h1 className="text-5xl font-serif text-gray-800 mt-40 mb-4">Sarah & Michael</h1>
      <p className="text-xl text-gray-600 mb-8">Are getting married</p>

      {/* Start Journey Button with Smooth Scroll */}
      <motion.button
        onClick={onStartJourney}
        className="px-6 py-3 bg-rose-500 text-white rounded-full shadow-md hover:bg-rose-600 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start the Journey
      </motion.button>
    </motion.div>
  );
};

export default LandingSection;
