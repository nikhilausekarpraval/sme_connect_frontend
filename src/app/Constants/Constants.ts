
import { IApplicationContext, IClaim, IDiscussion, IPractice, IRole, IRoleClaim, IUser, IUserClaim, IUserGroup } from "../Interfaces/Interfaces";


export const emptyUser = {
  userName: '', password: "", groupId:0,role:"", practiceId:0, email: "", displayName: "", id: "", phoneNumber: "", question1: "", question2: "", question3: "", answer1: "", answer2: "", answer3: "", newPassword: "",
  confirmPassword: ""
}

export const emptyRole = {
  id:"",name:"",claims:null
}

export const emptyClaim ={
  id:0,claimType:"",claimValue:"",roles:[{id:"",name:""}]
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

export const createRoleErrors = {role:"",claim:""}

export const createDiscussionErrors = {title:"",description:"",status:""}

export const discussionStatusTypes = {
  Open: "Open", Close: "Close", Starred: "Starred", Unstar : "Unstar", Star:"Star"
};

export const discussionCloseType = ["Close","Unstar"]

export const emptyDiscussion = {
  id:0,
  title:"",
  description:"",
  status:"Open",
}

export const discussionStatus = ["Open","Closed","Starred"];

export const createRoleClaimErrors = {claimType:"",claimValue:""}

export const routes = {

  aboutUser: "/Dashboard/AboutUser",
  addClaimToRole: "/Dashboard/AddClaimToRole",
  addClaimToUser: "/Dashboard/AddClaimToUser",
  addRoleToUser: "/Dashboard/AddRoleToUser",
  createTole: "/Dashboard/CreateRole",
  employee: "/Dashboard/EmployeeDashboard/Employee",
  task: "/Dashboard/EmployeeDashboard/Task",
  home: "/",
  user:"/Dashboard/User",
  role:"/Dashboard/Role",
  group:"/Dashboard/Group",
  practice:"/Dashboard/Practice",
  roleClaim:"/Dashboard/RoleClaim",
  practices: "/Dashboard/Practices",
  practiceDashboard: "/Dashboard/PracticeDashboard",
  groupDashboard: "/Dashboard/GroupDashboard",
  discussionDashboard:"/Dashboard/DiscussionDashboard"
}

export const discussions:IDiscussion[] = [
  {
    id: 0,
    title: ".NET discussion",
    description: "Focuses on .NET technologies for enterprise applications.",
    status: "Open"
  },
  {
    id: 0,
    title: "Frontend discussion",
    description: "Specializes in building modern UI using popular frontend tools.",
    status: "Close"
  },
  {
    id: 0,
    title: "Python Developers",
    description: "Dedicated to Python and its diverse ecosystem.",
    status: "Starred"
  },
  {
    id: 0,
    title: ".NET discussion",
    description: "Focuses on .NET technologies for enterprise applications.",
    status: "Open"
  },
  {
    id: 0,
    title: "Frontend discussion",
    description: "Specializes in building modern UI using popular frontend tools.",
    status: "Close"
  },
  {
    id: 0,
    title: "Python Developers",
    description: "Dedicated to Python and its diverse ecosystem.",
    status: "Starred"
  },
];


export const pleaseSelectQuestionAndAswer = "Please select question and answer";

export const pleaseSelectDifferentQuestion = "Please select different question";

export const totalQuestions = ["question1", "question2", "question3"];

export const totalAnswers = ["answer1", "answer2", "answer3"];

export const practicesList = [
  {
    title: "Web Development",
    metrics: ["5 Active Projects", "80% Sprint Progress"],
    links: [
      { text: "GitHub", url: "https://github.com" },
      { text: "Documentation", url: "https://developer.mozilla.org" },
    ],
    highlights: ["Deployed New Website", "Optimized Code", "95% Deployment Success"],
    visuals: { progress: 80 },
  },
  {
    title: "Database Management",
    metrics: ["10 Databases", "99.9% Uptime", "150ms Avg Query Time"],
    links: [
      { text: "Schema Design", url: "https://example.com/schema" },
      { text: "Backup Schedule", url: "https://example.com/backup" },
    ],
    highlights: ["Improved Indexing", "Automated Backups"],
    visuals: { progress: 95 },
  },
  {
    title: "Azure",
    metrics: ["20 Active Resources", "$3000 Monthly Cost", "95% Deployment Success"],
    links: [
      { text: "Azure Portal", url: "https://portal.azure.com" },
      { text: "Cost Optimization", url: "https://example.com/cost" },
    ],
    highlights: ["Deployed 3 New VMs", "Improved Network Performance"],
    visuals: { progress: 70 },
  },
  {
    title: "Oracle ERP",
    metrics: ["8 Models in Production", "92% Avg Accuracy", "1TB Dataset"],
    links: [
      { text: "Model Repository", url: "https://example.com/models" },
      { text: "Experiment Tracking", url: "https://example.com/experiments" },
    ],
    highlights: ["Deployed Fraud Detection Model", "Improved Precision by 5%"],
    visuals: { progress: 85 },
  },
  {
    title: "ServiceNow",
    metrics: ["150 Tickets Resolved", "2 Hours Avg Resolution Time", "98% SLA Compliance"],
    links: [
      { text: "ServiceNow Dashboard", url: "https://example.com/servicenow" },
      { text: "Knowledge Base", url: "https://example.com/knowledge" },
    ],
    highlights: ["Resolved Major Incident", "Improved Workflow Automation"],
    visuals: { progress: 90 },
  },
];


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
    field: "name",
    dataType: "string",
  },
  {
    field: "userRole",
    dataType: "string",
  },

];


