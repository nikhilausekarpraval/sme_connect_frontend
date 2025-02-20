import { apiService } from "./commonService"

class GroupRequestService {

    constructor() {

    }

    async addGroupRequest(group_request: any) {
        return await apiService.post("api/GroupRequest/add_group_request", group_request)
    }

    async updateGroupRequest(group_request: any) {
        return await apiService.post("api/GroupRequest/update_group_request", group_request)
    }

    async deleteGroupRequest(group_request:string[]) {
        return await apiService.delete("api/GroupRequest/delete_group_requests",group_request)
    }

    async getGroupRequests(userEmail="",token=""){
        return await apiService.get(`api/GroupRequest/get_group_requests?userEmail=${userEmail}`);
    }


} export default GroupRequestService