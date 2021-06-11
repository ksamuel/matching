
import { backend } from "./utils";

export const getAllDatasources = () => {
    return backend.get('api/v1/datasources/')
}

export const getDatasource = (uid) => {
    return backend.get(`api/v1/datasources/${uid}/`)
}

export const getScoreBoundaries = (uid) => {
    return backend.get(`api/v1/datasources/${uid}/scoreboundaries/`)
}

export const createSample = (uid, count, minScore, maxScore) => {
    return backend.post(`api/v1/datasources/${uid}/samples/`, { count: count, min: minScore, max: maxScore })
}

export const getSampleData = (sampleId) => {
    return backend.get(`api/v1/samples/${sampleId}/data`)
}

export const updatePairStatus = (sampleId, pairId, status) => {
    return backend.put(`api/v1/samples/${sampleId}/pairs/${pairId}/status`, { 'status': status })
}

export const getSampleParams = (sampleId) => {
    return backend.get(`api/v1/samples/${sampleId}/params`)
}

export const uploadFile = (formData) => {
    return backend.post('upload_file/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
