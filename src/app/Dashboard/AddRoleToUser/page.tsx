"use client"
import AddRoleToUserClient from '@/app/Components/AddRoleToUserClient';
import usersService from '@/app/Services/usersService';
import { useEffect,useState } from 'react';


export default function page() {
    
  const [rolesResult,setRolesResult] =  useState([]);
  const [usersResult,setUsersResult] = useState([]);

    useEffect(()=>{

        getUsersAndRoles();

    },[])

  const  getUsersAndRoles=async()=>{
        try {
            
            const userService = new usersService();
           const  roles = await userService.getRoles();   
           setRolesResult(roles.value);
           const  users = await userService.getUsers();
           setUsersResult(users.value);
     
        } catch (error) {
            console.error("Error fetching data on the server:", error);
            return <div>Error loading roles or users</div>;
        }
    }

    return (
        <AddRoleToUserClient roles={rolesResult} users={usersResult} />
    );
}


