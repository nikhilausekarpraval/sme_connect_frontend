
import { apiService } from "./commonService"

class PracticesService {

    constructor() {

    }

    async addPractice(Practices: any) {
        return await apiService.post("api/Practice/add_practice", Practices)
    }

    async updatePractice(practice: any) {
        return await apiService.post("api/Practice/update_practice", practice)
    }

    async deletePractices(items:any) {
        return await apiService.delete("api/Practice/delete_practices",items)
    }

    async getPractices() {
        return await apiService.get("api/Practice/get_practices")
    }


} export default PracticesService