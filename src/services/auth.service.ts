import Axios from '../configs/axios.config';

export const login = async (payload: any) => {
    const res = await Axios.post(`auth/login`, payload);
    return res.data;
};

export const getInformation = async () => {
    const res = await Axios.get(`auth/get-information`);
    return res.data;
};
