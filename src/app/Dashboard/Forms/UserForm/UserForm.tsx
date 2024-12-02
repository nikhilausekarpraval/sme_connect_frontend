import React from "react";
import { Form } from "react-bootstrap";

interface EmployeeFormProps {
    employee: any;
    isEditForm: boolean;
    clearForm:()=>void,
    save:()=>void,
}

const UserForm: React.FC<EmployeeFormProps> = ({ employee, isEditForm,clearForm,save }) => {
    return (
        <Form>
            <Form.Group controlId="employeeName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={employee?.userName || ""}
                    placeholder="Enter employee name"
                />
            </Form.Group>
            <Form.Group controlId="employeeEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    defaultValue={employee?.email || ""}
                    placeholder="Enter email address"
                />
            </Form.Group>
        </Form>
    );
};

export default UserForm;
