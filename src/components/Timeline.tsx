import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Heart, Map, Music, Coffee } from 'lucide-react';
 

const timelineEvents = [
  { date: 'May 15, 2022', title: 'First Meeting', description: 'A chance encounter at the local coffee shop changed everything.', icon: Coffee },
  { date: 'July 4, 2022', title: 'First Date', description: 'An unforgettable evening at the summer festival.', icon: Music },
  { date: 'December 25, 2022', title: 'First Trip Together', description: 'Exploring Paris and falling deeper in love.', icon: Map },
  { date: 'February 14, 2023', title: 'The Proposal', description: 'Under a starlit sky, he asked and she said yes!', icon: Heart },
  { date: 'August 15, 2024', title: 'Wedding Day', description: 'The beginning of our forever.', icon: Calendar },
];

interface TimelineEventProps {
  event: {
    date: string;
    title: string;
    description: string;
    icon: React.ComponentType;
  };
  index: number;
}

const TimelineEvent = ({ event, index }: TimelineEventProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = event.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-5 mb-12`}
    >
      {/* Left Side (Text Content) */}
      <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
        <div className="text-rose-500 font-medium">{event.date}</div>
        <h3 className="text-xl font-serif mb-2">{event.title}</h3>
        <p className="text-gray-600">{event.description}</p>
      </div>

      {/* Timeline Dot & Icon */}
      <div className="relative flex flex-col items-center">
        {/* Vertical Line */}
        <div className="absolute top-0 bottom-0 w-1 bg-rose-200 -z-10"></div>

        {/* Icon Inside a Circle */}
        <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center shadow-md">
          <Icon className="w-7 h-7 text-rose-500" />
        </div>

        {/* Center Dot */}
        {/* <div className="w-4 h-4 bg-rose-500 rounded-full mt-[-8px]"></div> */}
      </div>

      {/* Right Side (Empty for spacing) */}
      <div className="w-1/2" />
    </motion.div>
  );
};

const Timeline = () => {
  return (
    <div className="py-10 px-4 md:px-8  bg-white relative">
      <h2 className="text-4xl font-serif text-center mb-10 top-0">Our Love Story</h2>
      <div className="max-w-4xl mx-auto relative">
        {/* Timeline Vertical Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-rose-200" />
        
        {/* Timeline Events */}
        {timelineEvents.map((event, index) => (
          <TimelineEvent key={event.date} event={event} index={index} />
        ))}
      </div>

      
    </div>
  );
};

export default Timeline;
