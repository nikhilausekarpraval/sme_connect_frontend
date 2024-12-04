import FormPasswordInput from "@/app/Components/FormPasswordInput";
import FormSelectQuestionAndAnswer from "@/app/Components/FormSelectQuestionAndAnswer";
import { emptyUser, pleaseSelectDifferentQuestion, pleaseSelectQuestionAndAswer, registerUserFormErrors, totalAnswers, totalQuestions } from "@/app/Constants/Constants";
import { validatePassword, validateUsername } from "@/app/Helpers/Helpers";
import { IClaim, IGroup, IPractice, IRole, IUser, IUserForm } from "@/app/Interfaces/Interfaces";
import UsersService from "@/app/Services/usersService";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import './UserForm.scss';
import { List } from "postcss/lib/list";
import Loader from "@/app/Components/Loader/Loader";
import RoleService from "@/app/Services/RoleService";
import ClaimService from "@/app/Services/ClaimService";
import GroupService from "@/app/Services/GroupService";
import PracticesService from "@/app/Services/PracticesService";
interface EmployeeFormProps {
    employee: IUser | null | undefined;
    isEdit: boolean;
    isCreate: boolean;
    clearForm: (e: any) => void,
    save: (e: any) => void,
}

const UserForm: React.FC<EmployeeFormProps> = ({ employee, isCreate, isEdit, clearForm, save }) => {

    const [user, setUser] = useState(emptyUser)
    const [errors, setErrors] = useState(registerUserFormErrors)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [visibleQuestion, setVisibleQuestion] = useState(1);
    const [questionOperation, setQuestionOperation] = useState("Next");
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [roles, setRoles] = useState<IRole[]>([]);
    const [claims, setClaims] = useState<IClaim[]>([]);
    const [practice, setPractce] = useState<IPractice[]>([]);
    const [group, setGroup] = useState<IGroup[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        if (isEdit || isCreate) {
            loadData();
        }

    }, [isCreate, isEdit])

    const loadData = async () => {
        setIsLoading(true);
        setRoles(await new RoleService().getRoles());
        setClaims(await new ClaimService().getClaims());
        setGroup(await new GroupService().getGroups());
        setPractce(await new PracticesService().getPractices());
        setIsLoading(false);
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        var result;
        var formError;
        try {
            if (Object.values(errors).filter((error) => error !== "").length == 0) {
                result = await new UsersService().createUser(user);
                if (result.value.status === "Error") {
                    formError = result.value.statusText
                    if (formError.includes("Duplicate")) {
                        setErrors({ ...errors, email: formError });
                    }
                } else {
                    clearFormData();
                }
            }
        } catch (e: any) {
            console.log(e)
        }

    }

    const clearFormData = () => {
        setUser(emptyUser)
        setErrors(registerUserFormErrors);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
        const { id, value } = e.target;
        if (id === "password") {
            if (!validatePassword(value)) {
                setErrors({ ...errors, password: "Invalid password, password must have Capital, small, number and special character" })
            } else {
                setErrors({ ...errors, password: "" })
            }
        } else if (id === "userName") {
            if (!validateUsername(value)) {
                setErrors({ ...errors, username: "Invalid username, can only contain number or character" })
            } else {
                setErrors({ ...errors, username: "" })
            }
        } else if (id === "email") {
            setErrors({ ...errors, email: "" })
        } else if (id.includes("answer")) {

            if (value !== "") {
                setErrors({ ...errors, [id]: "" })
            }
        }

        handleQuestionChange(id, value);

        if (id.includes("answer")) {
            if (visibleQuestion === 3 && errors.answer3 === "") {
                setQuestionOperation("done");
            }
        }

        setUser({
            ...user,
            [id]: value,
        });
    };


    const handleQuestionChange = (id: string, value: string) => {

        if (id.includes("question")) {
            const otherQuestions = totalQuestions.filter(q => q !== id);
            const isDuplicate = otherQuestions.some(q => user[q as keyof IUserForm] === value);
            const currentError = totalAnswers.filter((a) => a.includes(id.charAt(8)));
            setErrors({ ...errors, [currentError[0]]: isDuplicate ? pleaseSelectDifferentQuestion : "" });
        }
    }

    const nextQuestion = () => {
        if (setQuestionErrors()) {

            if (errors[`answer1`] === "" && visibleQuestion == 1) {
                setVisibleQuestion(2);
            } else if (errors[`answer2`] === "" && visibleQuestion == 2) {
                setVisibleQuestion(3);
            } else if (errors[`answer3`] === "" && visibleQuestion == 3) {

            }
        }
    }


    const setQuestionErrors = () => {

        if (visibleQuestion == 1) {
            if ((user["answer1"] === "" || user["question1"] === "")) {
                setErrors({ ...errors, answer1: pleaseSelectQuestionAndAswer });
                return false
            } else {
                return true;
            }

        }

        if (visibleQuestion == 2) {
            if ((user["answer2"] === "" || user["question2"] === "")) {
                setErrors({ ...errors, answer2: pleaseSelectQuestionAndAswer });
                return false
            } else {
                return true;
            }

        }

        if (visibleQuestion == 3) {
            if ((user["answer3"] === "" || user["question3"] === "")) {
                setErrors({ ...errors, answer3: pleaseSelectQuestionAndAswer });
                return false
            } else {
                return true;
            }

        }

        return true;
    }

    return (
        // <Modal show={isEdit || isCreate} onHide={()=>clearForm} backdrop="static" centered className="">
        //     <Modal.Header>
        //         <Modal.Title className="w-full text-center">
        //             <h4 className="font-bold">Register User</h4>
        //         </Modal.Title>
        //     </Modal.Header>

        //     <Modal.Body className="h-90">
        //         <Form className="d-flex flex-column gap-1 px-2 h-96 overflow-y-scroll" onSubmit={handleSubmitForm}>
        //             <Form.Group controlId="userName">
        //                 <Form.Label className="block text-gray-700 font-bold mb-2">User Name</Form.Label>
        //                 <Form.Control
        //                     type="text"
        //                     placeholder="Enter you name"
        //                     className="w-100"
        //                     onChange={handleChange}
        //                     value={user.userName}
        //                     required
        //                 />
        //                 <div className="text-red-600">
        //                     {errors.username}
        //                 </div>
        //             </Form.Group>
        //             <Form.Group controlId="displayName">
        //                 <Form.Label className="block text-gray-700 font-bold mb-2">Full Name</Form.Label>
        //                 <Form.Control
        //                     type="text"
        //                     placeholder="Enter name"
        //                     className="w-100"
        //                     onChange={handleChange}
        //                     value={user.displayName}

        //                 />
        //             </Form.Group>
        //             <Form.Group controlId="email">
        //                 <Form.Label className="block text-gray-700 font-bold mb-2">Your Email</Form.Label>
        //                 <Form.Control
        //                     type="email"
        //                     placeholder="name@mail.com"
        //                     className="w-100"
        //                     onChange={handleChange}
        //                     value={user.email}
        //                     required
        //                 />
        //                 <div className="text-red-600">
        //                     {errors.email}
        //                 </div>
        //             </Form.Group>
        //             <Form.Group controlId="email">
        //                 <Form.Label className="block text-gray-700 font-bold mb-2">Phone Number</Form.Label>
        //                 <Form.Control
        //                     type={'text'}
        //                     placeholder="number..."
        //                     className="w-100"
        //                     onChange={handleChange}
        //                     value={user.email}
        //                     maxLength={10}
        //                     required
        //                 />
        //                 <div className="text-red-600">
        //                     {errors.phoneNumber}
        //                 </div>
        //             </Form.Group>
        //             <FormPasswordInput currentValue={user.password} handleChange={handleChange} filedName={"password"} errorMessage={errors.password} title={"Password"} />

        //             <FormSelectQuestionAndAnswer formData={user} handleChange={handleChange} errors={errors} visibleQuestion={visibleQuestion} />
        //             {questionOperation === "Next" &&
        //                 <div className="flex justify-center items-center">
        //                     <button
        //                         type="button"
        //                         onClick={nextQuestion}
        //                         className="btn-sm mt-2 cursor-pointer btn flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold  rounded-lg shadow-md transition-all duration-300"
        //                     >
        //                         <span>Next</span>
        //                         <FiArrowRight className="text-lg ms-1" />
        //                     </button>
        //                 </div>
        //             }


        //             <div className="mt-2">
        //                 <Button onClick={clearForm}
        //                     className="btn btn-outline-secondary btn-lg d-flex justify-content-center align-items-center gap-2 w-100"
        //                     type="button"
        //                 >
        //                     Cancel
        //                 </Button>

        //                     <Button className="btn btn-link d-flex justify-content-end align-items-center gap-2 w-100 hover:text-blue-700" onClick={save} type="button">Login</Button>
        //                      <Button type="submit" className="btn btn-primary mt-3 btn-lg w-100" onClick={save}>
        //                       {"Login"}
        //                     </Button>


        //             </div>
        //         </Form>
        //     </Modal.Body>
        // </Modal>
        <div className="building-form-container">
            {isLoading && <Loader />}
            {/* <NotificationContainer/> */}
            <Modal
                show={isEdit || isCreate}
                onHide={() => clearForm}
                centered
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton className="px-5">
                    <div className="building-form-header py-2 d-flex gap-4 align-items-center">
                        {isEdit ? "Edit" : "Register"} User
                        <h4 className='m-0'> {isDuplicate && <div><span className='text-danger '>*Duplicate Email is not allowed</span></div>}</h4>
                    </div>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="building-level-edit-form">
                        <form className="form-background-color" onSubmit={handleSubmitForm}>
                            <div className="px-5 py-4 form-row-container">
                                <div className="row m-0">
                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <label className="form-label label-styles py-2 m-0">Role</label>
                                        {/* <select className="form-select form-input-style py-3" value={roles?.find((role) => role?.id == user?.id)?.name} onChange={handleChange} name="ROLE" id="ROLE">
                                            <option value="" selected></option>
                                            {roles?.map((role) => (
                                                <option value={role?.id}>{role.name}</option>
                                            ))
                                            } 
                                        </select> */}
                                    </div>
                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2"><span className='text-danger font-14'>*</span>User Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter you name"
                                            className="w-100 form-input-style"
                                            onChange={handleChange}
                                            value={user.userName}
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors.username}
                                        </div>
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter full name"
                                            className="w-100"
                                            id="displayName"
                                            onChange={handleChange}
                                            value={user.displayName}
                                        />
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Your Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@mail.com"
                                            className="w-100"
                                            onChange={handleChange}
                                            value={user.email}
                                            id="email"
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors.email}
                                        </div>
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Phone Number</Form.Label>
                                        <Form.Control
                                            type={'text'}
                                            placeholder="number..."
                                            className="w-100"
                                            onChange={handleChange}
                                            value={user.email}
                                            maxLength={10}
                                            id="phoneNumber"
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors.phoneNumber}
                                        </div>
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Your Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@mail.com"
                                            className="w-100"
                                            onChange={handleChange}
                                            value={user.email}
                                            id="email"
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors.email}
                                        </div>
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Your Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@mail.com"
                                            className="w-100"
                                            onChange={handleChange}
                                            value={user.email}
                                            id="email"
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors.email}
                                        </div>
                                    </div>

                                    <FormPasswordInput currentValue={user.password} handleChange={handleChange} filedName={"password"} errorMessage={errors.password} title={"Password"} />

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <FormSelectQuestionAndAnswer formData={user} handleChange={handleChange} errors={errors} visibleQuestion={visibleQuestion} />
                                        {questionOperation === "Next" &&
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
                                    </div>

                                </div>
                            </div>
                            <Modal.Footer className="p-0 py-3">
                                <div className="d-flex justify-content-end gap-4 pe-5">
                                    <Button className="cancel-button-style px-4 py-2" onClick={clearForm}>Cancel</Button>
                                    <Button type="submit" className="button-style button-width px-4 py-2" disabled={isDisabled}>Save</Button>
                                </div>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal.Body >
            </Modal >
        </div >
    );
};

export default UserForm;
