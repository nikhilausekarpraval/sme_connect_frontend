
import { createRoleClaimErrors, createRoleErrors, emptyClaim, emptyUser, registerUserFormErrors } from "@/app/Constants/Constants";
import { isValidRole } from "@/app/Helpers/Helpers";
import {  IRole, IRoleClaim, IRoleClaimWithRoles, IRoleDto } from "@/app/Interfaces/Interfaces";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Loader from "@/app/Components/Loader/Loader";
import RoleService from "@/app/Services/RoleService";
import '../../../Common/Styles/Form.scss';
import ClaimService from "@/app/Services/ClaimService";
import ReactMultiSelectComponent from "@/app/Components/ReactMultiSelectDropdown/ReactMultiSelectDropdown";



interface RoleClaimFormProps {
    selectedClaim: IRoleClaimWithRoles;
    isEdit: boolean;
    isCreate: boolean;
    clearForm: (e: any) => void,
    save: () => void,
}

const RoleClaimForm: React.FC<RoleClaimFormProps> = ({ selectedClaim, isCreate, isEdit, clearForm, save }) => {

    const [roleClaim, setRoleClaim] = useState<IRoleClaimWithRoles>(selectedClaim)
    const [errors, setErrors] = useState(createRoleClaimErrors)
    const [roles, setRoles] = useState<any[]>([]);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRoles, setSelectedRoles] = React.useState<[{label:"",value:""}]>();


    useEffect(() => {

        if (isEdit || isCreate) {
            setRoleClaim(selectedClaim);
            loadData();
        }

    }, [isCreate, isEdit])


    const loadData = async () => {
        setIsLoading(true);
        setErrors(createRoleClaimErrors);

        var allRoles = await new RoleService().getRoles();

        setRoles(allRoles?.value);

        const selectedCla = selectedClaim?.roles?.map((role) => ({
            label: role.name,
            value: role.id
        }));

        setSelectedRoles( selectedCla as any);
        setIsLoading(false);
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        var result;
        var formError;
        try {
            if (Object.values(errors).filter((error) => error !== "").length <= 0) {

                var result ;
                if (roleClaim?.roles) {
                    const claimService = new ClaimService();
                    for (const roleId of roleClaim.roles) {
                        const claim = {
                            id: roleClaim.id,
                            claimType: roleClaim.claimType,
                            claimValue: roleClaim.claimValue,
                            roleId: roleId.id,
                        } as any;
                     result =  await claimService.createClaim(claim);
                    }
                }

                if (result.statusCode != 200) {
                    formError = result.value
                    if (formError.includes("already exist")) {
                        setErrors({ ...errors, claimType: formError });
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
        setRoles([{name:"",id:"",claims:[]}])
        setRoleClaim(emptyClaim);
        setSelectedRoles([{label:"",value:""}]);
        setErrors(createRoleClaimErrors);
        clearForm(null);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
        const { id, value } = e.target;

        if (id === "claimType") {
            if (isValidRole(value)) {
                setErrors({ ...errors, claimType: "Invalid claim type, claim type must have only characters" })
            } else {
                setErrors({ ...errors, claimType: "" })
            }
        } else if (id === "claimValue") {
            if (isValidRole(value)) {
                setErrors({ ...errors, claimValue: "Invalid claim, claim must have only characters" })
            } else {
                setErrors({ ...errors, claimValue: "" })
            }
        }

        setRoleClaim({
            ...roleClaim,
            [id]: value,
        });
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
                        {isEdit ? "Edit" : "Create"} Role Claims
                        <h4 className='m-0'> {isDuplicate && <div><span className='text-danger '>*Duplicate Role is not allowed</span></div>}</h4>
                    </div>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="building-level-edit-form">
                        <form className="form-background-color" onSubmit={handleSubmitForm}>
                            <div className="px-4 py-4">
                                <div className="row m-0">
                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Claim Id</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Claim id."
                                            className="w-100"
                                            value={roleClaim?.id}
                                            id={'id'}
                                            disabled
                                        />
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Claim Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Claim Type."
                                            className="w-100"
                                            id="claimType"
                                            onChange={handleChange}
                                            value={roleClaim?.claimType}
                                            max={256}
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors?.claimType}
                                        </div>
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Claim Value</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Claim Value."
                                            className="w-100"
                                            id="claimValue"
                                            onChange={handleChange}
                                            value={roleClaim?.claimValue}
                                            max={256}
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors?.claimValue}
                                        </div>
                                    </div>
                                    {roles?.length > 0 &&
                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <ReactMultiSelectComponent values={roles?.map((role)=> ({label:role?.name,value: role?.id }))} title={"Roles"} selectedNames={selectedRoles as any} handleChange={setSelectedRoles} />
                                    </div>
                                    }
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

export default RoleClaimForm;
