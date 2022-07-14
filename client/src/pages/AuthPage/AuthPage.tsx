import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Input } from '../../components';
import { useHttp } from '../../config/hooks/useHttp';
import { useMessage } from '../../config/hooks/useMessage';
import { IMessage } from '../../config/types/types';
import './auth_page.scss';

type formState = {
    email: string;
    password: string;
};

interface Res extends IMessage {
    data: [{ name: string; id: number; email: string }];
    auth: boolean;
}

interface IProps {
    setAuth: (pre: boolean) => void;
    setUser: (pre: { id: null | number; name: string }) => void;
}

const AuthPage: React.FC<IProps> = ({ setAuth, setUser }) => {
    const message = useMessage();
    const { request, loader } = useHttp();
    const [form, setForm] = React.useState<formState>({
        email: '',
        password: '',
    });

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const login = React.useCallback(
        async (e: React.FormEvent): Promise<void> => {
            try {
                e.preventDefault();
                if (form.email.length && form.password.length) {
                    const res: Res = await request('/auth/login', 'POST', {
                        email: form.email,
                        password: form.password,
                    });
                    message(res.message, res.type);
                    if (res.auth) {
                        setUser({ id: res.data[0].id, name: res.data[0].name });
                        return setAuth(true);
                    }
                    return;
                }
                message('Заполните все поля!', 'warning');
            } catch (e) {}
        },
        [form],
    );

    return (
        <div className="auth">
            <form>
                <div className="auth__container">
                    <h1>Авторизация</h1>
                    <div>
                        <Input
                            value={form.email}
                            change={change}
                            id="email"
                            name="email"
                            type="email"
                            label="Логин"
                            placeholder="Логин"
                        />
                    </div>
                    <div>
                        <Input
                            value={form.password}
                            change={change}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            label="Пароль"
                        />
                    </div>
                    <Button type="submit" value="Войти" click={login} loader={loader} />
                    <NavLink to="/register">
                        <p>Регистрация</p>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default AuthPage;
