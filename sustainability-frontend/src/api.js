import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = {
    getActions: () => axios.get(`${API_URL}/actions/`),
    createAction: (action) => axios.post(`${API_URL}/actions/`, action),
    updateAction: (id, action) => axios.put(`${API_URL}/actions/${id}/`, action),
    deleteAction: (id) => axios.delete(`${API_URL}/actions/${id}/`)
};

export default api;