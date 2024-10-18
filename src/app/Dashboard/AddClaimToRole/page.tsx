'use client'

import SubmitButton from '@/app/Components/SubmitButton';
import usersService from '@/app/Services/usersService';
import React, { useEffect, useState } from 'react'
export default function AddClaimToRole() {

  const [formData, setFormData] = useState({
    roleName: '',
    claimType: '',
    claimValue:''
  });
  
   const service = new usersService();
  
   const [rolesResult,setRolesResult] =  useState([{name:""}]);


     useEffect(()=>{
 
         getUsersAndRoles();
 
     },[])
 
   const  getUsersAndRoles=async()=>{
         try {
             const userService = new usersService();
            const  roles = await userService.getRoles() as any;   
            setRolesResult(roles);

      
         } catch (error) {
             console.error("Error fetching data on the server:", error);
             return <div>Error loading roles or users</div>;
         }
     }
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    console.log(formData)
   const result = await service.addClaimtoRole(formData);
   console.log(result,formData);
  
  };

  return (
    <div className='flex-grow justify-center items-center max-w-screen-md'>
    <form onSubmit={handleSubmit} className="mx-auto p-6 bg-white shadow-md rounded-lg col-span-full">
    <div className='justify-center items-center text-center font-bold h4 mb-0'>Add Claim To Role</div>
    <div className="form-group mb-4 col-span-6">
          <label htmlFor="rolename" className="block text-gray-700 font-bold mb-2">Role Name</label>
          <select
            id="rolename"
            name="roleName"
            value={formData.roleName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a role</option>
            {rolesResult.map(role => (
              <option key={role?.name} value={role?.name}>{role?.name}</option>
            ))}
          </select>
        </div>
      <div className="form-group mb-4 col-span-6">
        <label htmlFor="rolename" className="block text-gray-700 font-bold mb-2">Claim Type</label>
        <input
          id="claimType"
          name="claimType"
          type='text'
          value={formData.claimType}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        </input>
      </div>
      <div className="form-group mb-4 col-span-6">
        <label htmlFor="rolename" className="block text-gray-700 font-bold mb-2">Claim Value</label>
        <input
          id="claimValue"
          name="claimValue"
          type='text'
          value={formData.claimValue}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        </input>
      </div>

      <SubmitButton title={"Update"} />
    </form>
  </div>
  )
}

