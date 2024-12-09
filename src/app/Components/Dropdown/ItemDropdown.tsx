import React from 'react';
import { Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

interface IItemDropdown{
    items:any[],
}

const ItemDropdown: React.FC<IItemDropdown>=({items}) =>{
    return (
        <Form.Select >
            {items?.map((item)=>(
                <option value={item}>{item}</option>
            ))}
            
        </Form.Select>
    );
}

export default ItemDropdown;