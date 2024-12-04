import { IClaim, IRoleClaim, IRoleUser, IUser, IUserForm } from "../Interfaces/Interfaces";
import { apiService } from "./commonService"

class GroupService {

    constructor() {

    }

    async addGroup(role: any) {
        return await apiService.post("api/Admin/add_role", role)
    }

    async getGroups() {
        return await apiService.get("api/Admin/getRoles")
    }

    async deleteGroup() {
        return await apiService.get("api/Admin/getRoles")
    }


} export default GroupService