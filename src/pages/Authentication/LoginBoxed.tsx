import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconMail from '../../components/Icon/IconMail';
import { setPageTitle } from '../../store/themeConfigSlice';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { error } from '../../helper';
import { login } from '../../services/auth.service';

const loginForm = Yup.object().shape({
    user_username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    user_password: Yup.string().required('Vui lòng nhập mật khẩu'),
});

const LoginBoxed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('Đăng nhập'));
    });

    const submitForm = async (data: any) => {
        try {
            const res = await login(data);
            localStorage.setItem('accessToken', res.metadata.tokens?.accessToken);
            localStorage.setItem('clientId', res.metadata.user?.user_id);
            navigate('/');
        } catch (err: any) {
            error(err.response.data?.message);
        }
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[500px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Đăng nhập</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Nhập tài khoản và mật khẩu của bạn để đăng nhập</p>
                            </div>

                            <Formik
                                initialValues={{
                                    user_username: '',
                                    user_password: '',
                                }}
                                validationSchema={loginForm}
                                onSubmit={submitForm}
                            >
                                {({ errors, submitCount, touched }) => (
                                    <Form className="space-y-5">
                                        <div className={submitCount ? (errors.user_username ? 'has-error' : '') : ''}>
                                            <label htmlFor="user_username">Tên đăng nhập</label>
                                            <div className="flex">
                                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                    <IconMail fill={true} />
                                                </div>
                                                <Field
                                                    name="user_username"
                                                    type="text"
                                                    id="user_username"
                                                    placeholder="Nhập tên đăng nhập"
                                                    className="form-input ltr:rounded-l-none rtl:rounded-r-none"
                                                />
                                            </div>

                                            {submitCount ? errors.user_username ? <div className="text-danger mt-1">{errors.user_username}</div> : <div></div> : ''}
                                        </div>

                                        <div className={submitCount ? (errors.user_password ? 'has-error' : '') : ''}>
                                            <label htmlFor="user_password">Mật khẩu</label>
                                            <div className="flex">
                                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                    <IconLockDots fill={true} />
                                                </div>
                                                <Field
                                                    name="user_password"
                                                    type="password"
                                                    id="user_password"
                                                    placeholder="Nhập mật khẩu"
                                                    className="form-input ltr:rounded-l-none rtl:rounded-r-none"
                                                />
                                            </div>

                                            {submitCount ? errors.user_password ? <div className="text-danger mt-1">{errors.user_password}</div> : <div></div> : ''}
                                        </div>

                                        <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                            Đăng nhập
                                        </button>
                                    </Form>
                                )}
                            </Formik>

                            {/* <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="Username">Tên đăng nhập</label>
                                    <div className="relative text-white-dark">
                                        <input id="Username" type="text" placeholder="Nhập tên đăng nhập" className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Mật khẩu</label>
                                    <div className="relative text-white-dark">
                                        <input id="Password" type="password" placeholder="Nhập mật khẩu" className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Đăng nhập
                                </button>
                            </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
