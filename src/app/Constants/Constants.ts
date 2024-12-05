
import { IApplicationContext, IClaim, IGroup, IPractice, IRole, IRoleClaim, IUser } from "../Interfaces/Interfaces";


export const emptyUser = {
  userName: '', password: "", groupId:0, practiceId:0, email: "", displayName: "", id: "", phoneNumber: "", question1: "", question2: "", question3: "", answer1: "", answer2: "", answer3: "", newPassword: "",
  confirmPassword: ""
}

export const quenstionsAndAnswers = [{ question1: "answer1" }, { question2: "answer2" }, { question3: "answer3" }]

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
export const registerUserFormErrors = { email: "",role:"",practice:"", group:"", password: "", invalid: "", question1: "", username: "", answer1: "", answer2: "", answer3: "", newPassword: "", confirmPassword: "" ,phoneNumber:""}

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

export const routes = {

  aboutUser: "/Dashboard/AboutUser",
  addClaimToRole: "/Dashboard/AddClaimToRole",
  addClaimToUser: "/Dashboard/AddClaimToUser",
  addRoleToUser: "/Dashboard/AddRoleToUser",
  createTole: "/Dashboard/CreateRole",
  employee: "/Dashboard/EmployeeDashboard/Employee",
  task: "/Dashboard/EmployeeDashboard/Task",
  home: "/Dashboard/Home",
  user:"/Dashboard/User",

}

export const pleaseSelectQuestionAndAswer = "Please select question and answer";

export const pleaseSelectDifferentQuestion = "Please select different question";

export const totalQuestions = ["question1", "question2", "question3"];

export const totalAnswers = ["answer1", "answer2", "answer3"];

export const UserColumnConfig = [
  {
    field: "id",
    dataType: "string",
  },
  {
    field: "email",
    dataType: "string",
  },
  {
    field: "displayName",
    dataType: "string",
  },
  {
    field: "userName",
    dataType: "string",
  },
  {
    field: "userGroupName",
    dataType: "string",
  },
  {
    field: "userRole",
    dataType: "string",
  },

];

export const rolesData:IRole[]=[
  {id:"234",name:"admin"},
  {id:"234",name:"Manager"}
]

export const groupsData: IGroup[] = [
  { id: 1, name: "Admin" },
  { id: 2, name: "HR" },
  { id: 3, name: "User" },
  { id: 4, name: "IT" },
];


export const practicesData: IPractice[] = [
  { id: 1, practice: "Software Development" },
  { id: 2, practice: "Quality Assurance" },
  { id: 3, practice: "Project Management" },
  { id: 4, practice: "Business Analysis" },
];

export const userHeaders = {

  id : "ID",

  email: "Email",

  displayName: "Full Name",

  userName: "User Name",

  userGroupName: "Group",

  userRole : "Role",

  CreatedOn : 'Created On Dt',

  CreatedBy : 'Created By',

  ChangedOn : 'Changed On Dt',

  ChangedBy : 'Changed By'

}