import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import GamePage from './GamePage/GamePage';
import ResultGamePage from './ResultGamePage/ResultGamePage';
import AuthPage from './AuthPage/AuthPage';
import RegisterPage from './RegisterPage/RegisterPage';

interface IProps {
    isAuth: boolean;
}

const Router: React.FC<IProps> = ({ isAuth }) => {
    if (isAuth) {
        return (
            <Routes>
                <Route path="/result" element={<ResultGamePage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/login" element={<Navigate replace to="/game" />} />
                <Route path="/register" element={<Navigate replace to="/game" />} />
                <Route path="/" element={<Navigate replace to="/game" />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/result" element={<Navigate replace to="/login" />} />
            <Route path="/game" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
    );
};

export default Router;
