import React from 'react';
import {  Link  } from 'react-router-dom';
import '../App.css';


function Navbar() {

    return (

            <div className="App">

            <nav>
                <ul >

                <li>
                    <Link to="/home">Home</Link>
                </li>

                <li>
                    <Link to="/add">Add Employee</Link>
                </li>
                <li>
                    <Link to="/employeeList">Employee List</Link>
                </li>
                </ul>
            </nav>
            </div>
    );
}

export default Navbar;
