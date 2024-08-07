import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '@mantine/core';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import SelectCustom from '../../components/Select';
import { MODAL_TYPE, STATUS, STATUS_OPTIONS } from '../../constants/constants';
import { error, success } from '../../helper';
import { createUser } from '../../services/user.service';

const AddUpdateModal = ({ open, modalType, roleData, onClose, onGetList }: any) => {
    const modalFormSchema = yup.object().shape({
        user_username: yup
            .string()
            .required('Nhập tên tài khoản')
            .matches(/^[a-zA-Z0-9]+$/, 'Tên tài khoản không có khoảng trắng hoặc ký tự đặc biệt'),
        user_email: yup.string().required('Nhập email').email('Email không đúng định dạng'),
        user_password: modalType === MODAL_TYPE.ADD ? yup.string().required('Nhập mật khẩu').min(8, 'Mật khẩu bao gồm ít nhất 8 ký tự') : yup.string().nullable(),
        user_fullname: yup.string().required('Nhập họ và tên'),
        user_role_id: yup.object().required('Chọn phân nhóm').nullable(),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        setValue,
        reset,
        clearErrors,
        watch,
    } = useForm({
        resolver: yupResolver(modalFormSchema),
    });

    const onCloseModal = () => {
        onClose();
        reset();
        setValue('user_role_id', '');
    };

    const onAddOrUpdateUser = async (data: any) => {
        try {
            await createUser({
                ...data,
                user_role_id: data?.user_role_id?.value,
            });
            success('Thêm mới người dùng thành công');
            onCloseModal();
            onGetList();
        } catch (err: any) {
            error(err.response.data?.message);
        }
    };

    return (
        <Modal open={open} onClose={onCloseModal} title="Thêm mới người dùng" size="max-w-2xl">
            <form onSubmit={handleSubmit(onAddOrUpdateUser)}>
                <div className="text-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-3">
                                <div className="mb-1 font-semibold">Tên tài khoản (*)</div>
                                <div>
                                    <Input name="user_username" register={register} placeholder="Nhập tên tài khoản" error={errors.user_username} disabled={modalType !== MODAL_TYPE.ADD} />
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="mb-1 font-semibold">Email (*)</div>
                                <div>
                                    <Input name="user_email" register={register} placeholder="Nhập email" error={errors.user_email} />
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="mb-1 font-semibold">Trạng thái</div>
                                {STATUS_OPTIONS?.map((status) => (
                                    <label className="inline-flex">
                                        <input
                                            type="radio"
                                            className="form-radio"
                                            value={status.value}
                                            defaultChecked={status?.value === STATUS.ACTIVE}
                                            {...register('status')}
                                            disabled={modalType === MODAL_TYPE.VIEW}
                                        />
                                        <span className="mr-3">{status.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            {modalType === MODAL_TYPE.ADD && (
                                <div className="mb-3">
                                    <div className="mb-1 font-semibold">Mật khẩu (*)</div>
                                    <div>
                                        <Input type="password" name="user_password" register={register} placeholder="Nhập mật khẩu" error={errors.user_password} />
                                    </div>
                                </div>
                            )}

                            <div className="mb-3">
                                <div className="mb-1 font-semibold">Họ và tên (*)</div>
                                <div>
                                    <Input name="user_fullname" register={register} placeholder="Nhập họ và tên" error={errors.user_fullname} />
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="mb-1 font-semibold">Phân nhóm (*)</div>
                                <div>
                                    <SelectCustom
                                        options={roleData?.data?.map((role: any) => ({
                                            label: role?.role_code,
                                            value: role?.role_id,
                                        }))}
                                        placeholder="Chọn phân nhóm"
                                        onChange={(e: any) => {
                                            setValue('user_role_id', e);
                                            if (e) {
                                                clearErrors('user_role_id');
                                            }
                                        }}
                                        // defaultValue={currentUser?.type ? onGetDefaultUserGroup() : getValues('type')}
                                        name="user_role_id"
                                        error={errors.user_role_id}
                                        disabled={modalType === MODAL_TYPE.VIEW}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end py-3 dark:border-slate-700">
                    <div className="flex gap-3">
                        <Button type="button" className="btn btn-outline-danger" onClick={onCloseModal}>
                            Hủy
                        </Button>
                        <Button type="submit" className="btn btn-primary">
                            {modalType !== MODAL_TYPE.VIEW ? 'Lưu' : 'Chỉnh sửa'}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default AddUpdateModal;
