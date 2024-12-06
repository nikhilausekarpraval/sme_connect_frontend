
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
export const registerUserFormErrors = { email: "",role:"",claim:"",practice:"", group:"", password: "", invalid: "", question1: "", username: "", answer1: "", answer2: "", answer3: "", newPassword: "", confirmPassword: "" ,phoneNumber:""}

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
    field: "group",
    dataType: "string",
  },
  {
    field: "practice",
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

export const mobileNumberRegex = /^[6-9]\d{9}$/;
export const allow15Numbers = /^\d{0,15}$/;
export const allow15_7Numbers = /^(-?\d{0,15}\.\d{0,7})$/;
export const allowIntegers = /^-?[0-9]*$/;
export const allowNumbers = /(?<=\d)\.|\b\d+\b/;
export const allow10Numbers = /^\d{0,10}$/
export const allowDotAndDash = /^[-.]$/;
export const replaceChracterWithSpace = /[^0-9\-]/g;
export const replaceNumbersWithSpace = /[^0-9\.\-]/g;

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

  Group: "Group",

  Practice : "Practice",

  userRole : "Role",

  ModifiedOnDt: 'Modified On Dt',

  ModifiedBy : 'Modified By',



}