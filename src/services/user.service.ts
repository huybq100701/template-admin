import Axios from '../configs/axios.config';

export const getList = async (params?: any) => {
    const res = await Axios.get(`user`, { params });
    return res.data;
};

export const createUser = async (payload:any) => {
    const res = await Axios.post(`auth/register`, payload);
    return res.data;
};

export const updateUser = async (payload:any) => {
    const res = await Axios.patch(`user`, payload);
    return res.data;
};
