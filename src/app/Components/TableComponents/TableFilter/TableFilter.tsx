import { EmployeeService } from "@/app/Services/employeeService";
import { ReactNode, useCallback, useState } from "react";
import React from "react";
import ConfirmPopup from "../../ConfirmPopup";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { IoSearchOutline } from "react-icons/io5";
import debounce from "@mui/material/utils/debounce";


interface ITableFilterProps{
    items:any[]
    search:(searchValue:any)=>void;
    selectedItems: Set<any>;
    resetFilters:()=>void;
}

const TableFilter: React.FC<ITableFilterProps> = ({ items, search,selectedItems,resetFilters }) =>{

    const [searchValue, setSearchValue] = useState("");
    const [isShowDelete, setIsShowDelete] = useState(false);
    const [isEditForm, setIsEditForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [popupTitle,setPopupTitle]= useState("Delete record");
    const employeeService = new EmployeeService();
    const debouncedOnSearch = useCallback(debounce(search, 300), []);

    const showEdit = () => {
        setIsEditForm(true);
        if (selectedItems.size === 1) {
            const employee = items.find(emp => emp.id === selectedItems);
            setSelectedItem(employee || null);
        }
    };

    const save = () => {
        clearSelectedItems();
        setIsEditForm(false);
    };

    const clearForm = () => {
        setIsEditForm(false);
    };

    const clearPopup = () => {
        setIsShowDelete(false);
    };

    const showDelete = () => {
        setIsShowDelete(true);
    };

    const deleteSelected = async () => {
      const result =  await employeeService.deleteEmployees(selectedItem); 
        clearSelectedItems();
    };

    const create = () => {
        setSelectedItem(null);
        setIsEditForm(true);
    };

    const clearSelectedItems = () => {
        resetFilters();
    };


    return (
        <div>
            <div className="filter-bar p-2 m-0">
                <div>
                    <span className="filter-heading">Filter</span>
                </div>
                <div className="d-flex gap-3">
                    <div className="search-bar">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            placeholder="Search..."
                        />
                        <button onChange={() => debouncedOnSearch(searchValue)}>Search</button>
                    </div>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            placeholder="Search..."
                        />
                        <Button onChange={() => debouncedOnSearch(searchValue)} variant="outline-secondary" id="searchButton">
                            <IoSearchOutline/>
                        </Button>
                    </InputGroup>
                    <div className="filter-buttons">
                        {selectedItems.size === 1 && (
                            <button onClick={showEdit}>Edit</button>
                        )}
                        <button onClick={create}>Create</button>
                        <button onClick={showDelete}>Delete</button>
                        <button onClick={resetFilters}>Reset</button>
                    </div>
                </div>
            </div>
            {isShowDelete && (
                <ConfirmPopup
                    onClearPopup={clearPopup}
                    onDelete={deleteSelected}
                    isShowDelete={isShowDelete}
                    title={popupTitle}
                />
            )}
            {/* {isEditForm && FormComponent && (
                <>
                    {FormComponent &&
                        React.cloneElement(FormComponent as React.ReactElement, {
                            clearForm,
                            save,
                            isEditForm,
                            employee: selectedItem,
                        })}
                </>
            )} */}
        </div>
    );
}
export default TableFilter;
