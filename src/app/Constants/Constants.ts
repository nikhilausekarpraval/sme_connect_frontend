
import { Description } from "@headlessui/react";
import { IApplicationContext, IClaim, IDiscussion, IPractice, IRole, IRoleClaim, IUser, IUserClaim, IUserGroup } from "../Interfaces/Interfaces";


export const emptyUser = {
  userName: '', password: "",roles:[], practice:"", email: "", claims:[{claimType:"",claimValue:""}], displayName: "", id: "", phoneNumber: "", question1: "", question2: "", question3: "", answer1: "", answer2: "", answer3: "", newPassword: "",
  confirmPassword: ""
}

export const emptyRole = {
  id:"",name:"",claims:null
}

export const emptyPractice = {
  id:0,name:"", description:"",    modifiedBy:"",
  modifiedOnDt:new Date(),
}

export const emptyGroupUsers = {
  id:0,group:"",userEmail:"",  groupRole:"",
    modifiedBy:"",
    modifiedOnDt:new Date(),
    name:"",
}

export const emptyGroup = {
  id:0,name:"",description:"",practice:"",  modifiedBy:"",
  modifiedOnDt:new Date(),
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

export const createGroupErrors = {name:'',description:""}

export const createPracticeErrors = {name:'',description:""}

export const createGroupUsersErrors = {group:'',userEmail:"",groupRole:""}

export const createDiscussionErrors = {title:"",description:"",status:""}

export const discussionStatusTypes = {
  Open: "Open", Close: "Close", Starred: "Starred", Unstar : "Unstar", Star:"Star"
};

export const groupRoles = ["Lead","SME","Member",];

export const discussionCloseType = ["Close","Unstar"]

export const emptyDiscussion = {
  id:0,
  name:"",
  description:"",
  status:"Open",
  groupName:"",
}

export const discussionStatus = ["Open","Closed","Star"];

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
  practiceAdminDashboard:"/Dashboard/PracticeAdminDashboard",
  group:"/Dashboard/GroupAdminDashboard",
  practice:"/Dashboard/Practice",
  roleClaim:"/Dashboard/RoleClaim",
  practices: "/Dashboard/Practices",
  groupUsers: "/Dashboard/GroupUsers",
  practiceDashboard: "/Dashboard/PracticeDashboard",
  groupDashboard: "/Dashboard/GroupDashboard",
  discussionDashboard:"/Dashboard/DiscussionDashboard"
}

export const discussions:IDiscussion[] = [
  {
    id: 0,
    name: ".NET Discussion",
    description: "Focuses on .NET technologies for enterprise applications.",
    status: "Open",
    groupName:"",
  },
  {
    id: 0,
    name: "Frontend Discussion",
    description: "Specializes in building modern UI using popular frontend tools.",
    status: "Closed",
    groupName:"",
  },
  {
    id: 0,
    name: "Python Developers",
    description: "Dedicated to Python and its diverse ecosystem.",
    status: "Star",
    groupName:"",
  },
  {
    id: 0,
    name: ".NET Discussion",
    description: "Focuses on .NET technologies for enterprise applications.",
    status: "Open",
    groupName:"",
  },
  {
    id: 0,
    name: "Frontend Discussion",
    description: "Specializes in building modern UI using popular frontend tools.",
    status: "Closed",
    groupName:"",
  },
  {
    id: 0,
    name: "Python Developers",
    description: "Dedicated to Python and its diverse ecosystem.",
    status: "Star",
    groupName:"",
  },
];


export const pleaseSelectQuestionAndAswer = "Please select question and answer";

export const pleaseSelectDifferentQuestion = "Please select different question";

export const totalQuestions = ["question1", "question2", "question3"];

export const totalAnswers = ["answer1", "answer2", "answer3"];

