import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';

const ChangeRfid = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Báo cáo dữ liệu đổi RFID'));
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
                    <span>Dữ liệu đổi RFID</span>
                </li>
            </ul>

            <div className="mt-5">
                <div className="panel h-full">ChangeRfid</div>
            </div>
        </div>
    );
};

export default ChangeRfid;
