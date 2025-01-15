

import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Loader from "@/app/Components/Loader/Loader";
import '../../../Common/Styles/Form.scss';
import { IDiscussion } from "@/app/Interfaces/Interfaces";
import { createDiscussionErrors, discussionStatus, emptyDiscussion } from "@/app/Constants/Constants";


interface EmployeeFormProps {
    selectedDiscussion: IDiscussion | null | undefined;
    isEdit: boolean;
    isCreate: boolean;
    clearForm: (e: any) => void,
    save: () => void,
}

const DiscussionForm: React.FC<EmployeeFormProps> = ({ selectedDiscussion, isCreate, isEdit, clearForm, save }) => {

    const [errors, setErrors] = useState(createDiscussionErrors)
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editDiscussion, setEditDiscussion] = useState<any>(selectedDiscussion);


    useEffect(() => {

        if (isEdit || isCreate) {
            loadData();
        }

        if(selectedDiscussion){
            setEditDiscussion(selectedDiscussion);
            console.log(selectedDiscussion)
        }

    }, [isCreate, isEdit,selectedDiscussion])


    const loadData = async () => {
        setIsLoading(true);
        setErrors(createDiscussionErrors);
        setIsLoading(false);
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        var result;
        var formError;
        try {
            if (Object.values(errors).filter((error) => error !== "").length <= 0) {

                if (isCreate) {
                    //result = await new DiscussionService().addDiscussion();
                }

                // if (result.statusCode != 200) {
                //     formError = result.value
                //     if (formError.includes("already exist")) {
                //         setErrors({ ...errors, editDiscussion: formError });
                //     }
                // } else {
                //     save();
                //     clearFormData();
                // }
            }
        } catch (e: any) {
            console.log(e);
            clearFormData();
        }

    }

    const clearFormData = () => {
        setEditDiscussion(emptyDiscussion);
        setErrors(createDiscussionErrors);
        clearForm(null);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
        const { id, value} = e.target;

        if (id === "title") {
            if (value === "") {
                setErrors({ ...errors, title : "Invalid editDiscussion title." })
            } else {
                setErrors({ ...errors, title: "" })
            }
        } 

        setEditDiscussion({
            ...editDiscussion,
            [id]:  value ,
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
                        {isEdit ? "Edit" : "Create"} Discussion
                        <h4 className='m-0'> {isDuplicate && <div><span className='text-danger '>*Duplicate Discussion title is not allowed</span></div>}</h4>
                    </div>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="building-level-edit-form">
                        <form className="form-background-color" onSubmit={handleSubmitForm}>
                            <div className="px-4 py-4 ">
                                <div className="row m-0">

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Title."
                                            className="w-100"
                                            id="title"
                                            onChange={handleChange}
                                            value={editDiscussion?.title}
                                            maxLength={30}
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors?.title}
                                        </div>
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Description."
                                            className="w-100"
                                            id="discussion"
                                            onChange={handleChange}
                                            value={editDiscussion?.description}
                                            maxLength={50}
                                            required
                                        />
                                        <div className="text-red-600">
                                            {errors?.description}
                                        </div>
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Status</Form.Label>
                                        <Form.Select className=" " value={editDiscussion?.status} onChange={handleChange} name="status" id="status">
                                                {discussionStatus?.map((status) => (
                                                    <option  value={status}>{status}</option>
                                                ))
                                            }
                                        </Form.Select>
                                        <div className="text-red-600">
                                            {errors?.status}
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

export default DiscussionForm;
