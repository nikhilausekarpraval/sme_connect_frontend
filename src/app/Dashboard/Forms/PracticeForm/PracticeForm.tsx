
import { createPracticeErrors, emptyPractice } from "@/app/Constants/Constants";
import { IPractice} from "@/app/Interfaces/Interfaces";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Loader from "@/app/Components/Loader/Loader";
import '../../../Common/Styles/Form.scss';
import { isValidTitle } from "@/app/Helpers/Helpers";
import PracticesService from "@/app/Services/PracticesService";


interface PracticeFormProps {
    selectedPractice: IPractice | null | undefined;
    isEdit: boolean;
    isCreate: boolean;
    clearForm: (e: any) => void,
    save: () => void,
}

const PracticeForm: React.FC<PracticeFormProps> = ({ selectedPractice, isCreate, isEdit, clearForm, save }) => {

    const [practice, setPractice] = useState<any>(selectedPractice)
    const [errors, setErrors] = useState(createPracticeErrors)
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (isEdit || isCreate) {
            setPractice(selectedPractice);
            loadData();
        }

    }, [isCreate, isEdit])


    const loadData = async () => {
        setIsLoading(true);
        setErrors(createPracticeErrors);
        setIsLoading(false);
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        var result;
        var formError;
        try {
            if (Object.values(errors).filter((error) => error !== "").length <= 0) {

                if (isCreate) {
                    result = await new PracticesService().addPractice(practice);
                }else {
                    result = await new PracticesService().updatePractice(practice);
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

        setPractice(emptyPractice);
        setErrors(createPracticeErrors);
        clearForm(null);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
        const { id, value } = e.target;

        if (id === "name") {
            if (isValidTitle(value)) {
                setErrors({ ...errors, name: "Invalid practice, practice must have only characters" })
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

        setPractice({
            ...practice,
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
                        {isEdit ? "Edit" : "Create"} Practice
                        <h4 className='m-0'> {isDuplicate && <div><span className='text-danger '>*Duplicate Practice is not allowed</span></div>}</h4>
                    </div>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="building-level-edit-form">
                        <form className="form-background-color" onSubmit={handleSubmitForm}>
                            <div className="px-4 py-4 ">
                                <div className="row m-0">
                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Practice Id</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Practice id."
                                            className="w-100"
                                            value={practice?.id}
                                            id={'id'}
                                            disabled
                                        />
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Practice."
                                            className="w-100"
                                            id="name"
                                            onChange={handleChange}
                                            value={practice?.name}
                                            maxLength={256}
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
                                            value={practice?.description}
                                            maxLength={256}
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

export default PracticeForm;
