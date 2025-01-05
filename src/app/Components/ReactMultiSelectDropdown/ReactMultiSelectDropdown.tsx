import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

interface IReactMultiSelectComponent {
    values: any [],
    title: string,
    selectedNames: any[],
    handleChange: (event: any) => void;
}

const ReactMultiSelectComponent : React.FC<IReactMultiSelectComponent>= ({values,title, selectedNames,handleChange}) => {

  return (
    <div>
      <Form.Label className="block text-gray-700 font-bold mb-2">{title}</Form.Label>
      <MultiSelect
        options={values}
        value={selectedNames}
        onChange={handleChange}
        labelledBy="Select"
      />
    </div>
  );
};

export default ReactMultiSelectComponent;