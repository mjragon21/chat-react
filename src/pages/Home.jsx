import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Input from '../components/Input';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Message from '../components/Message';
import Chat from '../components/Chat';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      // Check if doc exists and has messages property
      if (doc.exists() && doc.data().messages) {
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <Sidebar />
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
             <Chat />
            <div className="overflow-y-auto flex-grow">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
            <div className="mt-auto">
              <Input />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
