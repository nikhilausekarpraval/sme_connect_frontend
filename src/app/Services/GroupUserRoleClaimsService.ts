
import { apiService } from "./commonService"

class GroupUserRoleClaimsService {

    constructor() {

    }

    async getRoleClaims( roleId:any) {
        return await apiService.post("api/GroupUserRoleClaim/get_group_user_role_claims",{roleId:roleId})
    }

    async createUpdateRoleClaims(claims: string[]) {
        return await apiService.post("api/GroupUserRoleClaim/add_group_role_claims", claims)

    }

} export default GroupUserRoleClaimsService