// services/dashboardService.js
import axiosInstance from '../api/axios';

export const getDashboardStats = async () => {
  const response = await axiosInstance.get('dashboard/stats/');
  return response.data;
};