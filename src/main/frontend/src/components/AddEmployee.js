import React, {useRef, useMemo} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import employeeService from "../services/employee.service";
import '../mycustom.css';
import 'bootstrap/dist/css/bootstrap.css';



/**
 * Creates HTML form to add new employee to database.
 * Sends employee object to server database.
 *
 * ref: https://dev.to/tienbku/react-table-crud-example-using-hooks-react-table-v7-3emd
 *
 * reset ref: https://jasonwatmore.com/post/2021/09/23/react-hook-form-reset-form-with-default-values-and-clear-errors
 *
 * @return {html} Form to add new employee, or update existing employee
 */
const AddEmployee = () => {
    //
    console.log('AddEmployee');
    const idRef = useRef(-1);

    const defaultForm = useMemo(() => {
        return {
                    name: '',
                    location: '',
                    department: ''
                };
            }, []);
    //
    const {register, handleSubmit, setValue, reset } = useForm(
            {defaultValues: defaultForm
            });

    const reg = {
        name: {required: "Name is required"},
        location: {required: "Email is required"},
        department: {
            required: "Department is required"}
    };

    const navigate = useNavigate();
    //
    //
    let hdr = "Add Employee";
    let employee = null;
    //
    const {empParam} = useParams();
    console.log('from useParams: ', empParam);
    let empJ = sessionStorage.getItem("employee_to_update");
    if (empJ !== null) {
        employee = JSON.parse(empJ);
        sessionStorage.removeItem("employee_to_update");
        console.log('from session: ', employee);
        hdr = "Update Employee";
    } else{
        console.log('defaultForm: ', defaultForm);
            const emp = defaultForm;
            if (emp !== undefined) {
                // get default values and set form fields
                const fields = ['name', 'location', 'department'];
                if (Array.isArray(fields)) {
                    // setValue: set the value of a registered form field
                    fields.forEach((field) => {
                        // let i = fields.indexOf(field);
                        setValue(field, emp[field]);
                    });
                }
            }
    }
    //
    /**
     * Saves employee in the server database
     *
     * @param  {Object} employee
     */
    const saveEmployee = (employee) => {
        // e.preventDefault();
        //  const employee = {name, location, department, id};
     //   console.log('saveEmployee, employee: ', employee);
        if (idRef.current !== -1) {
            //update
            // add id back into employee object to do update on server side
            // rather than creating new record
          //  employee.id = id;
            employee.id = idRef.current;
            console.log('saveEmployee, update employee: ', employee);
            employeeService.update(employee)
                    .then(response => {
                      //  console.log('Employee data updated successfully', response.data);
                        navigate('/home');
                    })
                    .catch(error => {
                        console.log('Something went wrong', error);
                    });
            // reset id
            idRef.current = -1;
        } else {
            //add
            console.log('saveEmployee, new employee: ', employee);
            employeeService.create(employee)
                    .then(response => {
                    //    console.log("employee added successfully", response.data);
                        navigate("/home");
                    })
                    .catch(error => {
                        console.log('something went wroing', error);
                    });
        }
    };
    //
    useEffect(() => {
        if (employee !== null) {
            //for update, not for add
            console.log('employee to update: ', employee);
            // save id for update
            idRef.current = employee.id;
            // get employee and set form fields
            const fields = ['name', 'location', 'department'];
            if (Array.isArray(fields)) {
                // setValue: set the value of a registered form field
                fields.forEach((field) => {
                    // let i = fields.indexOf(field);
                    setValue(field, employee[field]);
                });
            }
        //    console.log('fields: ', fields);
            //  setName(employee.data.name);
            //  setLocation(employee.data.location);
            //  setDepartment(employee.data.department);
        } else {
         //   console.log('defaultForm: ', defaultForm);
            const emp = defaultForm;
            if (emp !== undefined) {
                // get default values and set form fields
                const fields = ['name', 'location', 'department'];
                if (Array.isArray(fields)) {
                    // setValue: set the value of a registered form field
                    fields.forEach((field) => {
                        // let i = fields.indexOf(field);
                        setValue(field, emp[field]);
                    });
                }
            }
        }
    }, [defaultForm, employee, setValue]);


    const onSubmit = (data) => saveEmployee(data);
    // Note: in the form tag, use form-horizontal to create grid layout with labels on left side of input fields
    return(
            <div class="center App w400">
                <h3>{hdr}</h3>
                <form class="txleft"  onSubmit={handleSubmit(onSubmit)} >
                    <div class="mb-1 row">
                        <label class="col-form-label col-lg-6" htmlFor="name">Name:&nbsp;&nbsp;</label>
                        <div class="col-lg-6">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                {...register("name", reg.name)}
                                />

                        </div>
                    </div>

                    <div class="mb-1 row">
                        <label class="col-form-label col-lg-6" htmlFor="department">Department:&nbsp;&nbsp;</label>
                        <div class="col-lg-6">
                            <input
                                type="text"
                                className="form-control"
                                id="department"
                                name="department"
                                placeholder="Enter Department"
                                {...register("department", reg.department)}
                                />

                        </div>
                    </div>
                    <div class="mb-1 row">
                        <label class="col-form-label col-lg-6" htmlFor="location">Location:&nbsp;&nbsp;</label>
                        <div class="col-lg-6">
                            <input
                                type="text"
                                className="form-control"
                                id="location"
                                name="location"
                                placeholder="Enter Location"
                                {...register("location", reg.location)}
                                />
                        </div>
                    </div>
                    <div class="mb-1 row">
                        <div class="col-lg-6 d-flex justify-content-center">
                            <button type="button"  onClick={() => {
                    reset();
                }} >
                                Reset
                            </button>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-center">
                            <button type="submit"  >Submit</button>
                        </div>
                    </div>
                </form>

            </div>
            );
};
export default AddEmployee;
