import React from 'react';
import { toast } from 'react-toastify';

export const useMessage = () => {
    return React.useCallback((text: string, type: 'info' | 'error' | 'success' | 'warn' | 'warning') => {
        toast[type](text, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, []);
};
