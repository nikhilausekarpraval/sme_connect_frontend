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
        return await apiService.get("api/Admin/getRoles")
    }

    async deleteRole() {
        return await apiService.get("api/Admin/deleteRoles")
    }


} export default RoleService