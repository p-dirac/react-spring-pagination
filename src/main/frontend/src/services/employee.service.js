import httpClient from "../http-common";

const getAll = (page, size) => {
    return httpClient.get(`/employees/${page}/${size}`);
};

const create = (data) => {
    return httpClient.post("/employees", data);
};

const getById = (id) => {
    return httpClient.get(`/employees/${id}`);
};

const update = (data) => {
    return httpClient.put('/employees', data);
};

const remove = (id) => {
    return httpClient.delete(`/employees/${id}`);
};

// assign to variable
const employeeService = {
  getAll, 
  create, 
  getById, 
  update, 
  remove
};

export default employeeService;