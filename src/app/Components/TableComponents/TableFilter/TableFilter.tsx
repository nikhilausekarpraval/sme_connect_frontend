import { EmployeeService } from "@/app/Services/employeeService";
import {  useState } from "react";
import React from "react";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { IoSearchOutline } from "react-icons/io5";
import './TableFilter.scss';
import ConfirmPopup from "../../ConfirmPopup/ConfirmPopup";
import UsersService from "@/app/Services/usersService";
import { IUser } from "@/app/Interfaces/Interfaces";

interface ITableFilterProps{
    items:any[]
    search:(searchValue:any)=>void;
    selectedItems: Set<any>;
    resetFilters:()=>void;
    reloadData:()=>void;
    setIsEdit:(isEdit:boolean)=>void;
    setIsCreate:(isCreate:boolean)=>void;
}

const TableFilter: React.FC<ITableFilterProps> = ({setIsEdit,setIsCreate, items, reloadData, search,selectedItems,resetFilters }) =>{

    const [searchValue, setSearchValue] = useState("");
    const [isShowDelete, setIsShowDelete] = useState(false);
    const [popupTitle,setPopupTitle]= useState("Delete record");
    const employeeService = new UsersService();


    const clearPopup = () => {
        setIsShowDelete(false);
    };

    const showDelete = () => {
        setIsShowDelete(true);
    };

    const deleteSelected = async () => {

        try {
            const selectedItemsArray = Array.from(selectedItems);
            const result = await employeeService.deleteUser(selectedItemsArray);
            setIsShowDelete(false);
            reloadData();

        } catch (error) {
            console.error("Error deleting selected items:", error);
        }
    };


    return (
        <React.Fragment>
            <div className="filter-bar flex justify-between py-2 m-0">
                <div>
                    <span className="filter-heading">Filter</span>
                </div>
                <div className="d-flex gap-3">
                    <InputGroup className="">
                        <Form.Control
                            type="text"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            placeholder="Search..."
                        />
                        <Button onClick={() => search(searchValue)} variant="outline-secondary" id="searchButton">
                            <IoSearchOutline/>
                        </Button>
                    </InputGroup>
                    <div className="filter-buttons">
                        {selectedItems.size === 1 && (
                            <button onClick={()=>setIsEdit(true)}>Edit</button>
                        )}
                        <button onClick={()=>setIsCreate(true)}>Create</button>
                        {selectedItems.size === 1 && (
                            <button onClick={showDelete}>Delete</button>
                        )}
                        <button onClick={resetFilters}>Reset</button>
                    </div>
                </div>
            </div>
            {true && (
                <ConfirmPopup
                    handleClose={clearPopup}
                    deleteItem={deleteSelected}
                    show={isShowDelete}
                    message={`Are you sure you want to delete ${selectedItems.size} item${selectedItems.size > 1 ? "s" : ""}.`}
                />
            )}
        </React.Fragment>
    );
}
export default TableFilter;
