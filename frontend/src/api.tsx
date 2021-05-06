import axios from "axios";

export const getAllDatasources = () => {
    return axios.get('/api/v1/datasources/')
}

export const getDatasource = (uid) => {
    return axios.get(`/api/v1/datasources/${uid}/`)
}

export const getScoreBoundaries = (uid) => {
    return axios.get(`/api/v1/datasources/${uid}/scoreboundaries/`)
}
