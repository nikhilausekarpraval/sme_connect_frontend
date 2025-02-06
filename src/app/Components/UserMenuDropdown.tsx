import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon ,ChevronUpIcon} from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useState } from 'react';
import { routes } from '../Constants/Constants';
import authService from '../Services/authService';
import { useRouter } from 'next/navigation';

export default function UserMenuDropdown() {
    
    const [isDropdown, setIsDropdown] = useState(false);
    const router = useRouter();

    const logout= async()=>{
        await authService.logout();
        router.push("/")
        sessionStorage.clear();
        window.location.reload();
    }

  return (
    <Menu as="div" className="relative text-left">
      <div onClick={()=>setIsDropdown(!isDropdown)}>
        <MenuButton className="flex  justify-center items-center pe-1 rounded-md px-0 py-0 text-sm font-semibold text-gray-900  ring-inset ring-gray-300 hover:bg-gray-200 opacity-70">
          {isDropdown ?
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-white" />:
          <ChevronUpIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-white"/>
          }
        </MenuButton>
      </div>

      <MenuItems
        className="absolute  right-0 z-10 mt-2 w-28 origin-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              href={routes.aboutUser}
              className="block px-4 py-2 w-full text-center font-bold text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <button onClick={logout}
              className="block w-full px-4 py-2 text-sm font-bold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Logout
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
