"use client";

import React, { useState,useEffect } from 'react';
import SubmitButton from '@/app/Components/SubmitButton';
import usersService from '../Services/usersService';


interface Props {
  users: Array<{id:string,userName:string,}>;
  roles: Array<{id:string,name:string}>;
}

export default function AddRoleToUserClient({ users, roles }: Props) {
  const [formData, setFormData] = useState({
    roleName: '',
    userId: '',
  });

   const service = new usersService();

  useEffect(()=>{

    console.log(users)
  },[])


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    debugger;
    e.preventDefault();
   const result = await service.addRoleToUser(formData);
   console.log(result);

  };

  return (
    <div className='flex-grow justify-center items-center max-w-screen-md'>
      <form onSubmit={handleSubmit} className="mx-auto p-6 bg-white shadow-md rounded-lg col-span-full">
        <div className="form-group mb-4 col-span-6">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">User Name</label>
          <select
            id="username"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.userName}</option>
            ))}
          </select>
        </div>

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
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
        </div>

        <SubmitButton title={"Update"} />
      </form>
    </div>
  );
}
