import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';

const Customer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Khách hàng'));
    });

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Quản lý hệ thống
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Khách hàng</span>
                </li>
            </ul>

            <div className="mt-5">
                <div className="panel h-full">Customer</div>
            </div>
        </div>
    );
};

export default Customer;
