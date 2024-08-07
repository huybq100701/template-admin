import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';

const Topup = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Báo cáo doanh thu topup'));
    });

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Báo cáo
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Doanh thu topup</span>
                </li>
            </ul>

            <div className="mt-5">
                <div className="panel h-full">Topup</div>
            </div>
        </div>
    );
};

export default Topup;
