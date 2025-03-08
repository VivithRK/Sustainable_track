import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = 'ApiError';
    }
}

/**
 * Generic error handler for API requests
 * @param {Error} error - The error object from axios
 * @throws {ApiError} Formatted API error
 */
const handleError = (error) => {
    if (error.response) {
        // Server responded with error status
        throw new ApiError(
            error.response.data.message || 'Server error',
            error.response.status,
            error.response.data
        );
    } else if (error.request) {
        // Request made but no response
        throw new ApiError('No response from server', 503);
    } else {
        // Error in request setup
        throw new ApiError('Error setting up request', 400);
    }
};

/**
 * API Service for handling sustainable actions
 */
const apiService = {
    /**
     * Fetch all actions
     * @returns {Promise<Array>} List of actions
     */
    getActions: async() => {
        try {
            const response = await api.get('/actions');
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    /**
     * Create a new action
     * @param {Object} actionData - The action data
     * @param {string} actionData.action - The action description
     * @param {string} actionData.date - The date of the action
     * @param {number} actionData.points - The points for the action
     * @returns {Promise<Object>} Created action
     */
    createAction: async(actionData) => {
        try {
            const response = await api.post('/actions', actionData);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    /**
     * Update an existing action
     * @param {string|number} id - The action ID
     * @param {Object} actionData - The updated action data
     * @returns {Promise<Object>} Updated action
     */
    updateAction: async(id, actionData) => {
        try {
            const response = await api.put(`/actions/${id}`, actionData);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    /**
     * Delete an action
     * @param {string|number} id - The action ID
     * @returns {Promise<void>}
     */
    deleteAction: async(id) => {
        try {
            await api.delete(`/actions/${id}`);
        } catch (error) {
            handleError(error);
        }
    }
};

export default apiService;