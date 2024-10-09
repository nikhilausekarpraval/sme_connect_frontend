
import AddRoleToUserClient from '@/app/Components/AddRoleToUserClient';
import usersService from '@/app/Services/usersService';

// This will run on the server
export default async function AddRoleToUserServer() {
  
    const userService = new usersService();

    const rolesResult = await userService.getRoles();   
    const usersResult = await userService.getUsers();

    return (
        <AddRoleToUserClient roles={rolesResult} users={usersResult} />
    );
}
