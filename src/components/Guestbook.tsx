import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Trash, Edit, Check, X } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

type Message = {
  id: string;
  type: string;
  content: string;
  author: string;
};

const Guestbook = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  // 🔥 Fetch messages from Firestore (Realtime Sync)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "guestbook"), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message)));
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // 🔥 Send message to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = { type: "text", content: newMessage, author: "Guest" };
      try {
        await addDoc(collection(db, "guestbook"), messageData);
        setNewMessage("");
      } catch (error) {
        console.error("Error saving message:", error);
      }
    }
  };

  // ✏️ Start Editing a Message
  const startEditing = (id: string, content: string) => {
    setEditingMessage(id);
    setEditContent(content);
  };

  // ✅ Save Edited Message
  const saveEdit = async (id: string) => {
    if (editContent.trim()) {
      try {
        const messageRef = doc(db, "guestbook", id);
        await updateDoc(messageRef, { content: editContent });
        setEditingMessage(null);
        setEditContent("");
      } catch (error) {
        console.error("Error updating message:", error);
      }
    }
  };

  // ❌ Cancel Editing
  const cancelEdit = () => {
    setEditingMessage(null);
    setEditContent("");
  };

  // 🗑️ Delete a Message
  const deleteMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, "guestbook", id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="py-20 px-4 md:px-8 bg-rose-50">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-8">Guestbook</h2>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Display messages */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <motion.div key={message.id} className="bg-rose-50 rounded-lg p-4 flex justify-between items-center">
                {editingMessage === message.id ? (
                  <div className="flex w-full gap-2">
                    <input
                      type="text"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                    <button onClick={() => saveEdit(message.id)} className="text-green-600">
                      <Check className="w-5 h-5" />
                    </button>
                    <button onClick={cancelEdit} className="text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="font-medium text-rose-600 mb-1">{message.author}</div>
                      <div>{message.content}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => startEditing(message.id, message.content)} className="text-blue-600">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => deleteMessage(message.id)} className="text-red-600">
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <button type="submit" className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Guestbook;
