import React from 'react';
import { Routes, Route  } from 'react-router-dom';
// note: Routes has replaced Switch in React version 6
//note: BrowserRouter is called in index.js
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css';
import {ErrorBoundary} from 'react-error-boundary';




function ErrorHandler( {error}) {
    return (
            <div role="alert">
                <p>An error occurred:</p>
                <pre>{error.message}</pre>
            </div>
            );
}

function App() {
    /* Note: BrowserRouter is called in index.js, to surround App */

    return (
            <ErrorBoundary FallbackComponent={ErrorHandler}>    
            
                <div class="center">
            
                    <Navbar />
            
                   
                        <Routes>
                            <Route exact path="/home" element={ < Home / > } />
                            <Route exact path="/employeeList" element={ < EmployeeList / > } />
                            <Route exact path="/add" element={ < AddEmployee / > } />
                            <Route path="/update" element={ < AddEmployee / > } />
                            <Route path="*" element={ < NotFound / > } />
                        </Routes>
                    
            
            
                </div>
            </ErrorBoundary>
            );
}

export default App;
