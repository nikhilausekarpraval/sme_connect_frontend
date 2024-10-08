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

    async assignClaimToUser(claim:IClaim){
       return await apiService.post("api/Admin/add_claim_to_user",claim);
    }

    async addRoleToUser(role:IRoleUser){
      return  await apiService.post("api/Admin/add_role_to_user",role)
    }

    async addClaimtoRole(claim:IClaim){
      return  await apiService.post("api/Admin/add_role_to_user",claim)

    }

    async addRole(role:string){
        return await apiService.post("api/Admin/add_role",{role:role})
    }

    async getRoles(){
        return await apiService.get("api/Admin/getRoles")
    }

    async getUsers(){
       return await apiService.get("api/Admin/getUsers")
    }


}export default usersService