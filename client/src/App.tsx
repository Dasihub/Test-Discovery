import React from 'react';
import { ToastContainer } from 'react-toastify';
import Router from './pages/Router';
import { Navbar } from './components';

const App: React.FC = () => {
    const [isAuth, setIsAuth] = React.useState<boolean>(true);

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="main">
                <Router isAuth={isAuth} />
            </div>
        </>
    );
};

export default App;
