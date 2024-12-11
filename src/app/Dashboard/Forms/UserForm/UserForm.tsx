import FormPasswordInput from "@/app/Components/FormPasswordInput";
import FormSelectQuestionAndAnswer from "@/app/Components/FormSelectQuestionAndAnswer";
import { emptyUser, groupsData, pleaseSelectDifferentQuestion, pleaseSelectQuestionAndAswer, practicesData, registerUserFormErrors, rolesData, totalAnswers, totalQuestions, userClaims } from "@/app/Constants/Constants";
import { isValidPhoneNumber, validatePassword, validateUsername } from "@/app/Helpers/Helpers";
import { IPractice, IRole, IUser, IUserClaim, IUserForm } from "@/app/Interfaces/Interfaces";
import UsersService from "@/app/Services/usersService";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import '../../../Common/Styles/Form.scss';
import Loader from "@/app/Components/Loader/Loader";
import RoleService from "@/app/Services/RoleService";
import ClaimService from "@/app/Services/ClaimService";
import PracticesService from "@/app/Services/PracticesService";
import FormNumberInput from "@/app/Components/FormNumberInput/FormNumberInput";

interface EmployeeFormProps {
    employee: IUser | null | undefined;
    isEdit: boolean;
    isCreate: boolean;
    clearForm: (e: any) => void,
    save: (e: any) => void,
}

const UserForm: React.FC<EmployeeFormProps> = ({ employee, isCreate, isEdit, clearForm, save }) => {

    const [user, setUser] = useState<any>(employee)
    const [errors, setErrors] = useState(registerUserFormErrors)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [visibleQuestion, setVisibleQuestion] = useState(1);
    const [questionOperation, setQuestionOperation] = useState("Next");
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [roles, setRoles] = useState<IRole[]>(rolesData);
    const [claims, setClaims] = useState<IUserClaim[]>(userClaims);
    const [practices, setPractces] = useState<IPractice[]>(practicesData);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        if (isEdit || isCreate) {
            loadData();
        }

    }, [isCreate, isEdit])

    useEffect(()=>{

        if(employee !== null && employee != undefined)
         setUser(employee);
        else
        setUser(emptyUser)

    },[employee])

    const loadData = async () => {
        setIsLoading(true);
        // setRoles(await new RoleService().getRoles());
        // setClaims(await new ClaimService().getClaims());
        // setGroup(await new GroupService().getGroups());
        // setPractces(await new PracticesService().getPractices());
        setIsLoading(false);
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        var result;
        var formError;
        try {
            if (Object.values(errors).filter((error) => error !== "").length <= 0) {
                result = await new UsersService().createUser(user);
                if (result.value.status !== "Success") {
                    formError = result.value.statusText
                    if (formError.includes("Duplicate")) {
                        setErrors({ ...errors, email: formError });
                    }
                } else {
                    clearForm(null);
                    clearFormData();
                }
            }
        } catch (e: any) {
            console.log(e)
            clearForm(null);
            clearFormData();
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
        }else if(id.includes('phoneNumber')){
            if (!isValidPhoneNumber(value)){
                    setErrors({...errors,phoneNumber:"Invalid mobile number."})
            }else {
                setErrors({ ...errors, phoneNumber: "" })
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
        <div className="building-form-container">
            {isLoading && <Loader />}
            {/* <NotificationContainer/> */}
            <Modal
                show={isEdit || isCreate}
                onHide={() => clearForm(null)}
                centered
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton className="px-4 py-2">
                    <div className="building-form-header py-2 d-flex gap-4 align-items-center">
                        {isEdit ? "Edit" : "Register"} User
                        <h4 className='m-0'> {isDuplicate && <div><span className='text-danger '>*Duplicate Email is not allowed</span></div>}</h4>
                    </div>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="building-level-edit-form">
                        <form className="form-background-color" onSubmit={handleSubmitForm}>
                            <div className="px-4 py-4 form-row-container">
                                <div className="row m-0">
                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">User Name<span className='text-danger font-14 ps-1'>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter you name"
                                            className="w-100"
                                            onChange={handleChange}
                                            value={user?.userName}
                                            id={'userName'}
                                            max={256}
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors?.username}
                                        </div>
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <FormPasswordInput currentValue={user?.password} handleChange={handleChange} filedName={"password"} errorMessage={errors?.password} title={"Password"} />
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter full name"
                                            className="w-100"
                                            id="displayName"
                                            onChange={handleChange}
                                            value={user?.displayName}
                                            max={255}
                                        />
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Your Email<span className='text-danger font-14 p-1'>*</span></Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@mail.com"
                                            className="w-100"
                                            onChange={handleChange}
                                            value={user?.email}
                                            id="email"
                                            max={256}
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors.email}
                                        </div>
                                    </div>

                                    <FormNumberInput validateField={errors} placeholder={"Enter mobile no."} required={true} fieldName={"phoneNumber"} fieldValue={user?.phoneNumber} fieldLabel={"Mobile Number"} handleInputChange={handleChange} maxLength={10} />

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Role<span className='text-danger font-14 p-1'>*</span></Form.Label>
                                        <Form.Select className=" " value={roles?.find((role) => role?.id == user?.id)?.name} onChange={handleChange} name="ROLE" id="ROLE">
                                            <option value="User">User</option>
                                            {roles?.map((role) => (
                                                <option value={role?.name}>{role.name}</option>
                                            ))
                                            } 
                                        </Form.Select>
                                        <div className="text-red-600">
                                            {errors.role}
                                        </div>
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Claim</Form.Label>
                                        <Form.Select className=" " value={claims?.find((claim) => claim?.userId == user?.id)?.claimType} onChange={handleChange} name="Claim" id="Claim">
                                            <option value=""></option>
                                            {claims?.map((claim) => (
                                                <option value={claim?.id}>{claim.claimType}</option>
                                            ))
                                            }
                                        </Form.Select>
                                        <div className="text-red-600">
                                            {errors.claim}
                                        </div>
                                    </div>

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
                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className=" block text-gray-700 font-bold mb-2">Practice</Form.Label>
                                        <Form.Select className="" value={practices?.find((prac) => prac?.id == user?.practiceId)?.name} onChange={handleChange} name="Practice" id="Practice">
                                            <option value=""></option>
                                            {practices?.map((prac) => (
                                                <option value={prac?.id}>{prac?.name}</option>
                                            ))
                                            }
                                        </Form.Select>
                                        <div className="text-red-600">
                                            {errors.practice}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <Modal.Footer className="p-0 py-2">
                                <div className="d-flex justify-content-end gap-4 pe-3">
                                    <Button type="button" className="cancel-button-style px-4 py-2" onClick={clearForm}>Cancel</Button>
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
