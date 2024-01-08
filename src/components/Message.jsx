import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    // Scroll into view only if the message is not null and has a senderId
    if (message && message.senderId) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  if (!message || !message.senderId) {
    return null; // or handle it in a way that makes sense for your application
  }

  // Determine if the message is from the current user
  const isCurrentUser = message.senderId === currentUser.uid;

  return (
    <div
      ref={ref}
      className={`message ${isCurrentUser ? "owner" : "other"} ${isCurrentUser ? "flex-row-reverse" : ""}`}
    >

      <div className="grid gap-y-2">
        <div className={`col-start-1 col-end-8 p-3 rounded-lg ${isCurrentUser ? "self-end" : "self-start"}`}>
          <div className={`flex items-center ${isCurrentUser ? "justify-end" : "justify-start"}`}>
            <div className={`mr-2 relative ml-6 ${isCurrentUser ? "bg-indigo-400 text-white" : "bg-gray-200 text-black"} py-2 px-4 shadow rounded-xl`}>
              <p
                className=""
              >{message.text}</p>
              {message.img && <img src={message.img} alt="" />}
            </div>
            <img className="flex items-center justify-center h-10 w-10 rounded-full p-1"
              src={
                isCurrentUser
                  ? currentUser.photoURL
                  : data.user.photoURL
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
