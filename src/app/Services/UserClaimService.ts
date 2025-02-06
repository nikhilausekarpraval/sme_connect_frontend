
import { IUserClaim } from "../Interfaces/Interfaces"
import { apiService } from "./commonService"

class UserClaimService {

    constructor() {

    }

    async getClaims() {
        return await apiService.get("api/userClaims/get_user_claims")
    }

    async updateClaim(claim: IUserClaim[]) {
        return await apiService.post("api/userClaims/update_user_claim", claim)

    }

    async deleteClaim(claim: any) {
        return await apiService.delete("api/userClaims/delete_user_claim", claim)

    }

    async createClaim(claim: IUserClaim) {
        return await apiService.post("api/userClaims/add_claim_to_user", claim)
    }

} export default UserClaimService