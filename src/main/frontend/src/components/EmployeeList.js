import React, { useEffect, useRef, useState, useCallback, Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '../services/employee.service';
import PageTable from './PageTable';
import '../App.css';
import '../mycustom.css';
require('react-dom');
//window.React2 = require('react');

/**
 * Creates HTML table of employees with pagination buttons.
 * Populates table with rows of data from server database, based
 * on page index and page size.
 * 
 * ref: https://cloudnweb.dev/2021/06/react-table-pagination/
 * 
 * @return {html} Table of employees with pagination buttons
 */
const EmployeeList = () => {

    console.log('begin EmployeeList');
  //  let prevIndex = -1;
  //  let prevSize = -1;
    
    const prevIndexRef = useRef(-1);
    const prevSizeRef = useRef(-1);
    
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // const fetchIdRef = useRef(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
 //   console.log('EmployeeList, after useState');

    /**
     * Retrieves specified page from server and saves in local 'data' state.
     * 
     * @param  {Number} pageIndex page number
     * @param  {Number} pageSize number of rows per page
     */
    const fetchPage = (pageIndex, pageSize) => {
        console.log('fetchPage, calling getAll, pageIndex: ' + pageIndex + ', size: ' + pageSize);
        employeeService.getAll(pageIndex, pageSize)
                .then(response => {
                  //  console.log('employees data: ', response.data);
                    // save server side response in local data passed to table
                    setData(response.data.content);
                    // fix page count, based on page size
                    setPageCount(response.data.totalPages);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
    };

    /**
     * Retrieves one page from server and saves in local 'data' state.
     * Resets previou index and page size.
     * 
     * fetchData is passed to Table component as callback when page index
     * or page size changes
     * 
     * @param  {Number} pageIndex page number
     * @param  {Number} pageSize number of rows per page
     */
    const fetchData = useCallback(
            ({ pageIndex, pageSize }) => {
        // This will get called when the table needs new data
    //    console.log('fetchData, pageSize: ' + pageSize + ', pageIndex: ' + pageIndex);
    //    console.log('fetchData, prevIndex: ' + prevIndexRef.current + ', prevSize: ' + prevSizeRef.current);
        if (pageIndex !== prevIndexRef.current  || pageSize !== prevSizeRef.current) {
            setLoading(true);
            fetchPage(pageIndex, pageSize);
            setLoading(false);
            prevIndexRef.current = pageIndex;
            prevSizeRef.current = pageSize;
    }
    }, []);

    const init = useCallback( () => {
     //   console.log('init for page 1');
        // zero based page number
        let page = 0;
        // number of rows per page
        let size = 5;
        fetchPage(page, size);
    }, []);



    useEffect(() => {
     //   console.log('call init');
        init();
    }, [init]);

    /**
     * Updates a row in the server database.
     * 
     * @param  {Object} employee 
     */
    const handleEdit = useCallback( (employee) => {
        console.log('handleEdit, employee: ', employee);
        //
        let empJ = JSON.stringify(employee);
        sessionStorage.setItem("employee_to_update", empJ);
        // note: back tick string allows placeholder substitution
        // using ${} notation for placeholder
        // here, employee will be replaced with employee object to create
        // link path
        //   navigate(`/employees/${employee}`);
        //   navigate(`/employees/${empvals}`);
        navigate(`/update`);
        //   navigate(`/employees/:employee`, {employee});
    }, [navigate]);
    /**
     * Deletes a row from the server database.
     * Reinitializes page index and size. 
     * 
     * @param  {Object} employee 
     */
    const handleDelete = useCallback((employee) => {
        console.log('handleDelete, employee: ', employee);
        let id = employee.id;
        console.log('handleDelete, employee id: ', id);
        employeeService.remove(id)
                .then(response => {
                 //   console.log('employee deleted successfully', response.data);
                    init();
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
    }, [init] );

    const columns = useMemo(() => [
            {Header: "Name", accessor: "name", show: true},
            {Header: "Location", accessor: "location", show: true},
            {Header: "Department", accessor: "department", show: true},
            {Header: "Update",
                Cell: (cellProps) => {
                    //   console.log('cellProps: ', cellProps);
                    //   console.log('cellProps row: ', cellProps.row);
                    //   console.log('cellProps row original: ', cellProps.row.original);
                    return (
                            <Fragment>
                            
                                <button className="btn btn-info ml-2" onClick={() => {
                                        handleEdit(cellProps.row.original);
                                            }}>Update</button>
                            
                            </Fragment>
                            );
                },
                show: true
            },
            {Header: "Delete",
                Cell: (cellProps) => {
                    //    console.log('cellProps: ', cellProps);
                    //   console.log('cellProps row: ', cellProps.row);
                    //    console.log('cellProps row original: ', cellProps.row.original);
                    return (
                            <Fragment>
                                <button className="btn btn-danger ml-2" onClick={() => {
                                        handleDelete(cellProps.row.original);
                                            }}>Delete</button>
                            </Fragment>
                            );
                },
                show: true
            }

        ], [handleDelete, handleEdit]);

    if (!Array.isArray(columns)) {
        console.log('columns is not an array');
    }
    if (!Array.isArray(data)) {
        console.log('data is not an array');
    }

 //   console.log('data: ', data);
    let len = data.length;
    console.log('data len: ', len);
    if (len === 0) {
        console.log('len 0 call init ');
        init();
    }

    console.log('pageCount: ', pageCount);
//
    if (len > 0) {
        console.log('len > 0, call PageTable');
        return (
                <div className="App " >
                    <h3>List of Employees</h3>
                
                
                    <PageTable columns={columns} data={data} fetchData={fetchData} pageCount={pageCount} /> 
                
                </div>
                );
    }
};

export default EmployeeList;
