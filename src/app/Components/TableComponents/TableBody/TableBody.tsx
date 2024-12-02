import React, { useEffect, useState } from 'react'
import { RefObject } from 'react';
import PaginationComponent from '../../Pagination/Pagination';
import { IUser } from '@/app/Interfaces/Interfaces';
import TableHeader from '../TableHeader/TableHeader';
import TableRow from '../TableRow/TableRow';
import { UserColumnConfig, userHeaders } from '@/app/Constants/Constants';
import { Loader } from '../../Loader/Loader';


interface ITableBodyProps {
  sortTableData: (data: IUser[],
    sortedColumn: string,
    sortOrder: string) => IUser[];
  sortedData: IUser[];
  isLoading: boolean;
  getData: () => void;
  defaultSortedColumn:string;
  setLoaderAndSortedData:(loading:boolean,sortedData : IUser[])=>void;
  handleRowCheckboxChange:(id:any)=>void;
  selectedItems: Set<any>;
}


const TableBody: React.FC<ITableBodyProps> = ({ sortedData,selectedItems, isLoading, handleRowCheckboxChange, defaultSortedColumn, sortTableData, setLoaderAndSortedData })=> {

  const myElementRef: RefObject<HTMLDivElement> = React.createRef();
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(defaultSortedColumn);

  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [totalPageCount, setTotalPageCount] = useState(Math.ceil(sortedData.length / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(1);
  const idColumn = "id";


  const resetState = () => {
    setSortOrder('asc');
    setCurrentPage(1);
    setItemsPerPage(50);
    setSortedColumn(defaultSortedColumn)
  }

  const handleSort = (column: string, order = "") => {
    let sortOrder = 'asc'
    if (column == "") {
      sortOrder = (order === 'asc') ? 'asc' :
        (sortedColumn === column) ?
          (sortOrder === 'asc' ?
            'desc' : 'asc') : 'asc';

        setSortOrder(sortOrder);
        setSortedColumn(column);

        saveSortedData(column.charAt(0).toLocaleLowerCase() + column.slice(1), sortOrder);
      
    }
  };

  const saveSortedData = async (column:string, sortOrder:string) => {
    const data = await sortTableData(sortedData, column, sortOrder) as IUser[]
    setLoaderAndSortedData( false,  data )
  }

  const renderRow = (item: IUser, index:number) => {
    return <TableRow
            key={index}
            item={item} 
            handleRowCheckboxChange={handleRowCheckboxChange} 
            selectedItems={selectedItems} 
            idColumn={idColumn} 
            FieldConfig={UserColumnConfig}      
    />
  }

  const renderItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    let end = currentPage * itemsPerPage;

    if (end > sortedData.length) {
      end = sortedData.length;
    }

    const data = sortedData.slice(start, end);
    return data.map((item, index) => renderRow(item, index));
  };


  const pageHandler = async (page:number) => {
    setCurrentPage(page);
    scrollToTop()
  }

  const scrollToTop = () => {
    const element = myElementRef.current;

    if (element) {
      element.scrollTop = 0;
    }
  };


    return (
      <div>
        {isLoading && <Loader />}
        <div
          className="la-snapshot-table table-responsive table-body-container-height-config  rounded-3">
          <table className="table m-0">
            <thead className="position-static table-header-style">
              <tr className="table-header">
                {Object.entries(userHeaders).map(([key, label]) => (
                  <TableHeader
                    handleSort={()=>handleSort(key)}
                    sortedColumn={sortedColumn}
                    sortOrder={sortOrder}
                    value={key}
                    name={label}
                  />
                ))}
              </tr>
            </thead>
            <tbody className="table-body overflow-auto">
              {sortedData.length > 0 &&
                renderItems()
              }
            </tbody>
          </table>
          {false && (
            <div>
              <div className="no-records no-records text-center secondary-fontSize p-5">No records found</div>
            </div>
          )}
        </div>
        
        <PaginationComponent 
          page={currentPage} 
          setCurrentPage={pageHandler} 
          pageCount={totalPageCount}
          />

      </div>
    );
  };
export default TableBody
