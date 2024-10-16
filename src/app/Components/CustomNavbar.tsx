'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import LoginModal from '../Dashboard/Forms/LoginModal'

export const CustomNavbar = () => {

  const [isForm,setForm] = useState(false);
  const handleClose = () => setForm(false);
  const handleShow = () =>{ setForm(true)};
  const [isUserLoggedIn,setIsUserLoggedIn] = useState(false);


  const logout=()=>{
      localStorage.clear();
      window.location.reload();
  }

  return (
    <div>
    <nav className='bg-blue-600 h-12 py-2 px-3 flex justify-between items-center' >
        <div>
          <h3 className='font-semibold text-xl text-white m-0'>Next.Js Demo</h3>
        </div>
        <div>
          <ul className='flex space-x-5 text-white items-center align-baseline no-underline m-0 p-0'>
            <li >
              <Link  className='text-white no-underline' href={"/#"}>
                 Home
              </Link>
            </li>
            <li>
             <Link className='text-white no-underline'  href={"/Dashboard/EmployeeDashboard/Employee"}>Employee</Link>
            </li>
            <li>
              <Link  className='text-white no-underline' href={"/Dashboard/EmployeeDashboard/Task"}>Task</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className='flex space-x-5 m-0'>
            <li>
              <button type='button' className='text-white no-underline' onClick={isUserLoggedIn ? handleShow : logout}  >{isUserLoggedIn ? "Login": "Logout"}</button>
            </li>
          </ul>
        </div>
    </nav>
      <LoginModal isShow={isForm} closeForm={handleClose} />
    </div>
  )
}
