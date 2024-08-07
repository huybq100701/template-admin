import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';

const TicketType = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Danh mục loại vé'));
    });

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Quản lý danh mục
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Danh mục loại vé</span>
                </li>
            </ul>

            <div className="mt-5">
                <div className="panel h-full">TicketType</div>
            </div>
        </div>
    );
};

export default TicketType;
