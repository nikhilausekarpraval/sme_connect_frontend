import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

interface IPaginationProps{
    page:number,
    setCurrentPage: ( value: number)=>void
    pageCount:number,

}
const PaginationComponent: React.FC<IPaginationProps> = ({ page, setCurrentPage,pageCount}) =>{

    return (
        <ResponsivePagination
            current={page}
            total={pageCount}
            onPageChange={setCurrentPage}
        />
    );
};
export default PaginationComponent