
import { createRoleErrors, emptyUser, registerUserFormErrors} from "@/app/Constants/Constants";
import { isValidRole} from "@/app/Helpers/Helpers";
import { IRole } from "@/app/Interfaces/Interfaces";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Loader from "@/app/Components/Loader/Loader";
import RoleService from "@/app/Services/RoleService";
import '../../../Common/Styles/Form.scss';

interface EmployeeFormProps {
    selectedRole: IRole | null | undefined;
    isEdit: boolean;
    isCreate: boolean;
    clearForm: (e: any) => void,
    save: (e: any) => void,
}

const UserForm: React.FC<EmployeeFormProps> = ({ selectedRole, isCreate, isEdit, clearForm, save }) => {

    const [role, setUser] = useState<any>(selectedRole)
    const [errors, setErrors] = useState(createRoleErrors)
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        if (isEdit || isCreate) {
            loadData();
        }

    }, [isCreate, isEdit])

    useEffect(() => {

        if (role !== null && role != undefined)
            setUser(role);
        else
            setUser(emptyUser)

    }, [role])

    const loadData = async () => {
        setIsLoading(true);
        // setRoles(await new RoleService().getRoles());
        setIsLoading(false);
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        var result;
        var formError;
        try {
            if (Object.values(errors).filter((error) => error !== "").length <= 0) {

                    result = await new RoleService().addRole(role);
                
                if (result.value.status !== "Success") {
                    formError = result.value.statusText
                    if (formError.includes("Duplicate")) {
                        setErrors({ ...errors, role: formError });
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

        if (id === "role") {
            if (isValidRole(value)) {
                setErrors({ ...errors, role: "Invalid role, role must have only characters" })
            } else {
                setErrors({ ...errors, role: "" })
            }
        }

        setUser({
            ...role,
            [id]: value,
        });
    };


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
                        {isEdit ? "Edit" : "Create"} Role
                        <h4 className='m-0'> {isDuplicate && <div><span className='text-danger '>*Duplicate Role is not allowed</span></div>}</h4>
                    </div>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="building-level-edit-form">
                        <form className="form-background-color" onSubmit={handleSubmitForm}>
                            <div className="px-4 py-4 form-row-container">
                                <div className="row m-0">
                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Role Id</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Role id."
                                            className="w-100"
                                            value={role?.id}
                                            id={'id'}
                                            disabled
                                        />
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Role."
                                            className="w-100"
                                            id="role"
                                            onChange={handleChange}
                                            value={role?.name}
                                            max={256}
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors?.role}
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
