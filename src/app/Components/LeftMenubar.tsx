'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars, FaTimes, FaInfoCircle, FaUserPlus, FaUserShield, FaKey, FaUserTag, FaShieldAlt, FaUserCheck } from 'react-icons/fa'; // Importing icons
import { useAppContext } from '../Context/AppContext';

export const LeftMenubar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const userContext = useAppContext()[0].userContext;

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };



  return (
    <div className=" flex flex-col">
      <nav className={`bg-gray-800 ${isCollapsed ? 'w-14' : 'w-64'} h-[calc(100vh-var(--top-menu-height))] transition-all duration-50`}>
        {/* Toggle Button */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
          <div className="text-white text-lg font-bold">
            {isCollapsed ? '' : ''}
          </div>
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        {/* User Info (only show when not collapsed) */}
        {!isCollapsed && (
          <div className="text-start mb-4 mt-4 ps-4">
            <div className="text-white font-bold">User Name: {userContext.user.displayName}</div>
            <div className="text-gray-400 font-medium">User Email: {userContext.user.email}</div>
            <div className="text-gray-400 font-medium">User Role: {userContext.roles[0]}</div>
          </div>
        )}

        {/* Menu Links */}
        <div>
          <ul className="flex flex-col space-y-5 p-0">
            <li>
              <Link className="text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex justify-start items-center transition-all duration-300 no-underline" href="/Dashboard/AboutUser">
                <div className="justify-start flex items-center w-44">
                    <FaInfoCircle className="mx-3" /> 
                    {!isCollapsed && 'About'}
                </div>
              </Link>
            </li>
            <li>
              <Link className="text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex justify-start items-center transition-all duration-300 no-underline" href="/Dashboard/RegisterUser">
              <div className="justify-start flex items-center w-44">
              <FaUserPlus className="mx-3" />
              {!isCollapsed && 'Register User'}
                </div>
                
              </Link>
            </li>

            <li>
              <Link className="text-white hover:bg-gray-700 rounded-lg px-2 py-2 justify-start flex items-center transition-all duration-300 no-underline" href="/Dashboard/CreateRole">
              <div className="justify-start flex items-center w-44">
                <FaKey className="mx-3" />
                {!isCollapsed && 'Create Role'}
               </div>
              </Link>
            </li>
            <li>
              <Link className="text-white hover:bg-gray-700 rounded-lg px-2 py-2 justify-start flex items-center transition-all duration-300 no-underline" href="/Dashboard/AddRoleToUser">
              <div className="justify-start flex items-center w-44"> 
                <FaUserTag className="mx-3" />
                {!isCollapsed && 'Add Role to User'}
                </div>
              </Link>
            </li>
            <li>
              <Link className="text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-300 no-underline" href="/Dashboard/AddClaimToRole">
                 <div className="justify-start flex items-center w-44">
                    <FaShieldAlt className="mx-3" />
                    {!isCollapsed && 'Add Claim to Role'}
                </div>
              </Link>
            </li>
            <li>
              <Link className="text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-300 no-underline" href="/Dashboard/AddClaimToUser">
              <div className="justify-start flex items-center w-48">
                <FaUserCheck className="mx-3" />
                {!isCollapsed && 'Add Claim to User'}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
