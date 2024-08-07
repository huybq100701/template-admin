import Axios from '../configs/axios.config';

export const getAuthorizations = async () => {
    const res = await Axios.get(`tab`);
    return res.data;
};
