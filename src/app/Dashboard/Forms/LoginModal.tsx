import { useAppContext } from "@/app/Context/AppContext";
import { validatePassword } from "@/app/Helpers/Helpers";
import authService from "@/app/Services/authService";
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap"; 

interface LoginInterface {
  isShow:boolean;
  closeForm:()=>void;
}

const LoginModal:React.FC<LoginInterface> = ({isShow,closeForm}) => {

  const [user,setUser] = useState({userName:'',password:""})
  const [errors,setErrors] = useState({email:"",password:"",invalid:""})
  const [applicationContext, setApplicationContext] = useAppContext();
  const router = useRouter();

  
//   const [show, setShow] = useState(isShow);

//   const handleShow = () => setShow(true);

  // useEffect(() => {
  //   router.push("/");
  // }, []); 



const  handleSubmitForm = async (e:React.FormEvent)=>{
  e.preventDefault();
  
  var result ;
  try{
        result = await authService.login(user.userName,user.password);
        if(result?.status == 401){
            setErrors({...errors,invalid:"Invalid username or password"})
        }else {
          console.log(result)
          setApplicationContext(result);
          localStorage.setItem('userContext', JSON.stringify(result));
          closeForm();
          clearForm();
        }
  }catch(e:any){
      console.log(e)
  }
  console.log(result)
}


const clearForm =()=>{
  setUser({password:"",userName:""})
  setErrors({email:"",password:"",invalid:""})
}

 const  handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {id,value} = e.target;
        if(id === "password"){
          if(!validatePassword(value)){
                setErrors({...errors,password:"Invalid password, password must have Capital, small, number and special character"})
            }else {
              setErrors({...errors,password:""})
            }
        }
        setUser({...user,
          [id]:value
         }
        )
  }

  const showRegisterForm=()=>{

      console.log("sdfsdfsf")
      clearForm()
      closeForm();

      router.push("/Dashboard/RegisterUser");   
  } 


  return (
    <>

      <Modal show={isShow} onHide={closeForm} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-full text-center">
            <h4 className="font-bold">Login</h4>
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
                className="w-100"
                onChange={handleChange}
                value={user.password}
              />
              <div className="text-red-600">
                  {errors.password}
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" size="lg" className="w-100">
              Login
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

            <Button
              variant="outline-secondary"
              size="lg"
              type="button"
              className="d-flex justify-content-center align-items-center gap-2 w-100"
              onClick={showRegisterForm}
            >
              Register
            </Button>
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
    </>
  );
}

export default LoginModal;


