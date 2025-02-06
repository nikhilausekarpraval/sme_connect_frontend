
import {  useState } from "react";
import React from "react";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Form from "react-bootstrap/esm/Form";
import { IoSearchOutline } from "react-icons/io5";
import './TableFilter.scss';
import ConfirmPopup from "../../ConfirmPopup/ConfirmPopup";
import { Button } from "react-bootstrap";
import FilterButton from "../../FilterButton/FilterButton";
import { MdEdit } from "react-icons/md";
import { RxReset } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import { RiAddLargeLine } from "react-icons/ri";

interface ITableFilterProps{
    search:(searchValue:any)=>void;
    selectedItems: Set<any>;
    resetFilters:()=>void;
    setIsEdit:(isEdit:boolean)=>void;
    setIsCreate:(isCreate:boolean)=>void;
    showDelete:()=>void;
    haveEdit?:boolean
}

const TableFilter: React.FC<ITableFilterProps> = ({setIsEdit,setIsCreate,showDelete,haveEdit=true, search,selectedItems,resetFilters }) =>{

    const [searchValue, setSearchValue] = useState("");
    const [popupTitle,setPopupTitle]= useState("Delete record");
    
    const resetFiltersAndSearch=()=>{
      setSearchValue("");
      resetFilters();
    }

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
                        <Button onClick={() => search(searchValue)}  id="searchButton">
                            <IoSearchOutline/>
                        </Button>
                    </InputGroup>
                    <div className="filter-buttons">
                        {(selectedItems.size === 1 && haveEdit) && (
                            <FilterButton icon={MdEdit} onClick={()=>setIsEdit(true)} title={"Edit"} />
                        )}
                        {selectedItems.size <= 0 && (
                            <FilterButton icon={RiAddLargeLine} onClick={()=>setIsCreate(true)} title={"Add"} />
                        )}
                        {selectedItems.size >= 1 && (
                            <FilterButton icon={MdDeleteForever} onClick={showDelete} title={"Delete"} />
                        )}
                        <FilterButton icon={RxReset} onClick={resetFiltersAndSearch} title={"Reset"} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default TableFilter;
