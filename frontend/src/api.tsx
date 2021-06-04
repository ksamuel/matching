
import { BASE_URL, trim, backend } from "./utils";


export const getAllDatasources = () => {
    return backend.get('/api/v1/datasources/')
}

export const getDatasource = (uid) => {
    return backend.get(`/api/v1/datasources/${uid}/`)
}

export const getScoreBoundaries = (uid) => {
    return backend.get(`/api/v1/datasources/${uid}/scoreboundaries/`)
}

export const createSample = (uid, count, minScore, maxScore) => {
    return backend.post(`/api/v1/datasources/${uid}/samples/`, { count: count, min: minScore, max: maxScore })
}
