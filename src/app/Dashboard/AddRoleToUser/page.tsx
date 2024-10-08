"use client"

import SubmitButton from '@/app/Components/SubmitButton';
import usersService from '@/app/Services/usersService';
import React, { useEffect, useState } from 'react'

export default function AddRoleToUser() {

    const [formData, setFormData] = useState({
        roleName: '',
        userId:"",
      });

    const userService = new usersService();

    const [users,setUsers] = useState([]);
    const [roles,setRoles] = useState([]);

      useEffect(() => {
            getRolesAndUsers();
      }, []); 
    
      const getRolesAndUsers  = async()=>{

        const rolesResult = await userService.getRoles();   
        const usersResult = await userService.getUsers();
        console.log(rolesResult,usersResult)

      }

   const handleChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
           
       const role = e.target as any
       setFormData(formData.roleName = role.value);
    }

    const handleSubmit = (e:React.FormEvent)=>{
        // create service
        console.log(formData);
    }

  return (
    <div className='flex-grow justify-center items-center max-w-screen-md'>
        <form onSubmit={handleSubmit} className=" mx-auto p-6 bg-white shadow-md rounded-lg col-span-full">
            <div className="form-group mb-4  col-span-6" >
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">User Name</label>
                <select
                id="username"
                name="username"
                value={formData.roleName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    
                >
                    <option value={"_id"}>{"Nikhil"}</option>
                </select>
            </div>

            <div className="form-group mb-4  col-span-6" >
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Role Name</label>
                <select
                id="rolename"
                name="rolename"
                value={formData.roleName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={"Admin"}>{"Admin"}</option>
                </select>
            </div>

            <SubmitButton title={"Update"}/>
      </form>
    </div>
  )
}
