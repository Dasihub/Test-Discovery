import React from 'react';
import { useMessage } from '../../config/hooks/useMessage';
import { useHttp } from '../../config/hooks/useHttp';

const ResultGamePage: React.FC = () => {
    const message = useMessage();
    const { request, loader } = useHttp();

    const getAllResult = async () => {
        try {
            const res = await request('/result');
            console.log(res);
        } catch (e) {}
    };

    React.useEffect(() => {
        getAllResult();
    }, []);

    return <div></div>;
};

export default ResultGamePage;
