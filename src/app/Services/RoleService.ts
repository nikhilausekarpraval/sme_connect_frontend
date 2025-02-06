import { IClaim, IRoleClaim, IRoleUser, IUser, IUserForm } from "../Interfaces/Interfaces";
import { apiService } from "./commonService"

class RoleService {

    constructor() {

    }

    async addRoleToUser(role: IRoleUser) {
        return await apiService.post("api/Admin/add_role_to_user", role)
    }

    async addRole(role: any) {
        return await apiService.post("api/Admin/add_role", role)
    }

    async getRoles() {
        return await apiService.get("api/Admin/get_roles")
    }

    async deleteRole(roles:string[]) {
        return await apiService.delete("api/Admin/delete_role",roles)
    }

    async getRolesWithClaims() {
        return await apiService.get("api/Admin/get_role_with_claims")
    }
    
} export default RoleService