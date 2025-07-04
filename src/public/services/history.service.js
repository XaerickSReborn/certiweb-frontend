import axios from 'axios';
import { environment } from '@/environments/environment.development';

const API_URL = `${environment.serverBasePath}/reservations`;

export const historyService = {
  /**
   * Gets the reservations of a specific user from the backend.
   * @param {string|number} userId - The user ID to filter reservations.
   * @returns {Promise<Array>} - A promise that resolves to an array of reservations.
   */
  async getReservationsByUserId(userId) {
    if (!userId) {
      console.error('Error: Se requiere un userId para obtener las reservaciones.');
      return [];
    }
    try {
      console.log(`Fetching reservations for userId: ${userId}`);
      console.log(`API URL: ${API_URL}?userId=${userId}`);
      
      const response = await axios.get(`${API_URL}?userId=${userId}`);
      
      console.log('Raw API response:', response.data);
      const filteredReservations = response.data.filter(reservation => {
        console.log(`Checking reservation userId: ${reservation.userId} against target: ${userId}`);
        return reservation.userId == userId;
      });
      
      console.log('Filtered reservations:', filteredReservations);
      
      return filteredReservations;
    } catch (error) {
      console.error(`Error al obtener las reservaciones para el usuario ${userId}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  },
};