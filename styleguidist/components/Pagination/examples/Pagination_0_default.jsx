import React, {useState, useEffect} from 'react';
import {Pagination} from '@sberbusiness/triplex/components/Pagination/Pagination';

const itemsPerPageOptions = ['10', '30', '50', '100'];

const pageSizeOptions = itemsPerPageOptions.map((item) => ({
    id: item,
    label: item,
    value: item,
}));

const totalItems = 150;
const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
const [currentPageNumber, setCurrentPageNumber] = useState(1);
const [totalPages, setTotalPages] = useState(0);

useEffect(() => {
    setTotalPages(Math.ceil(totalItems / Number(pageSize.value)));
}, [pageSize]);

const handleSelectPageSize = (pageSize) => {
    setPageSize(pageSize);
    setCurrentPageNumber(1);
};

const handlePageChange = (newPage) => {
    setCurrentPageNumber(newPage);
};

<Pagination
    paginationNavigationProps={{
        boundaryCount: 1,
        buttonNextProps: {'aria-label': 'Следующая страница'},
        buttonPrevProps: {'aria-label': 'Предыдущая страница'},
        currentPage: currentPageNumber,
        onCurrentPageChange: handlePageChange,
        siblingCount: 1,
        totalPages,
    }}
    paginationSelectProps={{
        onChange: handleSelectPageSize,
        options: pageSizeOptions,
        paginationLabel: 'Показать на странице',
        value: pageSize,
    }}
/>;
