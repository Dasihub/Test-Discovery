import React from 'react';
import { Logo } from '../../img';
import './navbar.scss';

const Navbar: React.FC = () => {
    return (
        <div className="navbar">
            <div className="navbar__logo">
                <div>
                    <img src={Logo} alt="logo" className="navbar__img" />
                </div>
                <div>Своя игра</div>
            </div>
            <div className="navbar__user">Дастан</div>
        </div>
    );
};

export default Navbar;
