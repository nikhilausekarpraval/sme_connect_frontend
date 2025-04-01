import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import './ReactMultiSelectDropdown.scss';

interface IReactMultiSelectComponent {
    values: any [],
    title: string,
    selectedNames: any[],
    handleChange: (event: any) => void;
}

const ReactMultiSelectComponent : React.FC<IReactMultiSelectComponent>= ({values,title, selectedNames,handleChange}) => {

  return (
    <div>
      <Form.Label className="block text-gray-700 font-bold mb-2 dark:text-gray-300">{title}</Form.Label>
      <MultiSelect
        options={values}
        value={selectedNames}
        onChange={handleChange}
        labelledBy="Select"
        className="custom-multiselect-styles dark:bg-gray-500"
      />
    </div>
  );
};

export default ReactMultiSelectComponent;