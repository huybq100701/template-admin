import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from './store/themeConfigSlice';
import store from './store';
import { getInformation } from './services/auth.service';
import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_CLIENT_ID, LOCAL_STORAGE_USER } from './constants/constants';
import { useNavigate } from 'react-router-dom';

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
        const clientId = localStorage.getItem(LOCAL_STORAGE_CLIENT_ID);
        const _getInformation = async () => {
            try {
                const res = await getInformation();
                localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(res?.metadata));
            } catch (error) {
                navigate('/auth/boxed-signin');
            }
        };

        if (accessToken && clientId) {
            _getInformation();
        } else {
            navigate('/auth/boxed-signin');
        }
    }, []);

    return (
        <div
            className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section antialiased relative font-nunito text-sm font-normal`}
        >
            {children}
        </div>
    );
}

export default App;
