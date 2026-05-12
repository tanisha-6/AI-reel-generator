// import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api';

// export const generateScript = async (scriptData) => {

//     const token = localStorage.getItem('access');

//     console.log('ACCESS TOKEN:', token);

//     const response = await axios.post(

//         `${API_URL}/generate-script/`,

//         scriptData,

//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         }
//     );

//     return response.data;
// };

import axiosInstance from '../api/axios';

export const generateScript = async (
    scriptData
) => {

    const response = await axiosInstance.post(

        'generate-script/',

        scriptData
    );

    return response.data;
};