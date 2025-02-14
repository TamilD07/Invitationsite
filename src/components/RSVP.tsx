import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import emailjs from '@emailjs/browser'; // ✅ Import EmailJS

const avatarOptions = {
  outfits: ['Formal', 'Semi-formal', 'Casual'],
  expressions: ['Happy', 'Excited', 'Love'],
  colors: ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500']
};

const RSVP = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [outfit, setOutfit] = useState(avatarOptions.outfits[0]);
  const [expression, setExpression] = useState(avatarOptions.expressions[0]);
  const [color, setColor] = useState(avatarOptions.colors[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (attending === null) {
      alert("Please select whether you will attend or not.");
      return;
    }

    // ✅ Prepare the email data
    const templateParams = {
      name,
      email,
      attending: attending ? "Yes, I'll be there!" : "No, I can't make it",
      outfit,
      expression,
      color
    };

    // ✅ Send email using EmailJS
    emailjs
      .send(
        'service_gsrknqi', // Replace with your EmailJS service ID
        'template_1w9fx6r', // Replace with your EmailJS template ID
        templateParams,
        'PD5LJfERNUhOt3GSx' // Replace with your EmailJS public key
      )
      .then(() => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
  };

  return (
    <div className="py-20 px-4 md:px-8 bg-rose-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-4xl font-serif text-center mb-8">RSVP</h2>

        {submitted ? (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-rose-500">Thank you for your RSVP!</h3>
            <p className="text-gray-600 mt-4">
              {attending
                ? "We're excited to see you at our wedding! 🎉"
                : "We're sorry you can't make it, but we appreciate your response! ❤️"}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Will you attend?</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`flex-1 py-2 px-4 rounded-lg border ${
                    attending === true ? 'bg-rose-500 text-white' : 'bg-white'
                  }`}
                >
                  Yes, I'll be there!
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`flex-1 py-2 px-4 rounded-lg border ${
                    attending === false ? 'bg-gray-500 text-white' : 'bg-white'
                  }`}
                >
                  Sorry, I can't make it
                </button>
              </div>
            </div>

            {attending && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-gray-700 mb-2">Create Your Avatar</label>
                  <div className="flex gap-4 mb-4">
                    <div className={`w-24 h-24 rounded-full ${color} flex items-center justify-center`}>
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        {avatarOptions.colors.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setColor(c)}
                            className={`w-8 h-8 rounded-full ${c} ${
                              color === c ? 'ring-2 ring-offset-2 ring-gray-500' : ''
                            }`}
                          />
                        ))}
                      </div>
                      <select
                        value={outfit}
                        onChange={(e) => setOutfit(e.target.value)}
                        className="block w-full px-3 py-2 border rounded-lg"
                      >
                        {avatarOptions.outfits.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      <select
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        className="block w-full px-3 py-2 border rounded-lg"
                      >
                        {avatarOptions.expressions.map((e) => (
                          <option key={e} value={e}>{e}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-6 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
            >
              Send RSVP
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default RSVP;
