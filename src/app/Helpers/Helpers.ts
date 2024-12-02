import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../Interfaces/Interfaces";

export const validatePassword =(password:string)=> {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
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