import Axios from '../configs/axios.config';

export const getRoles = async (params: any) => {
    const res = await Axios.get(`role`, { params });
    return res.data;
};
