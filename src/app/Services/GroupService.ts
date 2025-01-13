import { IClaim, IUserGroup } from "../Interfaces/Interfaces";
import { apiService } from "./commonService"

class GroupService {

    constructor() {

    }

    async addGroup(group: any) {
        return await apiService.post("api/Group/add_group", group)
    }

    async updateGroup(group: any) {
        return await apiService.post("api/Group/update_group", group)
    }

    async getGroups (token="") {
        return await apiService.get("api/Group/get_groups",token)
    }

    async getUserPracticeGroups (practice="",token="") {
        return await apiService.get(`api/Group/get_user_practice_groups?practice=${practice}`,token)
    }

    async deleteGroups(groups:IUserGroup[]) {
        return await apiService.delete("api/Group/delete_groups",groups)
    }


} export default GroupService