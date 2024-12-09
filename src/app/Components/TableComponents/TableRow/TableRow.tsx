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
    FieldConfig: {
        field: string;
        dataType: any;
    }[];
}

const TableRow: React.FC<ITableRowProps> = ({ item, handleRowCheckboxChange, selectedItems, idColumn, FieldConfig, useDefaultAuditColumns = true }) => {
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
                    title={dataType === 'date' ? formatDate(item?.[field]) : item[field]?.toString()}
                    className={`changed-by ${dataType === 'number'? 'text-end':''}`}
                >  {dataType !== "dropdown" ? <span
                    className={
                        dataType === "number" ? "padding-right-for-number-row" : ""
                    }
                >
                    {dataType === 'date' ? formatDate(item?.[field]) : item[field]}
                    </span> : <ItemDropdown items={item[field]?.map((item : any) => item.claimType)} />
                
               }

                </td>
            ))}

            {useDefaultAuditColumns &&
                <React.Fragment>
                    <td title={formatDate(item?.ModifiedOnDt)} className='small-column-width'>{formatDate(item?.ModifiedOnDt)}</td>
                    <td title={item?.ModifiedBy} className='changed-by'>{item?.ModifiedBy}</td>
                </React.Fragment>
            }

        </tr>
    );
}
export default TableRow;
