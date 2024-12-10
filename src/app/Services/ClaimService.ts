import { IClaim, IRoleClaim, IRoleUser, IUser, IUserForm } from "../Interfaces/Interfaces";
import { apiService } from "./commonService"

class ClaimService {

    constructor() {

    }

    async getClaims() {
        return await apiService.get("api/RoleClaim/get_role_claims")
    }

    async updateClaim(claim: IRoleClaim[]) {
        return await apiService.post("api/RoleClaim/update_role_claim", claim)

    }

    async deleteClaim(claim: any) {
        return await apiService.delete("api/RoleClaim/delete_role_claim", claim)

    }

    async createClaim(claim: IRoleClaim) {
        return await apiService.post("api/RoleClaim/add_claim_to_role", claim)

    }

} export default ClaimService