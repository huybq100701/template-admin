import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import Table from '../../components/Table';
import { getList } from '../../services/user.service';
import { DEFAULT_FILTER, DEFAULT_PAGE, IFilter, MODAL_TYPE, PAGE_SIZE_GET_ALL, STATUS, STATUS_OPTIONS } from '../../constants/constants';
import IconEdit from '../../components/Icon/IconEdit';
import IconEye from '../../components/Icon/IconEye';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import SelectCustom from '../../components/Select';
import { getRoles } from '../../services/role.service';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import AddUpdateModal from '../../views/User/AddUpdateModal';

const User = () => {
    const { register, handleSubmit, getValues, setValue, reset, watch } = useForm();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState<any>(DEFAULT_FILTER);
    const [userData, setUserData] = useState<any>();
    const [roleData, setRoleData] = useState<any>();
    const [fetching, setFetching] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<any>(null);
    watch('user_role_id');

    useEffect(() => {
        dispatch(setPageTitle('Người dùng'));
    });

    useEffect(() => {
        _getList();
    }, [filter]);

    useEffect(() => {
        const _getRoles = async () => {
            const res = await getRoles({ page: DEFAULT_PAGE, size: PAGE_SIZE_GET_ALL });
            setRoleData(res?.metadata);
        };

        _getRoles();
    }, []);

    const _getList = async () => {
        setFetching(true);
        const res = await getList(filter);
        setUserData(res?.metadata);
        setFetching(false);
    };

    const onSearch = (data: any) => {
        setFilter({
            ...filter,
            user_fullname: data?.user_fullname,
            user_username: data?.user_username,
            user_role_id: data?.user_role_id?.value,
            user_status: data?.user_status?.value,
        });
    };

    const onResetFilter = () => {
        reset();
        setFilter(DEFAULT_FILTER);
        setValue('user_status', '');
        setValue('user_role_id', '');
    };

    const renderStatus = (status: string) => {
        if (status === STATUS.ACTIVE) {
            return <span className="badge bg-success">Kích hoạt</span>;
        } else if (status === STATUS.ACTIVE) {
            return <span className="badge bg-danger">Hủy</span>;
        } else {
            return <span className="badge bg-dark">Lỗi trạng thái</span>;
        }
    };

    const renderTable = () => {
        return (
            <Table
                records={userData?.data}
                columns={[
                    {
                        accessor: 'user_username',
                        title: 'Tên tài khoản',
                    },

                    {
                        accessor: 'user_fullname',
                        title: 'Họ tên',
                    },

                    {
                        accessor: 'user_email',
                        title: 'Email',
                    },

                    {
                        accessor: 'user_role',
                        title: 'Phân nhóm',
                        render: ({ user_role }: any) => <div className="text-primary font-bold">{`${user_role?.role_code}`}</div>,
                    },

                    {
                        accessor: 'user_status',
                        title: 'Trạng thái',
                        render: ({ user_status }: any) => renderStatus(user_status),
                    },

                    {
                        accessor: 'action',
                        title: 'Thao tác',
                        textAlignment: 'center',
                        render: () => (
                            <div className="flex gap-4 items-center w-max mx-auto">
                                <div className="flex cursor-pointer hover:text-info">
                                    <IconEdit className="w-4.5 h-4.5" />
                                </div>
                                <div className="flex cursor-pointer hover:text-primary">
                                    <IconEye />
                                </div>
                                <div className="flex cursor-pointer hover:text-danger">
                                    <IconTrashLines />
                                </div>
                            </div>
                        ),
                    },
                ]}
                total={userData?.total}
                filter={filter}
                handleChangeFilter={setFilter}
                fetching={fetching}
            />
        );
    };

    const renderFilter = () => {
        return (
            <div>
                <form onSubmit={handleSubmit(onSearch)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <Input name="user_username" placeholder="Nhập tên đăng nhập" register={register} />
                        <Input name="user_fullname" placeholder="Nhập họ tên" register={register} />

                        <SelectCustom
                            options={roleData?.data?.map((role: any) => ({
                                label: role?.role_code,
                                value: role?.role_id,
                            }))}
                            placeholder="Chọn phân nhóm"
                            onChange={(e: any) => {
                                setValue('user_role_id', e);
                            }}
                            value={getValues('user_role_id')}
                        />
                        <SelectCustom
                            options={STATUS_OPTIONS}
                            placeholder="Chọn trạng thái"
                            onChange={(e: any) => {
                                setValue('user_status', e);
                            }}
                            value={getValues('user_status')}
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                        <button type="submit" className="btn btn-success">
                            Tìm kiếm
                        </button>

                        <button type="button" className="btn btn-warning" onClick={onResetFilter}>
                            Làm mới
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                setOpenModal(true);
                                setModalType(MODAL_TYPE.ADD);
                            }}
                        >
                            Thêm mới
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div>
            {/* <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Quản lý hệ thống
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Người dùng</span>
                </li>
            </ul> */}

            <AddUpdateModal open={openModal} onClose={() => setOpenModal(false)} roleData={roleData} modalType={modalType} onGetList={_getList}/>

            <div>
                <div className="panel h-full">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Danh sách người dùng</h5>
                    </div>
                    {renderFilter()}
                    {renderTable()}
                </div>
            </div>
        </div>
    );
};

export default User;
