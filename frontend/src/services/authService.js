import axiosInstance from '../api/axios';


// REGISTER USER
export const registerUser = async (userData) => {
  const response = await axiosInstance.post(
    'register/',
    userData
  );

  return response.data;
};


// LOGIN USER
export const loginUser = async (userData) => {
  const response = await axiosInstance.post(
    'login/',
    userData
  );

  return response.data;
};