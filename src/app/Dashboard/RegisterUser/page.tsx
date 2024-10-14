'use client'

import FormPasswordInput from "@/app/Components/FormPasswordInput";
import { emptyUser } from "@/app/Constants/Constants";
import { validatePassword, validateUsername } from "@/app/Helpers/Helpers";
import usersService from "@/app/Services/usersService";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap"; // React Bootstrap components


const LoginModal:React.FC = () => {

  const [user,setUser] = useState(emptyUser)
  const [show, setShow] = useState(true);
  const [errors,setErrors] = useState({email:"",password:"",username:""})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const  handleSubmitForm = async (e:React.FormEvent)=>{
      e.preventDefault();
      var result ;
      var formError;
      try{
          result = await  new usersService().createUser(user);
          if(result.value.status === "Error"){
            formError = result.value.statusText
            if( formError.includes("Duplicate")){
              setErrors({...errors,email:formError});
            }
          }else if(result.succeeded){
            handleClose();
            clearForm();
          }

      }catch(e:any){
          console.log(e)
      }

  }

  const clearForm =()=>{
     setUser(emptyUser)
     setShow(true);
     setErrors({email:"",password:"",username:""})
     setShow(false);
     setShow(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if(id === "Password"){
        if(!validatePassword(value)){
              setErrors({...errors,password:"Invalid password, password must have Capital, small, number and special character"})
        }else {
          setErrors({...errors,password:""})
        }
    }else if(id ==="Username"){
      if(!validateUsername(value)){
            setErrors({...errors,username:"Invalid username, can only contain number or character"})
      }else {
          setErrors({...errors,username:""})
      }
    }
    console.log(value)
    setUser({
      ...user,
      [id]: value,
    });
  };

  const closeForm=()=>{
    setShow(false);
  }


  return (
    <div>
      <Modal show={show} onHide={closeForm} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-full text-center">
            <h4 className="font-bold">Register User</h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="d-flex flex-column gap-3" onSubmit={handleSubmitForm}>
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
            <FormPasswordInput currentValue={user.password} handleChange={handleChange} filedName={"password"} errorMessage={errors.password}/>

            <div className="flex justify-center items-center">
                 <Button
                    variant="primary"
                    type="submit"
                    className="d-flex w-28 justify-content-center align-items-center gap-2"
                  >
                    Register
                  </Button>
                <div className="flex justify-end items-center">
                    <button className="w-28 text-blue-600">Login</button>
                </div>
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
