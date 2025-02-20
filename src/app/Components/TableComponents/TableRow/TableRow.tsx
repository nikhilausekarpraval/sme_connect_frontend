import { formatDate } from '@/app/Helpers/Helpers';
import React from 'react'
import './TableRow.scss';
import ItemDropdown from '../../Dropdown/ItemDropdown';
interface ITableRowProps {
    item: any;
    handleRowCheckboxChange: (id: any) => void;
    selectedItems: Set<any>;
    idColumn: any;
    useDefaultAuditColumns?: boolean;
    performAction?: (action:string,item:any) => void;
    FieldConfig: {
        field: string;
        dataType: any;
    }[];
}

const TableRow: React.FC<ITableRowProps> = ({ item, handleRowCheckboxChange, selectedItems, idColumn, performAction, FieldConfig, useDefaultAuditColumns = true }) => {
    return (
        <tr className="item-table-row">
            <td className="position-sticky start-0">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selectedItems.has(item[idColumn])}
                    onChange={() => handleRowCheckboxChange(item[idColumn])}
                />
            </td>

            {FieldConfig.map(({ field, dataType }) => (
                <td
                    key={field}
                    title={dataType === 'date' ? formatDate(item?.[field]) : ["string[]", "claimsDto[]"].includes(dataType) ? "" : item[field]?.toString()}
                    className={` ${dataType === 'number' ? 'text-end' : field === "action" ? "" : 'changed-by'}`}
                >
                    {["string[]", "claimDto[]"].includes(dataType) ? (
                        <>{dataType === "string[]" ?
                            <ItemDropdown items={item[field]?.map((item: any) => item?.name ? item?.name : item)} />
                            :
                            <ItemDropdown items={item[field]?.map((item: any) => item?.claimType)} />
                        }
                        </>

                    ) : field?.includes("action") ?
                        (
                            <>
                                {performAction &&
                                    <>
                                        <div className='d-flex'>
                                            <button type="button" onClick={() => performAction(dataType.split(",")[1],item)} className="focus:outline-none w-50 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{dataType.split(",")[0]}</button>
                                            <button type="button" onClick={() => performAction(dataType.split(",")[0],item)} className="focus:outline-none w-50 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{dataType.split(",")[1]}</button>
                                        </div>
                                    </>
                                }
                            </>
                        )
                        : dataType?.includes("boolean") ?

                        (
                                <>
                                    { item["requestStatus"] ?  item[field] ? dataType.split(",")[1] : dataType.split(",")[2] : "Pending"  }
                                </>
                        ) :
                        (<>
                            {!dataType.toString().includes("dropdown") ? <span
                                className={
                                    dataType === "number" ? "padding-right-for-number-row" : ""
                                }>
                                {dataType === 'date' ? formatDate(item?.[field]) : item[field]}
                            </span> : <ItemDropdown items={item[field]?.map((item: any) => item[dataType.toString().split(",")[1]])} />

                            }
                        </>)
                    }

                </td>
            ))}

            {useDefaultAuditColumns &&
                <React.Fragment>
                    <td title={formatDate(item?.modifiedOnDt)} className='small-column-width'>{formatDate(item?.modifiedOnDt)}</td>
                    <td title={item?.modifiedBy} className='changed-by'>{item?.modifiedBy}</td>
                </React.Fragment>
            }

        </tr>
    );
}
export default TableRow;
