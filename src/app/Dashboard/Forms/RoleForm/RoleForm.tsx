
import { createRoleErrors, emptyRole, registerUserFormErrors, roleClaims } from "@/app/Constants/Constants";
import { isValidRole } from "@/app/Helpers/Helpers";
import { IRole, IRoleClaim } from "@/app/Interfaces/Interfaces";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Loader from "@/app/Components/Loader/Loader";
import RoleService from "@/app/Services/RoleService";
import '../../../Common/Styles/Form.scss';
import ClaimService from "@/app/Services/ClaimService";
import ReactMultiSelectComponent from "@/app/Components/ReactMultiSelectDropdown/ReactMultiSelectDropdown";


interface EmployeeFormProps {
    selectedRole: IRole | null | undefined;
    isEdit: boolean;
    isCreate: boolean;
    clearForm: (e: any) => void,
    save: () => void,
}

const RoleForm: React.FC<EmployeeFormProps> = ({ selectedRole, isCreate, isEdit, clearForm, save }) => {

    const [role, setRole] = useState<any>(selectedRole)
    const [errors, setErrors] = useState(createRoleErrors)
    const [claims, setClaims] = useState<IRoleClaim[]>([]);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedClaims, setSelectedClaims] = React.useState<any>([]);


    useEffect(() => {

        if (isEdit || isCreate) {
            setRole(selectedRole);
            loadData();
        }

    }, [isCreate, isEdit])


    const loadData = async () => {

        setIsLoading(true);
        setErrors(createRoleErrors);
        const selectedClam = selectedRole?.claims?.map((claim) => ({label: claim.claimType,value:claim.claimValue}));
        setSelectedClaims(selectedClam ? selectedClam : []);
        var allClaims = await new ClaimService().getClaims();
        setClaims(allClaims?.value);
        setIsLoading(false);
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        var result;
        var formError;
        try {
            if (Object.values(errors).filter((error) => error !== "").length <= 0) {

                if (isCreate) {
                    result = await new RoleService().addRole(role);
                }

                if (selectedClaims) {
                    const claimService = new ClaimService();
                
                    for (const claim of selectedClaims || []) {
                        const item = {
                            claimType: claim.label,
                            claimValue: claim.value,
                            roleId: role?.id,
                            id: 0
                        };
                        try {
                            await claimService.createClaim(item);
                        } catch (error) {
                            console.error('Error creating claim:', error);
                        }
                    }
                }

                if (result.statusCode != 200) {
                    formError = result.value
                    if (formError.includes("already exist")) {
                        setErrors({ ...errors, role: formError });
                    }
                } else {
                    save();
                    clearFormData();
                }
            }
        } catch (e: any) {
            console.log(e);
            clearFormData();
        }

    }

    const clearFormData = () => {
        setClaims([])
        setRole(emptyRole);
        setSelectedClaims([]);
        setErrors(registerUserFormErrors);
        clearForm(null);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
        const { id, value } = e.target;

        if (id === "name") {
            if (isValidRole(value)) {
                setErrors({ ...errors, role: "Invalid role, role must have only characters" })
            } else {
                setErrors({ ...errors, role: "" })
            }
        } else if (id === "claim") {
            if (isValidRole(value)) {
                setErrors({ ...errors, claim: "Invalid claim, claim must have only characters" })
            } else {
                setErrors({ ...errors, claim: "" })
            }
        }

        setRole({
            ...role,
            [id]: value,
        });
    };



    const handleClaimChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setSelectedClaims(
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    return (
        <div className="building-form-container">
            {isLoading && <Loader />}
            {/* <NotificationContainer/> */}
            <Modal
                show={isEdit || isCreate}
                onHide={() => clearFormData()}
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
                            <div className="px-4 py-4 ">
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
                                            id="name"
                                            onChange={handleChange}
                                            value={role?.name}
                                            maxLength={256}
                                            disabled={isEdit}
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors?.role}
                                        </div>
                                    </div>

                                    {/* <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Claim</Form.Label>
                                        <Form.Select className=" " value={claims?.find((claim) => claim?.roleId == role?.id)?.claimType} onChange={handleChange} name="Claim" id="Claim">
                                            <option value=""></option>
                                            {claims?.map((claim) => (
                                                <option value={claim?.id}>{claim.claimType}</option>
                                            ))
                                            }
                                        </Form.Select>
                                        <div className="text-red-600">
                                            {errors.claim}
                                        </div>
                                    </div> */}
                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <ReactMultiSelectComponent values={claims.map((claim) => ({ label: claim.claimType, value: claim.claimValue }))} title={"Claim"} selectedNames={selectedClaims} handleChange={setSelectedClaims} />
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

export default RoleForm;
