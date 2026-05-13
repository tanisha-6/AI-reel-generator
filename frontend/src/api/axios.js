// // import axios from 'axios';

// // const axiosInstance = axios.create({
// //   baseURL: 'http://127.0.0.1:8000/api/',
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // export default axiosInstance;

// import axios from 'axios';

// const axiosInstance = axios.create({

//     baseURL: 'http://127.0.0.1:8000/api/',
// });


// // REQUEST INTERCEPTOR
// axiosInstance.interceptors.request.use(

//     (config) => {

//         const token = localStorage.getItem('access');

//         if (token) {

//             config.headers.Authorization =
//                 `Bearer ${token}`;
//         }

//         return config;
//     },

//     (error) => {

//         return Promise.reject(error);
//     }
// );


// // RESPONSE INTERCEPTOR
// axiosInstance.interceptors.response.use(

//     (response) => response,

//     async (error) => {

//         const originalRequest = error.config;

//         if (

//             error.response?.status === 401 &&
//             !originalRequest._retry

//         ) {

//             originalRequest._retry = true;

//             try {

//                 const refresh = localStorage.getItem(
//                     'refresh'
//                 );

//                 const response = await axios.post(

//                     'http://127.0.0.1:8000/api/token/refresh/',

//                     {
//                         refresh,
//                     }
//                 );

//                 const newAccess =
//                     response.data.access;

//                 localStorage.setItem(
//                     'access',
//                     newAccess
//                 );

//                 originalRequest.headers.Authorization =
//                     `Bearer ${newAccess}`;

//                 return axiosInstance(originalRequest);

//             } catch (refreshError) {

//                 localStorage.clear();

//                 window.location.href = '/login';

//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({

    baseURL: API_URL,
});


// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem('access');

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);


// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (

            error.response?.status === 401 &&
            !originalRequest._retry

        ) {

            originalRequest._retry = true;

            try {

                const refresh = localStorage.getItem(
                    'refresh'
                );

                const response = await axios.post(

                    `${API_URL}/token/refresh/`,

                    {
                        refresh,
                    }
                );

                const newAccess =
                    response.data.access;

                localStorage.setItem(
                    'access',
                    newAccess
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;

                return axiosInstance(originalRequest);

            } catch (refreshError) {

                localStorage.clear();

                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;