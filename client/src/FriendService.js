import DataService from './DataService.js';

export const getFriendsData = async (address) => {
    try {
        const friends = await DataService.getFriends(address);
        return friends.data;
    } catch (error) {
        console.error('Failed to fetch friends data:', error);
        throw error; // Перебрасываем ошибку дальше, чтобы можно было обработать на уровне UI
    }
};