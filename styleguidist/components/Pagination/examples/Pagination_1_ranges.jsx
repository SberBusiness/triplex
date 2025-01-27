import React, {useState, useEffect} from 'react';
import {Pagination} from '@sberbusiness/triplex/components/Pagination/Pagination';
import {ComponentControlPanel} from '../../common/components/ComponentControlPanel/ComponentControlPanel';

const itemsPerPageOptions = ['10', '30', '50', '100'];
const siblingAndBoundaryOptions = ['0', '1', '2'];

const pageSizeOptions = itemsPerPageOptions.map((item) => ({
    id: item,
    label: item,
    value: item,
}));

const totalItems = 150;
const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
const [currentPageNumber, setCurrentPageNumber] = useState(1);
const [totalPages, setTotalPages] = useState(0);

const [siblingCount, setSiblingCount] = useState(0);
const [boundaryCount, setBoundaryCount] = useState(0);

const Example = () => {
    useEffect(() => {
        setTotalPages(Math.ceil(totalItems / Number(pageSize.value)));
    }, [pageSize]);

    useEffect(() => {
        if (Number(siblingCount) + Number(boundaryCount) > 3) {
            setSiblingCount(siblingAndBoundaryOptions[0]);
        }
    });

    const handleSelectPageSize = (pageSize) => {
        setPageSize(pageSize);
        setCurrentPageNumber(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPageNumber(newPage);
    };

    return (
        <>
            <ComponentControlPanel>
                <ComponentControlPanel.Select
                    value={siblingCount}
                    setValue={(value) => {
                        setSiblingCount(value);
                        setCurrentPageNumber(1);
                    }}
                    options={siblingAndBoundaryOptions}
                >
                    siblingCount
                </ComponentControlPanel.Select>
            </ComponentControlPanel>

            <ComponentControlPanel>
                <ComponentControlPanel.Select
                    value={boundaryCount}
                    setValue={(value) => {
                        setBoundaryCount(value);
                        setCurrentPageNumber(1);
                    }}
                    options={siblingAndBoundaryOptions}
                >
                    boundaryCount
                </ComponentControlPanel.Select>
            </ComponentControlPanel>

            <Pagination
                paginationNavigationProps={{
                    boundaryCount: Number(boundaryCount),
                    buttonNextProps: {'aria-label': 'Следующая страница'},
                    buttonPrevProps: {'aria-label': 'Предыдущая страница'},
                    currentPage: currentPageNumber,
                    onCurrentPageChange: handlePageChange,
                    siblingCount: Number(siblingCount),
                    totalPages,
                }}
                paginationSelectProps={{
                    onChange: handleSelectPageSize,
                    options: pageSizeOptions,
                    paginationLabel: 'Показать на странице',
                    value: pageSize,
                }}
            />
        </>
    );
};

<Example />;
