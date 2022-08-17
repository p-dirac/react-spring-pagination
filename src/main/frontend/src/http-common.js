import axios from "axios";

//for REST only
export default axios.create({
    baseURL: 'http://localhost:8081/back',
    headers: {
        'Content-Type': 'application/json'
    }
});
