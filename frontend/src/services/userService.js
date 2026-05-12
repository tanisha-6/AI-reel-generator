// import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api';

// export const getCurrentUser = async () => {

//     const token = localStorage.getItem('access');

//     const response = await axios.get(

//         `${API_URL}/me/`,

//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     return response.data;
// };

import axiosInstance from '../api/axios';

export const getCurrentUser = async () => {

    const response = await axiosInstance.get(
        'me/'
    );

    return response.data;
};