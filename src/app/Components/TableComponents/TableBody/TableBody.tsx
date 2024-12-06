import React, { useEffect, useState } from 'react'
import { RefObject } from 'react';
import PaginationComponent from '../../Pagination/Pagination';
import { IUser } from '@/app/Interfaces/Interfaces';
import TableHeader from '../TableHeader/TableHeader';
import TableRow from '../TableRow/TableRow';
import { UserColumnConfig, userHeaders } from '@/app/Constants/Constants';
import { Loader } from '../../Loader/Loader';
import './TableBody.scss';

interface ITableBodyProps {
  sortTableData: (data: IUser[],
    sortedColumn: string,
    sortOrder: string) => IUser[];
  sortedData: IUser[];
  isLoading: boolean;
  getData: () => void;
  defaultSortedColumn: string;
  setLoaderAndSortedData: (loading: boolean, sortedData: IUser[]) => void;
  handleRowCheckboxChange: (id: any) => void;
  selectedItems: Set<any>;
  sortOrder:string;
  setSortOrder:(order:string)=>void;
  sortedColumn:string;
  setSortedColumn:(col:string)=>void;
  itemsPerPage:number;
  setItemsPerPage:(page:number)=>void;
  currentPage:number;
  setCurrentPage:(page:number)=>void;
}


const TableBody: React.FC<ITableBodyProps> = ({ sortOrder,setSortOrder,sortedColumn,setSortedColumn,itemsPerPage,setItemsPerPage,currentPage,setCurrentPage, sortedData, selectedItems, isLoading, handleRowCheckboxChange, sortTableData, setLoaderAndSortedData }) => {

  const myElementRef: RefObject<HTMLDivElement> = React.createRef();
  const [totalPageCount, setTotalPageCount] = useState(Math.ceil(sortedData.length / itemsPerPage) <= 0 ? 1 : Math.ceil(sortedData.length / itemsPerPage));
  const idColumn = "id";


  const handleSort = (column: string, order = "") => {

    if (column !== "") {
      let sort = (sortedColumn === column) ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';

      setSortOrder(sort);
      setSortedColumn(column);

      saveSortedData(column.charAt(0).toLocaleLowerCase() + column.slice(1), sortOrder);

    }
  };

  const saveSortedData = async (column: string, sortOrder: string) => {
    const data = await sortTableData(sortedData, column, sortOrder) as IUser[]
    setLoaderAndSortedData(false, data)
  }

  const renderRow = (item: IUser, index: number) => {
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


  const pageHandler = async (page: number) => {
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
    <div className='pt-1 d-flex flex-1 flex-col h-100 overflow-auto'>
      {isLoading && <Loader />}
      <div
        className="table-body-size rounded-3 flex-1 flex overflow-auto h-100 flex-column">
        <table className="table m-0">
          <thead className="position-static table-header-style">
            <tr className="table-header">
              <th scope="col" className="border-0 position-sticky start-0 sticky-top select-all-checkbox-header-width">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  checked={selectedItems.size == sortedData.length}
                  onChange={() => handleRowCheckboxChange("header")}
                />
              </th>
              {Object.entries(userHeaders).map(([key, label]) => (
                <TableHeader
                  handleSort={handleSort}
                  sortedColumn={sortedColumn}
                  sortOrder={sortOrder}
                  value={key}
                  name={label}
                />
              ))}
            </tr>
          </thead>
          <tbody className="table-body ">
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
      <div className='flex justify-end'>      
        <div className='flex justify-end align-center py-3 w-1/2'>
        <PaginationComponent
          page={currentPage}
          setCurrentPage={pageHandler}
          pageCount={totalPageCount}
        />
      </div>

      </div>

    </div>
  );
};
export default TableBody
