
import { apiService } from "./commonService"

class PracticesService {

    constructor() {

    }


    async addPractice(Practices: any) {
        return await apiService.post("api/Admin/add_Practices", Practices)
    }

    async deletePractices() {
        return await apiService.get("api/Admin/getPracticess")
    }

    async getPractices() {
        return await apiService.get("api/Admin/getPracticess")
    }


} export default PracticesService