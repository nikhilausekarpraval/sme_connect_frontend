'use client'

import { useAppContext } from '@/app/Context/AppContext';
import { isString } from '@/app/Helpers/Helpers';
import Link from 'next/link'
import UserAvatar from '../UserAvatar/UserAvatar';
import './CustomNavbar.scss';



export const CustomNavbar = () => {

  const userContext = useAppContext()[0] as any
 
  const displayName = isString(userContext?.user?.displayName) ? userContext?.user?.displayName : userContext?.user?.userName;
  var initials =
  displayName?.charAt(0) +
  (displayName?.indexOf(" ") !== -1 ? displayName?.charAt(displayName?.indexOf(" ") + 1) : "");

  // const isActive = (path:string) => usePathname() === path as any;


  return (
    <div>
    <nav className='top-nav-background-color h-12  px-3 flex justify-between items-center' >
        <div>
          <h3 className='font-semibold text-xl text-white m-0' ><Link href="/Dashboard/Home">SME Connect</Link></h3>
        </div>
        <div>
          {/* <ul className='flex space-x-5 text-white items-center align-baseline no-underline m-0 p-0'>
            <li >
              <div className='flex flex-col'>
                <Link  className='text-white no-underline' href={"/Dashboard/Home"}>
                  Home
                </Link>
                    { isActive("/Dashboard/Home")&&
                     <div className='border-white border-b-4 p-0 m-0'>
                      </div>
                    }
              </div>
            </li>
            <li>
             <Link className='text-white no-underline'  href={"/Dashboard/EmployeeDashboard/Employee"}>Employee</Link>
             {isActive("/Dashboard/EmployeeDashboard/Employee")&&
              <div className='border-white border-b-4 p-0 m-0'>
              </div>
             }
            </li>
          
            <li>
              <Link  className='text-white no-underline' href={"/Dashboard/EmployeeDashboard/Task"}>Task</Link>
              {isActive("/Dashboard/EmployeeDashboard/Task")&&
              <div className='border-white border-b-4 p-0 m-0'>
              </div>
              }

            </li>
          </ul> */}
        </div>
     <UserAvatar initials={initials} userContext={userContext}/>
    </nav>
    </div>
  )
}

