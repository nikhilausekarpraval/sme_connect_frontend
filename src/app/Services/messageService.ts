import { apiService } from "./commonService"

class messagesService {

    baseUrl = "https://localhost:5234/";
    constructor() {

    }

    async addMessage(messages: any) {

        return await apiService.post("api/message/add-message", messages,this.baseUrl)
    }

    async updateessage(message: any) {
        return await apiService.put("api/message/update-message", message,this.baseUrl)
    }

    async deleteMessages(items:any) {
        return await apiService.delete("api/message/delete-messages",items,this.baseUrl)
    }

    async getMessages(user:any) {
        return await apiService.post("api/message/get-discussion-chat",user,this.baseUrl)
    }

} export default messagesService
