
import { IApplicationContext, IClaim, IRoleClaim, IUser } from "../Interfaces/Interfaces";

export const emptyUser = {userName:'',password:"",email:"",displayName:"",id:"",mobileNumber:"",question:"",answer:"",  newPassword: "",
    confirmPassword: ""}
export const questions = ["What was the name of your first pet?",
    "What was the make and model of your first car?",
    "In what city were you born?",
    "What was your childhood nickname?",
    "What is the name of your favorite teacher?",
    "What is the name of your best friend from childhood?",
    "What is the name of the street you grew up on?",
    "What is your father's middle name?",
    "What was the name of your first school?",
    "What is the name of the company where you got your first job?"]
export const registerUserFormErrors = {email:"",password:"",username:"",answer:"",newPassword:"",confirmPassword:""}

export const emptyApplicationContext: IApplicationContext = {
    expiration: "",
    token: '',
    userContext: {
      user: {} as IUser, 
      userClaim: {} as IClaim, 
      roleClaim: {} as IRoleClaim,
      roles: []
    }
  };

export const Routes = {

  aboutUser : "/Dashboard/AboutUser",
  addClaimToRole:"/Dashboard/AddClaimToRole",
  addClaimToUser : "/Dashboard/AddClaimToUser",
  addRoleToUser : "/Dashboard/AddRoleToUser",
  createTole :"/Dashboard/CreateRole",
  employee : "/Dashboard/EmployeeDashboard/Employee",
  task : "/Dashboard/EmployeeDashboard/Task",
  home : "/Dashboard/Home"

}