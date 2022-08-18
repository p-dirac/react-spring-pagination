// Table.js

import React, { useEffect } from "react";
import { useTable, usePagination } from "react-table";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../mycustom.css';

/**
 * Displays a table of data, and allows pagination
 * 
 * ref: https://cloudnweb.dev/2021/06/react-table-pagination/
 * 
 * @param  {Array} columns Defines properties of each table column
 * @param  {Array} data Row data for one page
 * @param  {Function} fetchData Function to retrieve a page of data
 * @param  {Number} pageCount total number of pages 
 * @return {html} Table with pagination buttons
 */
function PageTable( { columns, data, fetchData,
        pageCount: controlledPageCount }) {
        
    console.log('begin PageTable');    
    //
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        // pagination props
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize}
    } = useTable(
            {
                columns,
                data,
                // pageIndex: zero based page number
                // pageSize: number of table rows per page
                initialState: {pageIndex: 0, pageSize: 5},
                manualPagination: true,
                pageCount: controlledPageCount
            },
            usePagination
            );

    useEffect(() => {
        console.log('PageTable, before fetchData, pageIndex: ' + pageIndex + ', pageSize: ' + pageSize );
        fetchData({pageIndex, pageSize});
    }, [pageIndex, pageSize, fetchData]);
    
    
    console.log('PageTable, at return table');  
    /* 
     Render the UI for table
     - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
     */
    return (
            <div class="cellpad">
                <div class="d-flex justify-content-center">
                <table class="tablebdr" {...getTableProps()}>
                    <thead class="App">
                        {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                        ))}
                                </tr>
                                        ))}
                    </thead>
                    <tbody class="txleft" {...getTableBodyProps()}>
                        {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                        }
                                    )} 
                                </tr>
                                    );
                                }
                            )
                            }
                    </tbody>
                </table>
                
            
    </div>
    <br/>
    <div class="d-flex justify-content-center align-items-center">
        
                <ul className="pagination d-flex align-items-center">
                    <li className="page-item" disabled={!canPreviousPage}>
                        <button type="button"  onClick={() => gotoPage(0)}>First</button>
                    </li>
                    <li className="page-item" disabled={!canPreviousPage}>
                        <button type="button"  onClick={() => previousPage()}>{'<'}</button>
                    </li>
                    

                    <li className="page-item" disabled={!canNextPage}>
                        <button type="button"  onClick={() => nextPage()}>{'>'}</button>
                    </li>
                    <li className="page-item"  disabled={!canNextPage}>
                        <button type="button"  onClick={() => gotoPage(pageCount - 1)}>Last</button>
                    </li>

                    <li className="page-item">Page{' '}{pageIndex + 1} of {pageOptions.length}</li>
                    
                    <li className="page-item">
                         <label for="myindex">&nbsp;&nbsp; Go to:&nbsp;&nbsp;</label>
                            <input
                                id="myindex"
                                 maxlength="2" size="2"
                                type="text" inputmode="numeric"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                        gotoPage(page);
                                    }}
                                
                                />
                    </li>
                    
                    <li className="page-item" >
                    
                    <label for="mydrop">&nbsp;&nbsp; Rows per page:&nbsp;&nbsp;</label>
                    <select
                        id="mydrop"
                        value={pageSize}
                        onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                        {[5, 10, 20, 50, 100].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                                        ))}
            
                    </select>
                       
                    </li>        
                </ul>
                
                </div>
            </div>
            );
}

export default PageTable;