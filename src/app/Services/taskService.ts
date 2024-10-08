import { apiService } from "./commonService"

export class taskService  {

    constructor(){

    }

    async getTasks(){
       await apiService.get("task/get")
    }

    async createTasks(task:any){
        await apiService.post("task/register",task)
    }

    async updateTask(task:any){
        await apiService.put("task/update",task);
    }

    async deleteTasks(tasks:any){
        await apiService.delete("task/delete",tasks);
    }

}