export const RoleColumnConfig = [
  {
    field: "id",
    dataType: "string",
  },
  {
    field: "name",
    dataType: "string",
  },
  {
    field: "claims",
    dataType: "dropdown,claimType",
  },

];

export const rolesData:IRole[]=[
  {id:"234",name:"Admin", claims:null},
  {id:"234",name:"Manager",claims:null},
  {id:"34",name:"User",claims:null},
]

export const groupsData: IUserGroup[] = [
  { id: 1, name: "Admin",modifiedBy:"", modifiedOnDt:new Date() },
  { id: 2, name: "HR", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 3, name: "User", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 4, name: "IT", modifiedBy: "", modifiedOnDt: new Date() },
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
export const validString = /^[a-zA-Z]+$/;

export const practicesData: IPractice[] = [
  { id: 1, name: "Software Development", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 2, name: "Quality Assurance", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 3, name: "Project Management", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 4, name: "Business Analysis", modifiedBy: "", modifiedOnDt: new Date() },
];

export const userClaims: IUserClaim[] = [
  {
    userId: "user123",
    claimType: "Role",
    claimValue: "Admin",
    id: 1,
  },
  {
    userId: "user124",
    claimType: "Permission",
    claimValue: "ReadOnly",
    id: 2,
  },
  {
    userId: "user125",
    claimType: "Department",
    claimValue: "Finance",
    id: 3,
  },
  {
    userId: "user126",
    claimType: "Region",
    claimValue: "North America",
    id: 4,
  },
];

export const roleClaims: IRoleClaim[] = [
  {
    roleId: "user123",
    claimType: "Role",
    claimValue: "Admin",
    id : 3,
  },
  {
   roleId: "user124",
    claimType: "Permission",
    claimValue: "ReadOnly",
    id: 2,
  }
];

export const userHeaders = {

  id : "ID",

  email: "Email",

  displayName: "Full Name",

  userName: "User Name",

  Practice : "Practice",

  userRole : "Role",

  ModifiedOnDt: 'Modified On Dt',

  ModifiedBy : 'Modified By',

}

export const discussionTabs = {
  Starred: "Starred",
  Close: "Closed Discussions",
  Open: "Open Discussions"
}

export const roleHeaders = {

  id: "ID",

  name: "Role",

  claims:"Claims",

  ModifiedOnDt: 'Modified On Dt',

  ModifiedBy: 'Modified By',

}

export const roleClaimHeader = {

  id: "ID",

  claimType: "Claim Type",

  claimValue: "Claim Value",

  roles : "Roles",

  ModifiedOnDt: 'Modified On Dt',

  ModifiedBy: 'Modified By',

}


export const roleClaimConfig = [
  {
    field: "id",
    dataType: "number",
  },
  {
    field: "claimType",
    dataType: "string",
  },
  {
    field: "claimValue",
    dataType: "string",
  },
  {
    field: "roles",
    dataType: "dropdown,name",
  },

];