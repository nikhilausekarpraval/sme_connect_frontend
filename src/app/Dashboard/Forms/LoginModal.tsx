import React from "react";
import { Modal, Button, Form, Image } from "react-bootstrap"; // React Bootstrap components

interface LoginInterface {
  isShow:boolean;
  closeForm:()=>void;
}

const LoginModal:React.FC<LoginInterface> = ({isShow,closeForm}) =>{

//   const [show, setShow] = useState(isShow);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     if (isShow) {
//       handleShow(); 
//     } else {
//       handleClose(); 
//       closeForm();
//     }
//   }, [isShow]); 
// };



  return (
    <>

      {/* <Button variant="primary" onClick={handleShow}>
        Open Login Modal
      </Button> */}

      <Modal show={isShow} onHide={closeForm} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-full text-center">
            <h4 className="font-bold">Login</h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="d-flex flex-column gap-3">
            <Form.Group controlId="formEmail">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@mail.com"
                className="w-100"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                className="w-100"
              />
            </Form.Group>

            <Button variant="primary" size="lg" className="w-100">
              Login
            </Button>

            <Button
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
            </Button>

            <Button
              variant="outline-secondary"
              size="lg"
              className="d-flex justify-content-center align-items-center gap-2 w-100"
            >
              {/* <CpuChipIcon className="h-6 w-6" /> */}
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
