import { IClaim, IRoleClaim, IRoleUser, IUser, IUserForm } from "../Interfaces/Interfaces";
import { apiService } from "./commonService"

class ClaimService {

    constructor() {

    }

    async getClaims() {
        return await apiService.get("api/Admin/getClaims")
    }

    async addClaimtoRole(claim: IRoleClaim) {
        return await apiService.post("api/Admin/add_claim_to_role", claim)

    }

    async deleteClaim(claim: any) {
        return await apiService.delete("api/Admin/deleteClaim", claim)

    }

    async createClaim(claim: IRoleClaim) {
        return await apiService.post("api/Admin/createClaim", claim)

    }

} export default ClaimService