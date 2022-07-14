import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import GamePage from './GamePage/GamePage';
import ResultGamePage from './ResultGamePage/ResultGamePage';
import AuthPage from './AuthPage/AuthPage';
import RegisterPage from './RegisterPage/RegisterPage';

interface IProps {
    isAuth: boolean;
    setAuth: (pre: boolean) => void;
    setUser: (pre: { id: null | number; name: string }) => void;
}

const Router: React.FC<IProps> = ({ isAuth, setAuth, setUser }) => {
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
            <Route path="/login" element={<AuthPage setUser={setUser} setAuth={setAuth} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
    );
};

export default Router;
