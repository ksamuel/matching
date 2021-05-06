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

export const createSample = (uid, count, minScore, maxScore) => {
    return axios.post(`/api/v1/datasources/${uid}/samples/`, {count: count, min: minScore, max: maxScore})
}

export const getSample = (uid) => {
    return axios.g(`/api/v1/sample/${uid}/data/`)
}
