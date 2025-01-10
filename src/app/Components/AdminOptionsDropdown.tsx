import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdAdminPanelSettings, MdDeveloperMode } from 'react-icons/md';
import { routes } from '../Constants/Constants';
import { FaUserLock } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiTreeViewFill } from "react-icons/pi";
import { MdOutlineSecurity } from "react-icons/md";
import { FiUsers } from 'react-icons/fi';
import { RiGroup2Line } from 'react-icons/ri';


interface IAdminOptionsDropdownProps {
  isCollapsed: boolean;
  isActive: (path: string) => boolean;
}

const AdminOptionsDropdown: React.FC<IAdminOptionsDropdownProps> = ({ isCollapsed, isActive }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const menuRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Do nothing here to prevent dropdown from closing when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdown(!isDropdown);

  return (
    <div className="flex-1 flex flex-col overflow-hidden text-left py-4 px-3" ref={menuRef}>
      <div className={isCollapsed ? "w-8": ""} onClick={(event) => {
        event.stopPropagation();
        toggleDropdown(); // Toggle dropdown
      }}>
        <button className="flex justify-start items-center w-full rounded-md p-2 font-semibold text-white ring-inset ring-gray-300 hover:bg-cyan-700">
         {!isCollapsed &&<span className='flex justify-center items-center'> <MdAdminPanelSettings size={20}/> <span className='px-3'>Admin Menu</span></span> }
          {isDropdown ? (
            <FaChevronDown width={16} height={16} className=''/>
          ) : (
            <FaChevronUp  className='' />
          )}
        </button>
      </div>

      {isDropdown && (
        <div
          className={` ${!isCollapsed && ''}  mt-2 py-2 overflow-y-auto ${
            !isCollapsed ? 'w-56' : 'inline-block w-8 '
          } origin-center rounded-md ring-1 ring-black ring-opacity-5 transition focus:outline-none`}
        >
          <div className="flex flex-col space-y-5">
            {/* <Link
              className={`text-white hover:bg-cyan-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${
                isActive('/Dashboard/AboutUser') ? 'bg-cyan-700' : ''
              }`}
              href="/Dashboard/AboutUser"
            >
              <div className="justify-start flex items-center">
                <FaInfoCircle />
                {!isCollapsed && <span className="ps-3">About</span>}
              </div>
            </Link> */}
            <Link className={`text-white hover:bg-cyan-600 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.user) ? 'bg-cyan-700' : ''}`} href={routes.user}>
              <div className="justify-start flex items-center w-52">
                <FiUsers className="" />
                {!isCollapsed && <span className='ps-3'>Users</span>}
              </div>
            </Link>
            <Link
              className={`text-white hover:bg-cyan-600 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.role) ? 'bg-cyan-700' : ''
                }`}
              href={routes.role}
            >
              <div className="justify-start flex items-center w-44">
                <FaUserLock />
                {!isCollapsed && <span className="ps-3">Role</span>}
              </div>
            </Link>
            <Link
              className={`text-white hover:bg-cyan-600 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.group) ? 'bg-cyan-700' : ''
                }`}
              href={routes.group}
            >
              <div className="justify-start flex items-center w-44">
                <FaPeopleGroup />
                {!isCollapsed && <span className="ps-3">Group</span>}
              </div>
            </Link>
            <Link
              className={`text-white hover:bg-cyan-600 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.groupUsers) ? 'bg-cyan-700' : ''
                }`}
              href={routes.groupUsers}
            >
              <div className="justify-start flex items-center w-44">
               <RiGroup2Line />
                {!isCollapsed && <span className="ps-3">Group Users</span>}
              </div>
            </Link>
            {/* <Link
              className={`text-white hover:bg-cyan-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.practices) ? 'bg-cyan-700' : ''
                }`}
              href={routes.practices}
            >
              <div className="justify-start flex items-center w-44">
                <MdDeveloperMode />
                {!isCollapsed && <span className="ps-3">Practices</span>}
              </div>
            </Link> */}
            <Link
              className={`text-white hover:bg-cyan-600 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.practiceAdminDashboard) ? 'bg-cyan-700' : ''
                }`}
              href={routes.practiceAdminDashboard}
            >
              <div className="justify-start flex items-center w-44">
                <PiTreeViewFill />
                {!isCollapsed && <span className="ps-3">Practice</span>}
              </div>
            </Link>
            <Link
              className={`text-white hover:bg-cyan-600 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${isActive(routes.roleClaim) ? '' : ''
                }`}
              href={routes.roleClaim}
            >
              <div className="justify-start flex items-center w-44">
                <MdOutlineSecurity />
                {!isCollapsed && <span className="ps-3">Role Claim</span>}
              </div>
            </Link>
            {/* <Link
              className={`text-white hover:bg-cyan-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${
                isActive('/Dashboard/CreateRole') ? 'bg-cyan-700' : ''
              }`}
              href="/Dashboard/CreateRole"
            >
              <div className="justify-start flex items-center w-44">
                <FaKey />
                {!isCollapsed && <span className="ps-3">Create Role</span>}
              </div>
            </Link>
            <Link
              className={`text-white hover:bg-cyan-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${
                isActive('/Dashboard/AddRoleToUser') ? 'bg-cyan-700' : ''
              }`}
              href="/Dashboard/AddRoleToUser"
            >
              <div className="justify-start flex items-center w-44">
                <FaUserTag />
                {!isCollapsed && <span className="ps-3">Add Role to User</span>}
              </div>
            </Link>
            <Link
              className={`text-white hover:bg-cyan-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${
                isActive('/Dashboard/AddClaimToRole') ? 'bg-cyan-700' : ''
              }`}
              href="/Dashboard/AddClaimToRole"
            >
              <div className="justify-start flex items-center w-48">
                <FaShieldAlt />
                {!isCollapsed && <span className="ps-3">Add Claim to Role</span>}
              </div>
            </Link>
            <Link
              href="/Dashboard/AddClaimToUser"
              className={`text-white hover:bg-cyan-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${
                isActive('/Dashboard/AddClaimToUser') ? 'bg-cyan-700' : ''
              }`}
            >
              <div className="justify-start flex items-center w-48">
                <FaUserCheck />
                {!isCollapsed && <span className="ps-3">Add Claim to User</span>}
              </div>
            </Link> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOptionsDropdown;
