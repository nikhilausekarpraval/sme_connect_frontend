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

    async getGroupUsers() {
        return await apiService.get("api/GroupUsers/get_group_users")
    }

    async deleteGroupUsers(group_user_user:IGroupUser[]) {
        return await apiService.delete("api/GroupUsers/delete_group_users",group_user_user)
    }


} export default GroupUserService