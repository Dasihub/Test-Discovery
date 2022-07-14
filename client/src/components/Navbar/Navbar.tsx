import React from 'react';
import { Logo } from '../../img';
import { useHttp } from '../../config/hooks/useHttp';
import { useMessage } from '../../config/hooks/useMessage';
import { Loader } from '../index';
import { IMessage } from '../../config/types/types';
import './navbar.scss';
import { NavLink } from 'react-router-dom';

type userTypes = {
    name: string;
    id: null | number;
};

interface IRes extends IMessage {
    logout: boolean;
    data: [];
}

interface IProps {
    auth: boolean;
    user: userTypes;
    setAuth: (pre: boolean) => void;
}

const Navbar: React.FC<IProps> = ({ auth, user, setAuth }) => {
    const message = useMessage();
    const { request, loader } = useHttp();

    const logout = async () => {
        try {
            const res: IRes = await request('/auth/logout');
            message(res.message, res.type);
            if (res.logout) {
                setAuth(false);
            }
        } catch (e) {}
    };

    return (
        <>
            {loader && <Loader />}
            <div className="navbar">
                <div className="navbar__logo">
                    <div>
                        <img className="navbar__img" src={Logo} alt="logo" />
                    </div>
                    <div>Своя игра</div>
                </div>
                {auth && (
                    <>
                        <div className="navbar__link">
                            <NavLink to="/game">Играть</NavLink>
                        </div>
                        <div className="navbar__link">
                            <NavLink to="/result">Результаты</NavLink>
                        </div>
                    </>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
                    {auth && (
                        <>
                            <div className="navbar__user">{user?.name}</div>
                            <div>
                                <i onClick={logout} className="bi bi-box-arrow-right" />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
