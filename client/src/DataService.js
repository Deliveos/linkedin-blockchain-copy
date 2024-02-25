// src/services/DataService.js
import axios from 'axios';

const API_URL = 'http://localhost:9876';

export default {
    // USER
    async createUser(body) {
        try {
            const response = await axios.post(`${API_URL}/users`, body);
            return response.data;
        } catch (error) {
            console.error("Error occurred while creating user:", error);
            throw error;
        }
    },
    async getUser(address) {
        try {
            const response = await axios.get(`${API_URL}/users/${address}`);
            return response.data;
        } catch (error) {
            console.error("Error occurred while getting user:", error);
            throw error;
        }
    },
    async putUser(address, body) {
        try {
            const response = await axios.put(`${API_URL}/users/${address}`, body);
            return response.data;
        } catch (error) {
            console.error("Error occurred while updating user:", error);
            throw error;
        }
    },
    async deleteUser(address) {
        try {
            const response = await axios.delete(`${API_URL}/users/${address}`);
            return response.data;
        } catch (error) {
            console.error("Error occurred while deleting user:", error);
            throw error;
        }
    },
    async getAllUsers() {
        try {
            const response = await axios.get(`${API_URL}/users`);
            return response.data;
        } catch (error) {
            console.error("Error occurred while getting all users:", error);
            throw error;
        }
    },

//     Friends Requests

    async createFriendRequest(address, body){
        return await axios.post(`${API_URL}/friends-requests/${address}`, body);
    },
    async getFriendRequest(address){
        return await axios.get(`${API_URL}/friends-requests/${address}`);
    },
    async putFriendRequest(address, body){
        return await axios.put(`${API_URL}/friends-requests/${address}`, body);
    },

//     Friends

    async getFriends(address){
        return await axios.get(`${API_URL}/friends/${address}`);
    },
    async deleteFriends(address, body){
        return await axios.delete(`${API_URL}/friends/${address}`, body);
    },

};