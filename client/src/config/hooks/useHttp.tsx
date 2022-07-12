import React from 'react';
import { basesUrl } from '../url';
import { useMessage } from './useMessage';

export const useHttp = () => {
    const message = useMessage();
    const [loader, setLoader] = React.useState(false);

    const request = React.useCallback(
        async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body: any = null, headers: any = {}) => {
            try {
                setLoader(true);
                if (body) {
                    body = JSON.stringify(body);
                    headers['Content-Type'] = 'application/json';
                }
                const res: Response = await fetch(basesUrl + url, { method, body, headers });
                const data = await res.json();

                return data;
            } catch (e) {
                console.log(e);
                message('Что-то пошло не так!', 'error');
            }
        },
        [],
    );

    return { loader, request };
};
