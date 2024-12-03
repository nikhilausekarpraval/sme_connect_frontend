import { formatDate } from '@/app/Helpers/Helpers';
import React from 'react'
import './TableRow.scss';
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
                >
                    <span
                        className={
                            dataType === "number" ? "padding-right-for-number-row" : ""
                        }
                    >
                        {dataType === 'date' ? formatDate(item?.[field]) : item[field]}
                    </span>
                </td>
            ))}

            {useDefaultAuditColumns &&
                <React.Fragment>
                    <td title={formatDate(item?.SRC_CREATED_DT)} className='small-column-width'>{formatDate(item?.SRC_CREATED_DT)}</td>
                    <td title={item?.SRC_CREATED_BY} className='changed-by'>{item?.SRC_CREATED_BY}</td>
                    <td title={formatDate(item?.SRC_UPDATED_DT)} className='small-column-width'>{formatDate(item?.SRC_UPDATED_DT)}</td>
                    <td title={item?.SRC_UPDATED_BY} className='changed-by'>{item?.SRC_UPDATED_BY}</td>
                </React.Fragment>
            }

        </tr>
    );
}
export default TableRow;
