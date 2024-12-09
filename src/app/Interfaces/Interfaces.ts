

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

    phoneNumber : string

    groupId : number

    role:string

    practiceId : number

}

export interface IClaim{

      userName : string

      userId : string

      claimType : string
      
      claimValue : string
}

export interface IUserClaim{
  userId: string

  claimType: string

  claimValue: string

  id: number
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

export interface IUserGroup{
  id:number,
  name:string,
  modifiedBy:string,
  modifiedOnDt:Date,
}

export interface IPractice{
  id:number,
  name:string
  modifiedBy: string,
  modifiedOnDt: Date,
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


export interface IRegisterUserErrors {
  email: string,password:string,username:string,answer1:string,answer2:string,answer3:string,newPassword:string,confirmPassword:string
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
  phoneNumber:string,
  id:string,
}

export interface ITableBodyProps {
  sortTableData: (data: IRole[],
    sortedColumn: string,
    sortOrder: string) => IRole[];
  sortedData: IRole[];
  isLoading: boolean;
  getData: () => void;
  defaultSortedColumn: string;
  setLoaderAndSortedData: (loading: boolean, sortedData: IRole[]) => void;
  handleRowCheckboxChange: (id: any) => void;
  selectedItems: Set<any>;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  sortedColumn: string;
  setSortedColumn: (col: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (page: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  tableHeaders: any;
}
