import Link from 'next/link'
import React from 'react'
import { routes } from '../Constants/Constants'

export default function UserMenu() {

    const logout=()=>{
        localStorage.clear();
        window.location.reload();
    }

  return (
    <div>
        <div className='flex '>
            <div className='font-bold'>
                 <Link href={routes.aboutUser}> <span></span>  Profile</Link>
            </div>
            <div className='font-bold'>
                 <button onClick={logout}><span></span> Logout</button> 
            </div>
        </div>
    </div>
  )
}
