import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Award } from 'lucide-react';

const questions = [
  {
    question: "Where did Sarah and Michael first meet?",
    options: ["At a coffee shop", "At work", "Through friends", "At a concert"],
    correct: 0
  },
  {
    question: "What was their first date?",
    options: ["Movie night", "Summer festival", "Dinner date", "Beach walk"],
    correct: 1
  },
  {
    question: "Where did they get engaged?",
    options: ["Paris", "New York", "Under the stars", "At home"],
    correct: 2
  },
  {
    question: "What's their favorite shared hobby?",
    options: ["Cooking", "Traveling", "Photography", "Hiking"],
    correct: 1
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  const getReward = () => {
    if (score === questions.length) {
      return "You're a true friend! Here's a special thank you note from us! 💝";
    } else if (score >= questions.length / 2) {
      return "Great job! You know us pretty well! 🎉";
    }
    return "Thanks for playing! We can't wait to share more memories with you! 💫";
  };

  return (
    <div className="py-20 px-4 md:px-8 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl font-serif text-center mb-8">How Well Do You Know Us?</h2>

        {!showResults ? (
          <div className="bg-rose-50 rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="text-sm text-rose-500 mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="text-2xl font-medium">
                {questions[currentQuestion].question}
              </div>
            </div>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    selectedAnswer === null
                      ? 'bg-white hover:bg-rose-100'
                      : selectedAnswer === index
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-100'
                        : 'bg-red-100'
                      : index === questions[currentQuestion].correct
                      ? 'bg-green-100'
                      : 'bg-white'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-rose-50 rounded-2xl p-8 shadow-xl text-center"
          >
            <Award className="w-16 h-16 text-rose-500 mx-auto mb-4" />
            <div className="text-3xl font-serif mb-4">
              You scored {score} out of {questions.length}!
            </div>
            <div className="text-gray-600 mb-8">{getReward()}</div>
            {score === questions.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-6 bg-white rounded-lg"
              >
                <Heart className="w-8 h-8 text-rose-500 mx-auto mb-4" />
                <div className="text-lg italic">
                  "Thank you for being such an important part of our journey. We're blessed to have friends like you who know us so well. Can't wait to celebrate with you!"
                </div>
                <div className="mt-4 text-rose-500">- Sarah & Michael</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;