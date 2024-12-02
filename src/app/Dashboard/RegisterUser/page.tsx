'use client'

import FormPasswordInput from "@/app/Components/FormPasswordInput";
import FormSelectQuestionAndAnswer from "@/app/Components/FormSelectQuestionAndAnswer";
import { emptyUser, pleaseSelectDifferentQuestion, pleaseSelectQuestionAndAswer, registerUserFormErrors, totalAnswers, totalQuestions } from "@/app/Constants/Constants";
import { validatePassword, validateUsername } from "@/app/Helpers/Helpers";
import { IUserForm } from "@/app/Interfaces/Interfaces";
import usersService from "@/app/Services/usersService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"; // React Bootstrap components
import { FiArrowRight } from "react-icons/fi";

const LoginModal:React.FC = () => {

  const [user,setUser] = useState(emptyUser)
  const [show, setShow] = useState(true);
  const [errors,setErrors] = useState(registerUserFormErrors)
  const [isUserLoggedIn,setIsUserLoggedIn] = useState(false);
  const [visibleQuestion,setVisibleQuestion] = useState(1);
  const router = useRouter();
  const [questionOperation,setQuestionOperation] = useState("Next");

  useEffect(()=>{
    setShow(true);
    setIsUserLoggedIn(!window.location.pathname.includes("/Dashboard/RegisterUser"))
  },[])

  const  handleSubmitForm = async (e:React.FormEvent)=>{
      e.preventDefault();
      var result ;
      var formError;
      try{
        if(Object.values(errors).filter((error)=> error !=="").length == 0){
          result = await  new usersService().createUser(user);
          if(result.value.status === "Error"){
            formError = result.value.statusText
            if( formError.includes("Duplicate")){
              setErrors({...errors,email:formError});
            }
          }else{
            clearForm();
            closeForm();
          }
        }
      }catch(e:any){
          console.log(e)
      }

  }

  const clearForm =()=>{
     setUser(emptyUser)
     setShow(true);
     setErrors(registerUserFormErrors);
     setShow(false);
     setShow(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any >) => {
    const { id, value } = e.target;
    if(id === "password"){
        if(!validatePassword(value)){
              setErrors({...errors,password:"Invalid password, password must have Capital, small, number and special character"})
        }else {
          setErrors({...errors,password:""})
        }
    }else if(id ==="userName"){
      if(!validateUsername(value)){
            setErrors({...errors,username:"Invalid username, can only contain number or character"})
      }else {
          setErrors({...errors,username:""})
      }
    }else if(id ==="email"){
      setErrors({ ...errors, email: "" })
    }else if(id.includes("answer") ){
      // if(!validatePassword(value)){
      //   setErrors({...errors,[id]:"Invalid password, password must have Capital, small, number and special character"})
      // }else {
      //   setErrors({...errors,[id]:""})
      // }

      if(value !== ""){
        setErrors({...errors,[id]:""})
      }
    }

    handleQuestionChange(id,value);

    if(id.includes("answer")){
      if(visibleQuestion === 3 && errors.answer3 === ""){
          setQuestionOperation("done");
      }
    }


    setUser({
      ...user,
      [id]: value,
    });
  };


  const handleQuestionChange =(id : string, value : string)=> {

    if (id.includes("question")) {
    const otherQuestions =  totalQuestions.filter(q => q !== id);
        const isDuplicate = otherQuestions.some(q => user[q as keyof IUserForm] === value);
        const currentError = totalAnswers.filter((a)=>a.includes(id.charAt(8)));
        setErrors({ ...errors, [currentError[0]]: isDuplicate ? pleaseSelectDifferentQuestion : "" });
    }
}

  const nextQuestion=()=>{
    if(setQuestionErrors()){

      if(errors[`answer1`] ==="" && visibleQuestion == 1){
        setVisibleQuestion(2);
      }else if(errors[`answer2`] ==="" && visibleQuestion == 2){
          setVisibleQuestion(3);
      }else if(errors[`answer3`] ==="" && visibleQuestion == 3){

      }
    }
  }


  const setQuestionErrors=()=>{

      if(visibleQuestion == 1 ){
        if((user["answer1"] === "" || user["question1"] === "")){
          setErrors({...errors,answer1 :  pleaseSelectQuestionAndAswer});
          return false
        }else {
            return true;
        }
            
      }

      if(visibleQuestion == 2 ){
        if((user["answer2"] === "" || user["question2"] === "")){
          setErrors({...errors,answer2 :  pleaseSelectQuestionAndAswer});
          return false
        }else {
            return true;
        }
            
      }

      if(visibleQuestion == 3 ){
        if((user["answer3"] === "" || user["question3"] === "")){
          setErrors({...errors,answer3 :  pleaseSelectQuestionAndAswer});
          return false
        }else {
            return true;
        }
            
      }

      return true;
  }


  const closeForm=()=>{
    setShow(false);
    router.push("/")
  }

  const showLoginPage=()=>{
    setShow(false);
    router.push("/")
  }


  return (
    <div>
      <Modal show={show} onHide={closeForm} backdrop="static" centered className="modal-background-color">
        <Modal.Header>
          <Modal.Title className="w-full text-center">
            <h4 className="font-bold">Register User</h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="h-90">
          <Form className="d-flex flex-column gap-1 px-2 h-96 overflow-y-scroll" onSubmit={handleSubmitForm}>
            <Form.Group controlId="userName">
              <Form.Label className="block text-gray-700 font-bold mb-2">User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter you name"
                className="w-100"
                onChange={handleChange}
                value={user.userName}
                required
              />
              <div className="text-red-600">
                {errors.username}
              </div>
            </Form.Group>
            <Form.Group controlId="displayName">
              <Form.Label className="block text-gray-700 font-bold mb-2">Display Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                className="w-100"
                onChange={handleChange}
                value={user.displayName}
                
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label className="block text-gray-700 font-bold mb-2">Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@mail.com"
                className="w-100"
                onChange={handleChange}
                value={user.email}
                required
              />
              <div className="text-red-600">
                  {errors.email}
              </div>
            </Form.Group>
            {/* <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                className="w-100"
                onChange={handleChange}
                value={user.password}
                required
              />
              <div className="text-red-600">
                  {errors.password}
              </div>
            </Form.Group> */}
            <FormPasswordInput currentValue={user.password} handleChange={handleChange} filedName={"password"} errorMessage={errors.password} title={"Password"}/>
            
            <FormSelectQuestionAndAnswer formData={user} handleChange={handleChange} errors={errors} visibleQuestion={visibleQuestion} />
            {questionOperation ==="Next" &&
                   <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={nextQuestion}
                  className="btn-sm mt-2 cursor-pointer btn flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold  rounded-lg shadow-md transition-all duration-300"
                >
                  <span>Next</span>
                  <FiArrowRight className="text-lg ms-1" />
                </button>
                   </div>
            }


            <div className="mt-2">
                  <button
                    className="btn btn-outline-secondary btn-lg d-flex justify-content-center align-items-center gap-2 w-100"
                    type="submit"
                  >
                    Register
                  </button>
                  { isUserLoggedIn &&
                    
                <button className="btn btn-link d-flex justify-content-end align-items-center gap-2 w-100 hover:text-blue-700" onClick={showLoginPage} type="button">Login</button>
                  // <button type="button" className="btn btn-primary mt-3 btn-lg w-100" onClick={showLoginPage}>
                  //   {"Login"}
                  // </button>
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
    </div>
  );
}

export default LoginModal;
