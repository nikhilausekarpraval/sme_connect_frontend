
import { createGroupErrors, emptyGroup } from "@/app/Constants/Constants";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Loader from "@/app/Components/Loader/Loader";
import '../../../Common/Styles/Form.scss';
import { isValidTitle } from "@/app/Helpers/Helpers";
import { IUserGroup } from "@/app/Interfaces/Interfaces";
import GroupService from "@/app/Services/GroupService";



interface GroupFormProps {
    selectedGroup: IUserGroup | null | undefined;
    isEdit: boolean;
    isCreate: boolean;
    clearForm: (e: any) => void,
    save: () => void,
}

const GroupForm: React.FC<GroupFormProps> = ({ selectedGroup, isCreate, isEdit, clearForm, save }) => {

    const [group, setGroup] = useState<any>(selectedGroup)
    const [errors, setErrors] = useState(createGroupErrors)
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (isEdit || isCreate) {
            setGroup(selectedGroup);
            loadData();
        }

    }, [isCreate, isEdit])


    const loadData = async () => {
        setIsLoading(true);
        setErrors(createGroupErrors);
        setIsLoading(false);
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        var result;
        var formError;
        try {
            if (Object.values(errors).filter((error) => error !== "").length <= 0) {

                if (isCreate) {
                    result = await new GroupService().addGroup(group);
                }else {
                    result = await new GroupService().updateGroup(group);
                }

                if (result.statusCode != 200) {
                    formError = result?.value?.message
                    if (formError?.includes("already exist") || formError?.includes("not found.")) {
                        setErrors({ ...errors, name: formError });
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

        setGroup(emptyGroup);
        setErrors(createGroupErrors);
        clearForm(null);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
        const { id, value } = e.target;

        if (id === "name") {
            if (isValidTitle(value)) {
                setErrors({ ...errors, name: "Invalid group, group must have only characters" })
            } else {
                setErrors({ ...errors, name: "" })
            }
        } else if (id === "description") {
            if (value === "") {
                setErrors({ ...errors, description: "Invalid description, description can not be empty." })
            } else {
                setErrors({ ...errors, description: "" })
            }
        }

        setGroup({
            ...group,
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
                        {isEdit ? "Edit" : "Create"} Group
                        <h4 className='m-0'> {isDuplicate && <div><span className='text-danger '>*Duplicate Group is not allowed</span></div>}</h4>
                    </div>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="building-level-edit-form">
                        <form className="form-background-color" onSubmit={handleSubmitForm}>
                            <div className="px-4 py-4 ">
                                <div className="row m-0">
                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Group Id</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Group id."
                                            className="w-100"
                                            value={group?.id}
                                            id={'id'}
                                            disabled
                                        />
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Group."
                                            className="w-100"
                                            id="name"
                                            onChange={handleChange}
                                            value={group?.name}
                                            max={256}
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors?.name}
                                        </div>
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Description."
                                            className="w-100"
                                            id="description"
                                            onChange={handleChange}
                                            value={group?.description}
                                            max={256}
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors?.description}
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

export default GroupForm;
