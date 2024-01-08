import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
const Chats = () => {


    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);


    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    console.log(Object.entries(chats))

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
      };

    return (
        <div className=''>
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (


                <div key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}
                 class="flex items-center p-2 pt-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <img class="w-14 h-14  rounded-full" 
                    src={chat[1].userInfo.photoURL} alt="" />
                    <div class="font-medium dark:text-white">

                        <div className='pl-4 '>{chat[1].userInfo.displayName}
                            <p className='text-sm font-light'>
                                {chat[1].lastMessage?.text}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Chats
