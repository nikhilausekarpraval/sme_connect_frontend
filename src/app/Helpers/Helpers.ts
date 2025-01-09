import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../Interfaces/Interfaces";
import { allow15_7Numbers, allow15Numbers, allowDotAndDash, allowIntegers, allowNumbers, mobileNumberRegex, replaceChracterWithSpace, replaceNumbersWithSpace, roleClaimConfig, validString, validTitle } from "../Constants/Constants";

export const validatePassword =(password:string)=> {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*?&])[A-Za-z\d@$!.%*?&]{8,}$/;
    return passwordPattern.test(password);
  }

export const validateUsername = (username:string)=>{
  const userNamePattern =  /^[a-zA-Z0-9]+$/;
  return userNamePattern.test(username);
}

export const isTokenExpired =(token :string) =>{
  try {
    const decodedToken : JwtPayload  = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken?.exp < currentTime;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return true;
  }
}

export function formatDate(inputDate : any, yearMonth = false) {

  if (inputDate === "" || inputDate === null || inputDate === undefined)
    return "";

  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  var dateObj;

  if ((typeof inputDate) !== 'object') {
    dateObj = new Date(inputDate);
  } else if (typeof inputDate === 'object') {
    dateObj = inputDate
  }

  const year = dateObj.getFullYear();
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate().toString().padStart(2, '0');
  return yearMonth ? `${month.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}-${dateObj.getFullYear().toString()}` : `${day}-${month}-${year}`;
}


export function isValidPhoneNumber(inputData:any){

  if (mobileNumberRegex.test(inputData)) {
    return true;
  } else {
    return false;
  }
}

export function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; 
  return `${hours}:${minutes} ${ampm}`;
}



export const getDataTypeForKey = (key :string,array:any[]) => {
  debugger;
  const config = array?.find((item) => item.field === key);
  return config ? config.dataType : null; 
};

export function acceptIntegers(inputData: string, field: string, editedFormData: any, isFloat = false) {
  var newValue  = inputData;
  if(isFloat){
  const inputValue = inputData.replace(replaceNumbersWithSpace, '');
  const nonFloatRegex = allow15Numbers;
  const floatRegex = allow15_7Numbers;

  if (allowNumbers.test(inputValue) || allowDotAndDash.test(inputValue)) {
    if (inputValue.includes(".")) {
      if (!floatRegex.test(inputValue)) {
        const parts = inputValue.split('.');
        const leftSide = parts[0].length > 15 ? editedFormData[field] : inputValue.slice(0, 15);;
        const rightSideNumber = parts[1].slice(0, 7);
        if (rightSideNumber !== "" || leftSide === "" && rightSideNumber === "") {
          return parseInt(leftSide) + '.' + rightSideNumber;
        } else {
          return leftSide;
        }
      }
    } else {
      if (!nonFloatRegex.test(inputValue)) {
        return inputValue.length > 15 ? editedFormData[field] : inputValue.slice(0, 15);
      }
    }
  } else {
    return inputValue.slice(0, -1);
  }

  return inputValue;
  }
  else {
    newValue = inputData.replace(replaceChracterWithSpace, '');
    if (!allowIntegers.test(newValue)) {
      return newValue.slice(0, -1);
    }else {

    }
  }
}

export function isString(str : any){
 if(str === null){
  return false
 }else if(str === undefined){
  return false
 }else if(str === ""){
  return false
 }else if(str){
  return true
 }

 return false
}

export function isValidRole(role:string){
  return validString.test(role) ? false : true
}

export function isValidTitle(text:string){
  return validTitle.test(text) ? false : true
}