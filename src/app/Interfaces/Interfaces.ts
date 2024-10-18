

export interface IEmployee{
    id:number | null;
    name:string;
    position:string;
    designation:string;
    email:string;
    mobileNo:string;
    createdOnDt:Date | null;
    createdBy:string;
    tasks:ITaskDto[];
}

export interface ITask{
  id:number | null;
  name:string;
  description:string;
  assignedOnDt:Date | null;
  status:string;
  endDate:Date | null;
  createdOnDt : Date | null;
  createdBy:string;
  employeeId:number| any;
}   


export interface IEmployeeDto{
  id:number | null;
  name:string;
  position:string;
  designation:string;
  email:string;
  mobileNo:string;
  createdOnDt:Date | null;
  createdBy:string;
}

export interface ITaskDto{
id:number | null;
employeeId:number | any;
name:string;
description:string;
assignedOnDt:Date | null;
status:string;
endDate:Date | null;
createdOnDt : Date | null;
createdBy:string;
}   

export interface IUser{

    id : string
    
    userName : string

    email : string
 
    password: string
 
    displayName : string
}

export interface IClaim{

      userName : string

      userId : string

      claimType : string
      
      claimValue : string
}

export interface IRoleClaim{

  roleName : string

  claimType : string
  
  claimValue : string
}

export interface IRoleUser{

    userId: string,

    roleName :string
}

export interface IUserCredentials{
  username:string,
  password:string
}


export interface IRole{
 id:string,
 name:string,
}



export interface IUserContext {
  user : IUser,
  userClaim:IClaim,
  roleClaim:IRoleClaim,
  roles: string[],
}

export interface IApplicationContext {
expiration:string,
token:string,
userContext : IUserContext
}

export interface JwtPayload {
  exp:  number;  
  iat?: number; 
  sub?: string; 
  [key: string]:unknown;
}

export interface IQuestions{

}

export interface IUserForm{
  userName: string,
  email: string,
  password: string,
  displayName: string,
  newPassword: string,
  confirmPassword: string,
  question1:string,
  question2:string,
  question3:string,
  answer1:string,
  answer2:string,
  answer3:string
  mobileNumber:string,
  id:string,
}