'use client'

import usersService from "@/app/Services/usersService";
import { error } from "console";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap"; // React Bootstrap components


const LoginModal:React.FC = () => {

  const [user,setUser] = useState({Username:'',Password:"",Email:"",DisplayName:""})
  const [show, setShow] = useState(true);
  const [errors,setErrors] = useState({email:"",password:""})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const  handleSubmitForm = async (e:React.FormEvent)=>{
      e.preventDefault();
      var result ;
      var formError;
      try{
          result = await  new usersService().createUser(user);
          if(result?.status === "Error"){
            formError = result.message
            console.log(result);
            if( formError.includes("Duplicate")){
              setErrors({...errors,password:"Duplicate email, please enter different"})
            }
          }else if(result.succeeded){
            handleClose();
            clearForm();
          }
      }catch(e:any){
          console.log(e)
      }
      console.log(result)
  }

  const clearForm =()=>{
     setUser({Username:'',Password:"",Email:"",DisplayName:""})
     setShow(true);
     setErrors({email:"",password:""})
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

  const validatePassword =(password:string)=> {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    return passwordPattern.test(password);
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
            <Form.Group controlId="Username">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter you name"
                className="w-100"
                onChange={handleChange}
                value={user.Username}
                required
              />
            </Form.Group>
            <Form.Group controlId="DisplayName">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                className="w-100"
                onChange={handleChange}
                value={user.DisplayName}
                
              />
            </Form.Group>
            <Form.Group controlId="Email">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@mail.com"
                className="w-100"
                onChange={handleChange}
                value={user.Email}
                required
              />
              <div className="text-red-600">
                  {errors.email}
              </div>
            </Form.Group>
            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                className="w-100"
                onChange={handleChange}
                value={user.Password}
                required
              />
              <div className="text-red-600">
                  {errors.password}
              </div>
            </Form.Group>

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
