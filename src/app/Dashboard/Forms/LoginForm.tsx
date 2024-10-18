"use client"
import { validatePassword } from "@/app/Helpers/Helpers";
import { IApplicationContext, IUserContext } from "@/app/Interfaces/Interfaces";
import authService from "@/app/Services/authService";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap"; // React Bootstrap components
import LoginModal from "../RegisterUser/page";
import FormSelectQuestionAndAnswer from "@/app/Components/FormSelectQuestionAndAnswer";
import { emptyUser } from "@/app/Constants/Constants";
import usersService from "@/app/Services/usersService";

interface ILoginFormProps{
    handleLogin:(userContext:IApplicationContext)=> void;
}

const LoginForm:React.FC<ILoginFormProps> = ({handleLogin}) => {

  const [user,setUser] = useState(emptyUser)
  const [errors,setErrors] = useState({email:"",password:"",invalid:"",answer:"",question:""})
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
      if(result?.status == 401){
          setErrors({...errors,invalid:"Invalid username or password"})
      }else if(result?.status == 400){
        setErrors({...errors,invalid:"User not found"})
        
      }else {
        closeForm();
        handleLogin(result);
        console.log(result);
        clearForm();
      }

    }else {
        // used to forget user 
        const result = await service.forgettUserPasssword(user);
        const message = result.value.statusText
        const status = result.value.status

        if(status === "Error" && message.includes("Question or answer is wrong!")){
          setErrors({...errors,answer : message});
        }else {
          setErrors({...errors,answer : ""});
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
  setErrors({email:"",password:"",invalid:"",answer:"",question:""});
  setCurrentOperation("Login")
  setIsResetUsingQuestion(false);
}


const clearForm =()=>{
  setUser(emptyUser)
  setErrors({email:"",password:"",invalid:"",answer:"",question:""})
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

      <Modal show={show} onHide={closeForm} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-full text-center">
            <h4 className="font-bold">{currentOperation}</h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="d-flex flex-column gap-3" onSubmit={handleSubmitForm}>
            <div className="text-red-600">
                  {errors.invalid}
            </div>
            <Form.Group controlId="userName">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@mail.com"
                required
                className="w-100"
                onChange={handleChange}
                value={user.userName}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                required
                className="w-100"
                onChange={handleChange}
                value={user.password}
              />
              <div className="text-red-600">
                  {errors.password}
              </div>
            </Form.Group>

            {isResetUsingQuestion &&
                <FormSelectQuestionAndAnswer formData={user} handleChange={handleChange} errorMessage={errors.answer} />
            }

            <Button variant="primary" type="submit" size="lg" className="w-100">
              {currentOperation}
            </Button>

            {/* <Button
              variant="outline-secondary"
              size="lg"
              className="d-flex justify-content-center align-items-center gap-2 w-100"
            >
              <Image
                src="https://www.material-tailwind.com/logos/logo-google.png"
                alt="google"
                className="h-6 w-6"
              />
              Sign in with Google
            </Button> */}

            {currentOperation === "Login" &&
                <Button
                variant="outline-secondary"
                size="lg"
                type="button"
                className="d-flex justify-content-center align-items-center gap-2 w-100"
                onClick={showRegister}
              >
                {/* <CpuChipIcon className="h-6 w-6" /> */}
                Register
              </Button>
            }

            <div className='text-blue-500 gap-3 flex justify-end items-center'>
              {(currentOperation !== "Login") &&
                <button type='button' onClick={() => showLogin()} className='hover:underline'>Login</button>
              }
              {(currentOperation !== "Forget Password") &&
                <button type='button' onClick={() => forgetPassword()} className='hover:underline'>Forget Password</button>
              }
          </div>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center">
          <p className="text-center text-gray-600">
            Upon signing in, you consent to abide by our{" "}
            <a href="#" className="text-primary">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="#" className="text-primary">
              Privacy Policy.
            </a>
          </p>
        </Modal.Footer>
      </Modal>
      {isRegister &&
        <LoginModal />
      }
    </>
  );
}

export default LoginForm;
