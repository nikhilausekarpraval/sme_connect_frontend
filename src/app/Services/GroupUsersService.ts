import { IGroupUser } from "../Interfaces/Interfaces";
import { apiService } from "./commonService"

class GroupUserService {

    constructor() {

    }

    async addGroupUser(group_user: any) {
        return await apiService.post("api/GroupUsers/add_group_user", group_user)
    }

    async updateGroupUser(group_user: any) {
        return await apiService.post("api/GroupUsers/update_group_user", group_user)
    }

    async getAllGroupUsers() {
        return await apiService.get("api/GroupUsers/get_group_users")
    }

    async getGroupAllUsers(group:string) {
        return await apiService.get(`api/GroupUsers/get_group_all_users?group=${group}`)
    }

    async deleteGroupUsers(group_user_user:string[]) {
        return await apiService.delete("api/GroupUsers/delete_group_users",group_user_user)
    }

    async getUserGroups(practice="",token=""){
        return await apiService.get(`api/GroupUsers/get_user_groups?practice=${practice}`,token);
    }


} export default GroupUserService