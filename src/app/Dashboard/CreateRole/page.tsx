"use client"

import SubmitButton from '@/app/Components/SubmitButton';
import usersService from '@/app/Services/usersService';
import React, { useState } from 'react'

export default function createRole() {

    const [formData, setFormData] = useState({
        roleName : '',
      });

    const service = new usersService();

   const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
           
       const role = e.target as any
       setFormData(formData.roleName = role.value);
    }

    const handleSubmit = (e:React.FormEvent)=>{
      e.preventDefault();

      try{
        const result = service.addRole({roleName:formData});

      }catch(e:any){
        console.log(e);
      }
      
    }

  return (
    <div className='flex-grow justify-center items-center max-w-screen-md'>
        <form onSubmit={handleSubmit} className=" mx-auto p-6 bg-white shadow-md rounded-lg col-span-full">
        <div className='justify-center items-center text-center font-bold h4 mb-0'>Create Role</div>
            <div className="form-group mb-4 pt-2 col-span-6" >
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Role Name</label>
                <input
                type="text"
                id="rolename"
                name="rolename"
                value={formData.roleName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <SubmitButton title={"Create"}/>
      </form>
    </div>
  )
}

