

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

    return backend.get(`api/v1/datasources/${uid}/samples/?csrf=1`).then((response) => {
        return backend.post(`api/v1/datasources/${uid}/samples/`, { count: count, min: minScore, max: maxScore }, { headers: { 'X-CSRFTOKEN': response.data['csrftoken'] } })
    })

}

export const getSampleData = (sampleId) => {
    return backend.get(`api/v1/samples/${sampleId}/data/`)
}

export const updatePairStatus = (sampleId, pairId, status) => {

    return backend.get(`api/v1/samples/${sampleId}/pairs/${pairId}/status/?csrf=1`).then((response) => {
        return backend.put(`api/v1/samples/${sampleId}/pairs/${pairId}/status/`, { 'status': status }, { headers: { 'X-CSRFTOKEN': response.data['csrftoken'] } })
    })

}

export const getSampleParams = (sampleId) => {
    return backend.get(`api/v1/samples/${sampleId}/params/`)
}

export const uploadFile = (formData) => {
    return backend.post('upload_file/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const signInUser = (email, password) => {
    // Request the CSRF protection token before making the login request
    return backend.get(`api/v1/login/?csrf=1`).then((response) => {
        return backend.post(`api/v1/login/`, { username: email, password: password }, { headers: { 'X-CSRFTOKEN': response.data['csrftoken'] } })
    })

}

export const signOutUser = () => {
    // Request the CSRF protection token before making the logout request
    return backend.get(`api/v1/logout/?csrf=1`).then((response) => {
        return backend.post(`api/v1/logout/`, {}, { headers: { 'X-CSRFTOKEN': response.data['csrftoken'] } })
    })

}
