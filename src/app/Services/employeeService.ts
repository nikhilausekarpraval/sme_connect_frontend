
import { apiService } from "./commonService"

export class EmployeeService  {

    constructor(){

    }

    async getEmployees(){
       await apiService.get("employee/get")
    }

    async createEmployee(employee:any){
        await apiService.post("employee/register",employee)
    }

    async updateEmployee(employee:any){
        await apiService.put("employee/update",employee);
    }

    async deleteEmployees(employees:any){
        await apiService.delete("employee/delete",employees);
    }

}