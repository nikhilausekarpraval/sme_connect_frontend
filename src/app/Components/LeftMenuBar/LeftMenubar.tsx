'use client'

import { routes } from '@/app/Constants/Constants';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars, FaHome, FaInfoCircle, FaTasks, FaTimes, FaUser } from 'react-icons/fa'; // Importing icons
import AdminOptionsDropdown from '../AdminOptionsDropdown';
import { MdDeveloperMode } from "react-icons/md";
import { useAppContext } from '@/app/Context/AppContext';

export const LeftMenubar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };
  const userContext = useAppContext()[0] as any
  const roles = userContext?.user?.roles.map((role: any) => role?.name);

  const isActive = (path: string) => usePathname() === path as any;

  return (
    <div className=" flex flex-col">
      <nav className={`left-menu-bar-style flex flex-col overflow-hidden ${isCollapsed ? 'w-14' : 'w-64'} h-[calc(100vh-var(--top-menu-height))] transition-all duration-50`}>
        {/* Toggle Button */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
          <div className="text-white text-lg font-bold">
            {isCollapsed ? '' : ''}
          </div>
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        {/* User Info (only show when not collapsed)
        {!isCollapsed && (
          <div className="text-start mb-4 mt-4 ps-4">
            <div className="text-white font-bold">User Name: {userContext.user.displayName}</div>
            <div className="text-gray-400 font-medium">User Email: {userContext.user.email}</div>
            <div className="text-gray-400 font-medium">User Role: {userContext.roles[0]}</div>
          </div>
        )} */}

        <div className='pt-3 flex flex-col justify-center overflow-hidden items-center'>
          <ul className={`flex flex-col overflow-y-auto space-y-5 ${isCollapsed && 'w-8'}`}>
            <li>
              <Link className={`text-white hover:bg-cyan-600 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.home) ? 'bg-cyan-700' : ''}`} href={routes.home}>
                <div className="justify-start flex items-center w-52">
                  <FaHome className="" />
                  {!isCollapsed && <span className='ps-3'>Home</span>}
                </div>
              </Link>
            </li>
            {roles.includes("Admin") ? (
              <li>
                <Link className={`text-white hover:bg-cyan-600 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.practices) ? 'bg-cyan-700' : ''}`} href={routes.practices}>
                  <div className="justify-start flex items-center w-52">
                    <MdDeveloperMode className="" />
                    {!isCollapsed && <span className='ps-3'>Practices</span>}
                  </div>
                </Link>
              </li>
            ) : (
              <li>
                <Link className={`text-white hover:bg-cyan-600 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.practiceDashboard) ? 'bg-cyan-700' : ''}`} href={routes.practiceDashboard}>
                  <div className="justify-start flex items-center w-52">
                    <MdDeveloperMode className="" />
                    {!isCollapsed && <span className='ps-3'>My Practice</span>}
                  </div>
                </Link>
              </li>
            )}

            {/* <li>
              <Link className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.employee) ? 'bg-gray-700' : ''}`} href={routes.employee}>
                <div className="justify-start flex items-center w-52">
                  <FaUser className="" />
                  {!isCollapsed && <span className='ps-3'>Employees</span>}
                </div>
              </Link>
            </li>
            <li>
              <Link className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.task) ? 'bg-gray-700' : ''}`} href={routes.task}>
                <div className="justify-start flex items-center w-52">
                  <FaTasks className="" />
                  {!isCollapsed && <span className='ps-3'>Tasks</span>}
                </div>
              </Link>
            </li> */}
          </ul>
        </div>
        {/* <div className='pt-3'>
          <ul className="flex flex-col space-y-5 px-3">
            <li>
              <Link className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive('/Dashboard/AboutUser') ? 'bg-gray-700' : ''}`} href="/Dashboard/AboutUser">
                <div className="justify-start flex items-center w-44">
                  <FaInfoCircle className="mx-3" />
                  {!isCollapsed && 'About'}
                </div>
              </Link>
            </li>
            <li>
              <Link className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive('/Dashboard/CreateRole') ? 'bg-gray-700' : ''}`} href="/Dashboard/CreateRole">
                <div className="justify-start flex items-center w-44">
                  <FaKey className="mx-3" />
                  {!isCollapsed && 'Create Role'}
                </div>
              </Link>
            </li>
            <li>
              <Link className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive('/Dashboard/AddRoleToUser') ? 'bg-gray-700' : ''}`} href="/Dashboard/AddRoleToUser">
                <div className="justify-start flex items-center w-44">
                  <FaUserTag className="mx-3" />
                  {!isCollapsed && 'Add Role to User'}
                </div>
              </Link>
            </li>
            <li>
              <Link className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive('/Dashboard/AddClaimToRole') ? 'bg-gray-700' : ''}`} href="/Dashboard/AddClaimToRole">
                <div className="justify-start flex items-center w-48">
                  <FaShieldAlt className="mx-3" />
                  {!isCollapsed && 'Add Claim to Role'}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/Dashboard/AddClaimToUser" className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive('/Dashboard/AddClaimToUser') ? 'bg-gray-700' : ''}`}>
                <div className="justify-start flex items-center w-48">
                  <FaUserCheck className="mx-3" />
                  {!isCollapsed && 'Add Claim to User'}
                </div>
              </Link>
            </li>
          </ul>
        </div> */}
        {roles.includes("Admin") &&
          <AdminOptionsDropdown isActive={isActive} isCollapsed={isCollapsed} />
        }
      </nav>
    </div>
  );
};
