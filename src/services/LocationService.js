import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'https://back.visitixelles.com/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


export default {
    getLocations() {
        return apiClient.get('/jsonlocations/')
    },
    getLocation(id) {
        return apiClient.get('/jsonlocation/' + id)
    },
}