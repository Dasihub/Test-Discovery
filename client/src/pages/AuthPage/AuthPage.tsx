import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Input } from '../../components';
import { useHttp } from '../../config/hooks/useHttp';
import { useMessage } from '../../config/hooks/useMessage';
import './auth_page.scss';

type formState = {
    login: string;
    password: string;
};

const AuthPage: React.FC = () => {
    const message = useMessage();
    const { request, loader } = useHttp();
    const [form, setForm] = React.useState<formState>({
        login: '',
        password: '',
    });

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="auth">
            <form>
                <div className="auth__container">
                    <h1>Авторизация</h1>
                    <div>
                        <Input
                            value={form.login}
                            change={change}
                            id="login"
                            name="login"
                            type="text"
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
                    <Button type="submit" value="Войти" click={() => {}} loader={loader} />
                    <NavLink to="/register">
                        <p>Регистрация</p>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default AuthPage;
