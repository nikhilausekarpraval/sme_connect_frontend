import { IUser } from "@/app/Interfaces/Interfaces";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface EmployeeFormProps {
    employee: IUser | null | undefined;
    isEdit: boolean;
    isCreate: boolean;
    clearForm: (e:any) => void,
    save: (e:any) => void,
}

const UserForm: React.FC<EmployeeFormProps> = ({ employee,isCreate, isEdit, clearForm, save }) => {

    return (
        <Modal dialogClassName="modal-width" centered show={isEdit || isCreate}>
            <Form>
                <Form.Group controlId="employeeName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={employee?.userName || ""}
                        placeholder="Enter employee name"
                    />
                </Form.Group>
                <Form.Group controlId="employeeEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={employee?.email || ""}
                        placeholder="Enter email address"
                    />
                </Form.Group>
                <div className=" px-5 pb-3 flex gap-2 justify-center items-center">
                    <Button
                        variant="outline-secondary"
                        size="lg"
                        type="submit"
                        className="d-flex  justify-content-center align-items-center gap-2 w-50"
                        onClick={clearForm}
                    >
                        Cancel
                    </Button>

                    <Button variant="primary" onClick={save} type="button" size="lg" className="w-50">
                        Save
                    </Button>
                </div>

            </Form>
        </Modal>
    );
};

export default UserForm;
