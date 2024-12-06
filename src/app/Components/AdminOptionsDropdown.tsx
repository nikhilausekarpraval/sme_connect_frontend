import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaInfoCircle, FaKey, FaShieldAlt, FaUserCheck, FaUserTag } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';

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
    <div className="relative text-left py-4 px-3" ref={menuRef}>
      <div className={isCollapsed ? "w-8": ""} onClick={(event) => {
        event.stopPropagation();
        toggleDropdown(); // Toggle dropdown
      }}>
        <button className="flex justify-start items-center w-full rounded-md p-2 font-semibold text-white ring-inset ring-gray-300 hover:bg-gray-700">
         {!isCollapsed &&<span className='flex justify-center items-center'> <MdAdminPanelSettings/> <span className='px-3'>Admin Menu</span></span> }
          {isDropdown ? (
            <FaChevronDown width={16} height={16} className=''/>
          ) : (
            <FaChevronUp  className='' />
          )}
        </button>
      </div>

      {isDropdown && (
        <div
          className={`absolute ${!isCollapsed && 'right-4'} z-10 mt-2 py-2 ${
            !isCollapsed ? 'w-56' : 'inline-block w-8 right-3'
          } origin-center rounded-md bg-gray-800 ring-1 ring-black ring-opacity-5 transition focus:outline-none`}
        >
          <div className="flex flex-col space-y-5">
            {/* <Link
              className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${
                isActive('/Dashboard/AboutUser') ? 'bg-gray-700' : ''
              }`}
              href="/Dashboard/AboutUser"
            >
              <div className="justify-start flex items-center">
                <FaInfoCircle />
                {!isCollapsed && <span className="ps-3">About</span>}
              </div>
            </Link> */}
            <Link
              className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${
                isActive('/Dashboard/CreateRole') ? 'bg-gray-700' : ''
              }`}
              href="/Dashboard/CreateRole"
            >
              <div className="justify-start flex items-center w-44">
                <FaKey />
                {!isCollapsed && <span className="ps-3">Create Role</span>}
              </div>
            </Link>
            <Link
              className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${
                isActive('/Dashboard/AddRoleToUser') ? 'bg-gray-700' : ''
              }`}
              href="/Dashboard/AddRoleToUser"
            >
              <div className="justify-start flex items-center w-44">
                <FaUserTag />
                {!isCollapsed && <span className="ps-3">Add Role to User</span>}
              </div>
            </Link>
            <Link
              className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${
                isActive('/Dashboard/AddClaimToRole') ? 'bg-gray-700' : ''
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
              className={`text-white hover:bg-gray-700 rounded-lg px-2 py-2 flex items-center justify-start transition-all duration-50 no-underline ${
                isActive('/Dashboard/AddClaimToUser') ? 'bg-gray-700' : ''
              }`}
            >
              <div className="justify-start flex items-center w-48">
                <FaUserCheck />
                {!isCollapsed && <span className="ps-3">Add Claim to User</span>}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOptionsDropdown;
