import { apiService } from "./commonService"

class AnnouncementService {

    constructor() {

    }

    async addAnnouncement(announcement: any) {
        return await apiService.post("api/Announcement/add_announcement", announcement)
    }

    async updateAnnouncement(announcement: any) {
        return await apiService.post("api/Announcement/update_announcement", announcement)
    }

    async deleteAnnouncement(items:any) {
        return await apiService.delete("api/Announcement/delete_announcement",items)
    }

    async getAnnouncement(user:any) {
        return await apiService.post(`api/Announcement/get_announcements`,user)
    }


} export default AnnouncementService