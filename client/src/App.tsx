import React from 'react';
import { ToastContainer } from 'react-toastify';
import Router from './pages/Router';
import { Loader, Navbar } from './components';
import { useMessage } from './config/hooks/useMessage';
import { useHttp } from './config/hooks/useHttp';
import { IMessage } from './config/types/types';

type userTypes = {
    name: string;
    id: null | number;
};

interface IRes extends IMessage {
    data: { name: string; id: number; login: string }[];
    auth: boolean;
}

const App: React.FC = () => {
    const message = useMessage();
    const { request } = useHttp();
    const [auth, setAuth] = React.useState<boolean>(true);
    const [user, setUser] = React.useState<userTypes>({
        name: '',
        id: null,
    });
    const [loader, setLoader] = React.useState<boolean>(false);

    const check = async () => {
        try {
            const res: IRes = await request('/auth/check');
            setLoader(false);
            message(res.message, res.type);
            if (res.auth) {
                setAuth(res.auth);
                setUser({ name: res.data[0].name, id: res.data[0].id });
            }
        } catch (e) {}
    };

    React.useEffect(() => {
        check();
    }, []);

    if (loader) {
        return <Loader />;
    }

    return (
        <>
            <ToastContainer />
            <Navbar setAuth={setAuth} auth={auth} user={user} />
            <div className="main">
                <Router setAuth={setAuth} setUser={setUser} isAuth={auth} />
            </div>
        </>
    );
};

export default App;
