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

    async getRecentDiscussion(discussionDetails: any,token="") {
        return await apiService.post("api/Discussion/get_recent_discussions", discussionDetails,"",token)
    }

    async getSimilarDiscussion(discussionDetails: any) {
        return await apiService.post("api/Discussion/get_similer_discussions", discussionDetails)
    }

    async getDiscussionUsers(discussionDetails: any) {
        return await apiService.post("api/Discussion/get_discussion_users", discussionDetails)
    }

    async deleteDiscussion(items:any) {
        return await apiService.delete("api/Discussion/delete_discussion",items)
    }

    async getDiscussions(group:string) {
        return await apiService.get(`api/Discussion/get_discussions?groupName=${group}`)
    }


} export default DiscussionsService