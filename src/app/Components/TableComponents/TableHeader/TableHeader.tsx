import React from 'react'
import { SortOrderEnum } from '@/app/Constants/Enum';
import { FaSortUp, FaSortDown } from "react-icons/fa";
import './TableHeader.scss';
import { AscSortSVG, DescSortSVG } from '@/app/Assets/Images/SortSVG';
import { getDataTypeForKey } from '@/app/Helpers/Helpers';
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
      <th scope="col" className="border-bottom-0 position-sticky top-0" onClick={()=>handleSort(value)}>
        <div className={`d-flex ${name.includes("On Dt") ? 'audit-column-width' :""} ${getDataTypeForKey(value) === 'number' ? 'justify-content-end' : '' }`}>
          {notSortable ? (
            <span>{name}</span>
          ) : (
              <React.Fragment>
                <span>{name}</span>
                <span className='ps-1 pt-1'>
                  {isSortedColumn() ? (
                    sortOrder === SortOrderEnum.ASC ? (
                      <AscSortSVG />
                    ) : (
                      <DescSortSVG />
                    )
                  ) : (
                    <span className=""></span>
                  )}
                </span>
              </React.Fragment>
          )}
        </div>
      </th>
    );
  }
export default TableHeader;
