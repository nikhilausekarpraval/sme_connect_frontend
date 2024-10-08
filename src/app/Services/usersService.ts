import { IClaim, IRoleUser, IUser } from "../Interfaces/Interfaces";
import { apiService } from "./commonService"






class usersService {

    constructor(){

    }

    async createUser(user:IUser){
       return await apiService.post('api/Authenticate/register',user);
    }

    // async updateUser(user:Iuser){
    //     return await apiService.put('api/Authenticate/update')
    // }

    async deleteUser(user:IUser){
        return await apiService.delete("api/Authenticate",user);
    }

    async getUsers(){
        await apiService.get("api/Authenticate/getAll");
    }

    async assignClaimToUser(claim:IClaim){
        await apiService.post("api/Admin/add_claim_to_user",claim);
    }

    async addRoleToUser(role:IRoleUser){
        await apiService.post("api/Admin/add_role_to_user",role)
    }

    async addClaimtoRole(claim:IClaim){
        await apiService.post("api/Admin/add_role_to_user",claim)

    }

    async addRole(role:string){
        await apiService.post("api/Admin/add_role",{role:role})
    }



}export default usersService