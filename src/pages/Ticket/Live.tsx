import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';

const Live = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Bán vé trực tiếp'));
    });

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Quản lý bán vé
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Bán vé trực tiếp</span>
                </li>
            </ul>

            <div className="mt-5">
                <div className="panel h-full">Live</div>
            </div>
        </div>
    );
};

export default Live;
