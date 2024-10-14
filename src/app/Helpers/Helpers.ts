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