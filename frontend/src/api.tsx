import axios from "axios";

export const getDatasources = () => {
    return axios.get('/api/v1/datasources/')
}
