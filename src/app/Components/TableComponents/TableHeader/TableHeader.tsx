import React from 'react'
import { SortOrderEnum } from '@/app/Constants/Enum';
import { FaSortUp, FaSortDown } from "react-icons/fa";

interface ITableHeaderProps {
  name: string;
  notSortable?: boolean;
  sortOrder: string;
  sortedColumn: string;
  value: string
  handleSort:(column:string)=>void;
}

const TableHeader : React.FC<
  ITableHeaderProps> = ({ name ,notSortable,sortOrder,sortedColumn,value,handleSort})=>{

 const isSortedColumn = () => {
    return (
      sortedColumn.toLowerCase().trim()?.replaceAll(" ", "").replaceAll("_", "") ===
      value.toLowerCase().trim()?.replaceAll(" ", "").replaceAll("_", "")
    );
  };


    return (
      <th scope="col" className="border-bottom-0 position-sticky top-0" onClick={()=>handleSort(name)}>
        <div className={`w-100 d-flex ${typeof value === 'number' ?'justify-content-end' : '' }`}>
          {notSortable ? (
            <span>{name}</span>
          ) : (
            <React.Fragment>
              <span>{name}</span>
              <span>
                {isSortedColumn() ? (
                  sortOrder === SortOrderEnum.ASC ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  )
                ) : (
                  <span className="space-for-sort-icon"></span>
                )}
              </span>

            </React.Fragment>
          )}
        </div>
      </th>
    );
  }
export default TableHeader;
