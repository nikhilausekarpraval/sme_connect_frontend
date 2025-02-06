import { apiService } from "./commonService"

class DiscussionsService {

    constructor() {

    }

    async addDiscussion(Discussion: any) {
        return await apiService.post("api/Discussion/add_discussion", Discussion)
    }

    async updateDiscussion(discussion: any) {
        return await apiService.post("api/Discussion/update_discussion", discussion)
    }

    async deleteDiscussion(items:any) {
        return await apiService.delete("api/Discussion/delete_discussion",items)
    }

    async getDiscussions(group:string) {
        return await apiService.get(`api/Discussion/get_discussions?groupName=${group}`)
    }


} export default DiscussionsService