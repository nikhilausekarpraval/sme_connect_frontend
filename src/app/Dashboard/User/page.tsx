'use client';
import TableBody from '@/app/Components/TableComponents/TableBody/TableBody';
import TableFilter from '@/app/Components/TableComponents/TableFilter/TableFilter';
import { IUser } from '@/app/Interfaces/Interfaces';
import UsersService from '@/app/Services/usersService';
import React, { RefObject, useEffect, useState } from 'react';
import UserForm from '../Forms/UserForm/UserForm';


export default function User() {
    
    let  sortWorker: any;
    let searchWorker: any;
    const myElementRef: RefObject<HTMLDivElement> = React.createRef();
    const _UserService = new UsersService();
    const [allItems, setAllItems] = useState<IUser[]>([]);
    const [sortedData, setSortedData] = useState<IUser[]>([]);
    const [isLoading,setIsLoading] = useState(false);
    const [isResetSearch,setIsResetSearch] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set<any>());
    const [selectedItem,setSelectedItem] = useState<IUser>();
    const defaultSortedColumn = "id";

    
   const onReset = async () => {
        setIsLoading(true);
        setSortedData(allItems);
        setIsResetSearch(!isResetSearch);
        setIsLoading(false);
    }

    const getSortedApiData = async () => {
        return await sortTableData(allItems, "", "") as IUser[];
    }

    useEffect(()=>{
        getData();
    },[])
    

  const  getData = async () => {
        setIsLoading(true);

        try {
            const result = await _UserService.getUsers();
            const sortedApis = await sortTableData(result.Data, "moduleName", "asc") as IUser[];
            setSortedData(sortedApis);
            setAllItems(sortedApis);
            setIsLoading(false);

        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

  const  sortTableData = (
        data: IUser[],
        sortedColumn: string,
        sortOrder: string
    ): any => {
        initializeWorker();
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

  const  initializeWorker=()=> {
        const code = sortWorker.toString();
        const blob = new Blob(["(" + code + ")()"]);
        sortWorker = new Worker(URL.createObjectURL(blob));

        sortWorker.onerror = (event:any) => {
            sortWorker.terminate();
            console.log("There is an error with your worker!", event);
        };
    }

   const initializeSearchWorker=() =>{
        const code = searchWorker.toString();
        const blob = new Blob(["(" + code + ")()"]);
        searchWorker = new Worker(URL.createObjectURL(blob));

        searchWorker.onerror = (event:any) => {
            searchWorker.terminate();
            console.log("There is an error with your worker!", event);
        };
    }


   const getsortedData = (data: any, searchText: string) => {
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
            console.error('Error in getsortedData:', error);
            return Promise.reject(error);
        }
    };

  const  onSearch = (searchText: string) => {

        if (searchText.trim() === "") {
            setSortedData(allItems);
        } else {
            getsortedData(allItems, searchText).then((data) => {
                const d = data as IUser[];
               setSortedData(d);
            });
        }
    };

    const setLoaderAndSortedData =(loader:boolean,sortData:IUser[])=>{
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
           if(selectedItems.has(identifier) ){

               selectedItems.delete(identifier) 

           }else {

               selectedItems.add(identifier);

           }
            
        }
    };

        return (
            <div className='px-3 la-table-styles user-select-none align-items-center user-access-config justify-content-between'>
                <div className='d-flex align-items-center justify-content-between'>
                    <h1 className="h4 apex-primary table-header-style m-0">Manage Apis</h1>
                    <TableFilter items={allItems} search={onSearch}
                    resetFilters={onReset} selectedItems={selectedItems} />
                </div>
                <TableBody sortTableData={sortTableData} selectedItems={selectedItems} getData={getData} sortedData={sortedData} isLoading={isLoading} defaultSortedColumn={defaultSortedColumn} setLoaderAndSortedData={setLoaderAndSortedData} handleRowCheckboxChange={handleCheckboxChange} />
            </div>
        );
 }