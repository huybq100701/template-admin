import axios from 'axios';
import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_CLIENT_ID } from '../constants/constants';

const Axios = axios;

Axios.interceptors.request.use((config) => {
    const accessToken = localStorage.accessToken;
    const clientId = localStorage.clientId;
    config.headers.authorization = accessToken;
    config.headers.client_id = clientId;
    return config;
});

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE_CLIENT_ID);
            window.location.href = '/auth/boxed-signin';
        }
        return Promise.reject(error);
    }
);

Axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT;

export default Axios;
