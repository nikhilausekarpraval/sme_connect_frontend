'use client';
import TableBody from '@/app/Components/TableComponents/TableBody/TableBody';
import TableFilter from '@/app/Components/TableComponents/TableFilter/TableFilter';
import { IRole } from '@/app/Interfaces/Interfaces';
import React, { useEffect, useState } from 'react';
import SortWorker from '@/app/Workers/SortWorker';
import SearchWorker from '@/app/Workers/SearchWorker';
import { emptyRole, RoleColumnConfig, roleHeaders } from '@/app/Constants/Constants';
import RoleForm from '../Forms/RoleForm/RoleForm';
import RoleService from '@/app/Services/RoleService';
import ConfirmPopup from '@/app/Components/ConfirmPopup/ConfirmPopup';

export default function Role() {

  const _RoleService = new RoleService();
  const [allItems, setAllItems] = useState<IRole[]>([]);
  const [sortedData, setSortedData] = useState<IRole[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetSearch, setIsResetSearch] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<any>>(new Set<any>());
  const defaultSortedColumn = "id";
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(defaultSortedColumn);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IRole | null>();
  const [isShowDelete, setIsShowDelete] = useState(false);

  let searchWorker: Worker;
  let sortWorker: Worker;

  const onReset = async (isReload = false) => {
    setSelectedItems(new Set<any>());
    setSortOrder("asc");
    setSortedColumn(defaultSortedColumn);
    if (!isReload) {
      setSortedData(await getSortedData(allItems));
    }
    setSortedData(allItems);
    setIsResetSearch(!isResetSearch);
  }

  const reloadData = async () => {
    onReset(true);
    await getData();

  }


  useEffect(() => {
    getData();
  }, [])


  const getData = async () => {
    setIsLoading(true);

    try {

      const result = await _RoleService.getRolesWithClaims();

      if(result?.value){
        const sortedApis = await getSortedData(result?.value);
        setSortedData(sortedApis);
        setAllItems(sortedApis);
      }

      setIsLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const sortTableData = (
    data: IRole[],
    sortedColumn: string,
    sortOrder: string
  ): any => {
    initializeSortWorker();
    sortWorker.postMessage({
      sortedData: data,
      sortedOrder: sortOrder,
      ColumnName: sortedColumn,
    });

    return new Promise((resolve, reject) => {
      sortWorker.onmessage = (event: any) => {
        sortWorker.terminate();
        resolve(event.data);
      };
    });
  };

  const getSortedData = async (data: any) => {
    return await sortTableData(data, "userName", "asc") as IRole[];
  }

  const initializeSortWorker = () => {
    const code = SortWorker.toString();
    const blob = new Blob(["(" + code + ")()"]);
    sortWorker = new Worker(URL.createObjectURL(blob));

    sortWorker.onerror = (event: any) => {
      sortWorker.terminate();
      console.log("There is an error with your searchWorker!", event);
    };
  }

  const initializeSearchWorker = () => {
    const code = SearchWorker.toString();
    const blob = new Blob(["(" + code + ")()"]);
    searchWorker = new Worker(URL.createObjectURL(blob));

    searchWorker.onerror = (event: any) => {
      searchWorker.terminate();
      console.log("There is an error with your searchWorker!", event);
    };
  }

  const getSearchData = (data: any, searchText: string) => {
    try {
      initializeSearchWorker();
      searchWorker.postMessage({ data, searchText: searchText, dateFormat: "DD-MM-YY" });
      return new Promise((resolve, reject) => {
        searchWorker.onmessage = (event: any) => {
          searchWorker.terminate();
          resolve(event.data);
        };

        searchWorker.onerror = (error: any) => {
          searchWorker.terminate();
          reject(error);
        };
      });
    } catch (error) {
      console.error('Error in getSearchData:', error);
      return Promise.reject(error);
    }
  };


  const onSearch = (searchText: string) => {
    getSearchData(allItems, searchText).then((data) => {
      const d = data as any;
      setSortedData(d);
    });
    if (searchText.trim() === "") {
      setSortedData(allItems);
    }
  };

  const setLoaderAndSortedData = (loader: boolean, sortData: IRole[]) => {
    setIsLoading(loader);
    setSortedData(sortData);
  }

  const handleCheckboxChange = (identifier: any) => {

    if (identifier === "header") {
      if (sortedData.length === allItems.length) {
        setSelectedItems(
          new Set(
            selectedItems.size === allItems.length
              ? []
              : sortedData.map(item => item.id)
          )
        );
      }

    } else {
      if (selectedItems.has(identifier)) {
        const updatedItems = new Set(selectedItems);
        updatedItems.delete(identifier);
        setSelectedItems(updatedItems);
      } else {
        const updatedItems = new Set(selectedItems);
        updatedItems.add(identifier);
        setSelectedItems(updatedItems);
      }

    }
  };

  useEffect(() => {
    try {
      if (isCreate) {
        setSelectedUser(emptyRole);
        return;
      }
      const role = Array.from(selectedItems)[0];
      const emp = allItems.filter(item => item.id === role)[0];
      setSelectedUser(emp);
    } catch (e: any) {

    }

  }, [isCreate, isEdit])

  const clearForm = (e: any) => {
    e?.preventDefault();
    setIsCreate(false);
    setIsEdit(false);
  }

  const submitForm = () => {
    clearForm(null);
    reloadData();

  }

  const deleteSelected = async () => {

    try {
      const selectedItemsArray = Array.from(selectedItems);
      const result = await _RoleService.deleteRole(selectedItemsArray);
      setIsShowDelete(false);
      reloadData();

    } catch (error) {
      console.error("Error deleting selected items:", error);
    }
  };

  const clearPopup = () => {
    setIsShowDelete(false);
  };

  const showDelete = () => {
    setIsShowDelete(true);
  };

  return (
    <div className='px-3 flex flex-1 flex-column overflow-hidden la-table-styles role-select-none role-access-config'>
      <TableFilter setIsEdit={setIsEdit} setIsCreate={setIsCreate} showDelete={showDelete} search={onSearch} resetFilters={onReset} selectedItems={selectedItems} />
      <TableBody<IRole> sortOrder={sortOrder} setSortOrder={setSortOrder} sortTableData={sortTableData} selectedItems={selectedItems} getData={getData} sortedData={sortedData} isLoading={isLoading} setLoaderAndSortedData={setLoaderAndSortedData} handleRowCheckboxChange={handleCheckboxChange} defaultSortedColumn={defaultSortedColumn} sortedColumn={sortedColumn} setSortedColumn={setSortedColumn} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} tableHeaders={roleHeaders} columnConfig={RoleColumnConfig} />
      <RoleForm selectedRole={selectedUser} isEdit={isEdit} isCreate={isCreate} clearForm={clearForm} save={submitForm} />
      {true && (
        <ConfirmPopup
          handleClose={clearPopup}
          deleteItem={deleteSelected}
          show={isShowDelete}
          message={`Are you sure you want to delete ${selectedItems.size} item${selectedItems.size > 1 ? "s" : ""}.`}
        />
      )}
    </div>
  );
}