export const practicesList = [
  {
    title: "Web Development",

    description: ["Deployed New Website Optimized Code 95% Deployment Success"],
  },
  {
    title: "Database Management",

    description: ["Improved Indexing Automated Backups"],

  },
  {
    title: "Azure",

    description: ["Deployed 3 New VMs Improved Network Performance"],

  },
  {
    title: "Oracle ERP",

    description: ["Deployed Fraud Detection Model Improved Precision by 5%"],

  },
  {
    title: "ServiceNow",

    description: ["Resolved Major Incident Improved Workflow Automation"],

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
    field: "practice",
    dataType: "string",
  },
  {
    field: "roles",
    dataType: "string[]",
  },
  {
    field: "claims",
    dataType: "claimDto[]",
  }


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

export const PracticeColumnConfig = [
  {
    field: "id",
    dataType: "number",
  },
  {
    field: "name",
    dataType: "string",
  },
  {
    field: "description",
    dataType: "string",
  },

];

export const GroupUsersColumnConfig = [
  {
    field: "id",
    dataType: "number",
  },
  {
    field: "group",
    dataType: "string",
  },
  {
    field: "userEmail",
    dataType: "string",
  },
  {
    field: "groupRole",
    dataType: "string",
  },

];

export const GroupColumnConfig = [
  {
    field: "id",
    dataType: "number",
  },
  {
    field: "name",
    dataType: "string",
  },
  {
    field: "practice",
    dataType: "string",
  },
  {
    field: "description",
    dataType: "string",
  }

];

export const rolesData:IRole[]=[
  {id:"234",name:"Admin", claims:null},
  {id:"234",name:"Manager",claims:null},
  {id:"34",name:"User",claims:null},
]

export const groupsData: IUserGroup[] = [
  { id: 1, name: "React",description:"",practice:"", modifiedBy:"", modifiedOnDt:new Date() },
  { id: 2, name: "Dot Net Core",description:"", practice:"", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 3, name: "Angular",description:"",practice:"", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 4, name: "QA",description:"", practice:"",modifiedBy: "", modifiedOnDt: new Date() },
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
export const validTitle = /^[a-zA-Z\s]+$/;

export const practicesData: IPractice[] = [
  { id: 1, name: "Software Development",description:"", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 2, name: "Quality Assurance",description:"", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 3, name: "Project Management",description:"", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 4, name: "Business Analysis",description:"", modifiedBy: "", modifiedOnDt: new Date() },
];

export const userClaims: IUserClaim[] = [
  {
    userId: "",
    claimType: "Read",
    claimValue: "Read",
    id: 1,
  },
  {
    userId: "",
    claimType: "Write",
    claimValue: "Write",
    id: 2,
  },
  {
    userId: "",
    claimType: "Update",
    claimValue: "Update",
    id: 3,
  },
  {
    userId: "",
    claimType: "Delete",
    claimValue: "Delete",
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

  roles : "Roles",

  claims : "Claims",

  ModifiedOnDt: 'Modified On Dt',

  ModifiedBy : 'Modified By',

}

export const discussionTabs = {
  Star: "Star Discussions",
  Closed: "Closed Discussions",
  Open: "Open Discussions"
}

export const roleHeaders = {

  id: "ID",

  name: "Role",

  claims:"Claims",

  modifiedOnDt: 'Modified On Dt',

  modifiedBy: 'Modified By',

}

export const practiceHeaders = {

  id: "ID",

  name: "Name",

  description:"Description",

  modifiedOnDt: 'Modified On Dt',

  modifiedBy: 'Modified By',

}

export const groupUsersHeader = {

  id: "ID",

  group:"Group",

  userEmail:"User Email",

  groupRole : "Group Role",

  modifiedOnDt: 'Modified On Dt',

  modifiedBy: 'Modified By',

}

export const groupHeaders = {

  id: "ID",

  name: "Name",

  practice : "Practice",

  description:"Description",

  modifiedOnDt: 'Modified On Dt',

  modifiedBy: 'Modified By',

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