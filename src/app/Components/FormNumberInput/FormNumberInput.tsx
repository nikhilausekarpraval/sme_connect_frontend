import * as React from "react";
import { Form } from "react-bootstrap";


interface NumberFormInputProps {
    validateField: any;
    fieldName: string;
    fieldValue: any;
    fieldLabel: string;
    handleInputChange: (e: any) => void;
    maxLength: number;
    required?: boolean;
    className?: boolean;
    isDisabled?: boolean;
    placeholder?:string;
}


const NumberFormInput: React.FC<NumberFormInputProps>=({ validateField,placeholder, fieldName, fieldValue, fieldLabel, handleInputChange, maxLength, required, className, isDisabled })=> {

        return (
            <div className={className ? "col col-sm-6 m-0 gap-5  align-items-center justify-content-start" : "mb-3 col col-sm-6 m-0 p-0 ps-3"}>
                <Form.Label htmlFor="" className=" block text-gray-700 font-bold mb-2">{fieldLabel}{required && <span className="text-danger ps-1">*</span>}</Form.Label>
                <Form.Control disabled={isDisabled} placeholder={placeholder} type="text" autoComplete="off" required={required} className={validateField[fieldName] ? "border-danger" : ""} maxLength={maxLength} name={fieldName} onChange={handleInputChange} value={fieldValue} id={fieldName} />
                <div>{validateField[fieldName]  && <span className="text-danger font-14">Invalid input</span>}</div>
            </div>
        )

};export default NumberFormInput