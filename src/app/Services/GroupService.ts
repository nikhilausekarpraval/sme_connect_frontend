import { IClaim, IUserGroup } from "../Interfaces/Interfaces";
import { apiService } from "./commonService"

class GroupService {

    constructor() {

    }

    async addGroup(role: any) {
        return await apiService.post("api/Practice/add_group", role)
    }

    async getGroups() {
        return await apiService.get("api/Practice/get_groups")
    }

    async deleteGroup(groups:IUserGroup[]) {
        return await apiService.delete("api/Practice/delete_groups",groups)
    }


} export default GroupService