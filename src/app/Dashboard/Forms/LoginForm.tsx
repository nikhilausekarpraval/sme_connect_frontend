"use client"
import PasswordInput from "@/app/Components/FormPasswordInput";
import FormSelectQuestionAndAnswer from "@/app/Components/FormSelectQuestionAndAnswer";
import { emptyUser, registerUserFormErrors } from "@/app/Constants/Constants";
import { validatePassword } from "@/app/Helpers/Helpers";
import { IApplicationContext } from "@/app/Interfaces/Interfaces";
import authService from "@/app/Services/authService";
import usersService from "@/app/Services/usersService";
import React, { useEffect, useState } from "react";
import LoginModal from "../RegisterUser/page";

interface ILoginFormProps{
    handleLogin:(userContext:IApplicationContext)=> void;
}

const LoginForm:React.FC<ILoginFormProps> = ({handleLogin}) => {

  const [user,setUser] = useState(emptyUser)
  const [errors,setErrors] = useState(registerUserFormErrors)
  const [show,setShow] = useState(true);
  const closeForm =()=>{setShow(false)};
  const [isRegister,setIsRegister] = useState(false);
  const [isResetUsingQuestion, setIsResetUsingQuestion] = useState(false);
  const [currentOperation, setCurrentOperation] = useState("Login");
  const service = new usersService()
  //const router = useRouter();

//   const [show, setShow] = useState(isShow);

//   const handleShow = () => setShow(true);

  useEffect(() => {
    
    setIsRegister(false);
    setIsResetUsingQuestion(false);
  }, [show]); 



const  handleSubmitForm = async (e:React.FormEvent)=>{
  e.preventDefault();
  var result ;
  try{
    

    if(currentOperation === "Login"){

      result = await authService.login(user.userName,user.password);
      debugger;
      if (result?.statusCode !== 200 && result?.statusCode != 404){
          setErrors({...errors,invalid:"Invalid username or password"})
      } else if (result?.statusCode == 404){
        setErrors({...errors,invalid:"User not found"})
        
      }else {
        closeForm();
        console.log(result)
        handleLogin(result.value.userContext);
        clearForm();
      }

    }else {
        // used to forget user 
        const result = await service.forgettUserPasssword(user);
        const message = result?.value?.statusText
        const status = result?.value?.status

        if(status === "Error" && message.includes("Question or answer is wrong!")){
          setErrors({...errors,answer1 : message});
        }else {
          setErrors({...errors,answer1 : ""});
            resetForm();
            updateApplication();
        }

    }
        
  }catch(e:any){
    
      setErrors({...errors,invalid : e.message});
      console.log(e)
  }
}


const updateApplication = () => {
  localStorage.clear();
  window.location.reload();
}

const resetForm = () => {
  setUser(emptyUser);
  setErrors(registerUserFormErrors);
  setCurrentOperation("Login")
  setIsResetUsingQuestion(false);
}


const clearForm =()=>{
  setUser(emptyUser)
  setErrors(registerUserFormErrors)
}

 const  handleChange =(e:React.ChangeEvent<HTMLInputElement | any>)=>{
        const {id,value} = e.target;
        if(id === "password"){
          if(!validatePassword(value)){
                setErrors({...errors,password:"Invalid password, password must have Capital, small, number and special character"})
            }else {
              setErrors({...errors,password:""})
            }
        }
        
        setUser((prevUser) => ({
          ...prevUser,
          email: id === "userName" ? value : prevUser.email, 
          [id]: value 
        }));
  }

  const showRegister =()=>{
    //setShow(false);
    setIsRegister(!isRegister)
    // closeForm();
    // clearForm();
  
  }

  const showLogin=()=>{

    setIsResetUsingQuestion(false)
    setCurrentOperation("Login")
  }

  const forgetPassword=()=>{
    setIsResetUsingQuestion(true);
    setCurrentOperation("Forget Password")
  }


  return (
    <>

      <div className={`modal fade modal-background-color ${show ? "show d-block" : ""}`} tabIndex={-1} style={{ display: show ? "block" : "none" }} role="dialog" data-backdrop="static" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title font-bold h4 w-100 text-center">
                    {currentOperation}
              </h4>
              {/* <button type="button" className="close btn-close" onClick={closeForm} aria-label="Close">
              </button> */}
            </div>

            <div className="modal-body">
              <form className="d-flex flex-column gap-3" onSubmit={handleSubmitForm}>
                <div className="text-danger">{errors.invalid}</div>

                <div className="form-group" control-id="userName">
                  <label className="block text-gray-700 font-bold mb-2">Your Email</label>
                  <input
                    type="email"
                    className="form-control w-100"
                    placeholder="name@mail.com"
                    required
                    id="userName"
                    name="userName"
                    onChange={handleChange}
                    value={user.userName}
                  />
                </div>

                <PasswordInput filedName="password" title="Password" currentValue={user.password} handleChange={handleChange} errorMessage={errors.password} />

                {isResetUsingQuestion && (
                  <FormSelectQuestionAndAnswer formData={user} handleChange={handleChange} errors={errors} visibleQuestion={1} />
                )}

                <button type="submit" className="btn btn-primary btn-lg w-100">
                  {currentOperation}
                </button>

                {/* Uncomment if using Google button */}
                {/* <button
                  className="btn btn-outline-secondary btn-lg d-flex justify-content-center align-items-center gap-2 w-100"
                >
                  <img
                    src="https://www.material-tailwind.com/logos/logo-google.png"
                    alt="google"
                    className="h-6 w-6"
                  />
                  Sign in with Google
                </button> */}

                {currentOperation === "Login" && (
                  <button
                    className="btn btn-outline-secondary btn-lg d-flex justify-content-center align-items-center gap-2 w-100"
                    type="button"
                    onClick={showRegister}
                  >
                    Register
                  </button>
                )}

                <div className="text-primary gap-3 d-flex justify-content-end align-items-center">
                  {currentOperation !== "Login" && (
                    <button type="button" className="btn btn-link" onClick={showLogin}>
                      Login
                    </button>
                  )}
                  {currentOperation !== "Forget Password" && (
                    <button type="button" className="btn btn-link" onClick={forgetPassword}>
                      Forget Password
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="modal-footer d-flex justify-content-center">
              <p className="text-center text-gray-600">
                Upon signing in, you consent to abide by our{" "}
                <a href="#" className="text-primary">
                  Terms of Service
                </a>{" "}
                &{" "}
                <a href="#" className="text-primary">
                  Privacy Policy
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isRegister &&
        <LoginModal />
      }
    </>
  );
}

export default LoginForm;
