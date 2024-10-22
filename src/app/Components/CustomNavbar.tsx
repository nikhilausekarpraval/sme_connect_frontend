'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import LoginModal from '../Dashboard/Forms/LoginModal'
import UserMenuDropdown from './UserMenuDropdown'

export const CustomNavbar = () => {

  const [isForm,setForm] = useState(false);
  const handleClose = () => setForm(false);
  const userContext = useAppContext()[0].userContext;
  const [isDropdown, setIsDropdown] = useState(false);

  var initials =
  userContext.user.displayName.charAt(0) +
  (userContext.user.displayName.indexOf(" ") !== -1 ? userContext.user.displayName.charAt(userContext.user.displayName.indexOf(" ") + 1) : "");

  // const isActive = (path:string) => usePathname() === path as any;


  return (
    <div>
    <nav className='bg-blue-600 h-12 py-2 px-3 flex justify-between items-center' >
        <div>
          <h3 className='font-semibold text-xl text-white m-0' ><Link href="/Dashboard/Home">Next.Js Demo</Link></h3>
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
        <div>
          <ul className='flex m-0'>
            <li>
            <div className="current-user col-9 d-inline-block text-dark ">
              <div className="d-flex justify-content-end">
                <div className="row user-container bg-none text-dark m-0">
                  <div className="p-0">
                    <div className="row p-0 m-0">
                      <div className="col col-sm-3 my-0 py-0 px-2 rounded-5 border-1 d-flex">
                        <div className="user-initials text-white align-items-center d-flex h-100 justify-content-center rounded w-100">
                          {initials}
                        </div>
                      </div>
                      <div className="col col-sm-9  px-2 d-flex  flex-column  justify-content-evenly ">
                        <div>
                          <h3 className="user-name h6 font-bold m-0 p-0 text-white">
                            {userContext.user.email}
                          </h3>
                        </div>
                        <div className='flex gap-3 items-center'>
                              <div className="text-sm text-white ">
                                {userContext.roles[0]}
                              </div>
                            <div className=" text-gray-100 cursor-pointer" onClick={()=>setIsDropdown(!isDropdown)}>  
                                <UserMenuDropdown/>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </li>
            {/* <li>
              <button type='button' className='text-white no-underline' onClick={isUserLoggedIn ? handleShow : logout}  >{isUserLoggedIn ? "Login": "Logout"}</button>
            </li> */}
          </ul>
        </div>
    </nav>
      <LoginModal isShow={isForm} closeForm={handleClose} />
    </div>
  )
}

