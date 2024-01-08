
import Search from './Search'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import React, { useContext, useState } from "react";
import {
   collection,
   query,
   where,
   getDocs,
   setDoc,
   doc,
   updateDoc,
   serverTimestamp,
   getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import Chats from "./Chats";


const Sidebar = () => {


   const [username, setUsername] = useState("");
   const [user, setUser] = useState(null);
   const [err, setErr] = useState(false);

   const { currentUser } = useContext(AuthContext);

   const handleSearch = async () => {
      const q = query(
         collection(db, "users"),
         where("displayName", "==", username)
      );

      try {
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
            setUser(doc.data());
         });
      } catch (err) {
         setErr(true);
      }
   };

   const handleKey = (e) => {
      e.code === "Enter" && handleSearch();
   };





   return (
      <div className="">

         <div class="flex flex-col pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div class="flex flex-row items-center justify-center h-12 w-full">
               <div
                  class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
               >
                        <img class="w-10 h-10 mr-0.5" src="https://img.icons8.com/color/48/chat--v1.png" alt="logo" />
                  <img src="" alt="" />
               </div>
               <div class="ml-2 font-bold text-2xl">Chat</div>
            </div>
            <div
               class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
            >
               <div class="h-20 w-20 rounded-full border overflow-hidden">
                  <img
                     src={currentUser.photoURL}
                     alt="Avatar"
                     class="h-full w-full"
                  />
               </div>
               <div class="text-sm font-semibold mt-2">{currentUser.displayName}</div>

               <div class="flex flex-row items-center mt-3">
                  <div>
                     <div class="h-3 w-3 bg-green-500 rounded-full self-end mr-1"></div>
                  </div>
                  <div class="leading-none ml-1 text-xs">Active</div>
               </div>
            </div>
            <div class="flex flex-col mt-8">
               <div class="flex flex-row items-center justify-between text-xs">


               </div>
            </div>

         </div> 


         <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium">

               <ul class="flex flex-col absolute bottom-0 left-0 mb-4 ml-4">
                  <li>
                     <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                           aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                        </svg>
                        <span onClick={() => signOut(auth)} class="flex-1 ms-3 whitespace-nowrap">Log out</span>
                     </a>
                  </li>
               </ul>

            </ul>
            <div className='pt-2'>
               <Search />

            </div>
         </div>
      </div>


   )
}

export default Sidebar
