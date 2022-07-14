import React from 'react';
import { useHttp } from '../../config/hooks/useHttp';
import { IMessage } from '../../config/types/types';
import { Loader } from '../../components';
import './result_game_page.scss';

interface IResultState {
    _id: string;
    begin: string;
    end: string;
    ball: number;
    answersTrue: number;
    answersFalse: number;
    count: number;
    __v: number;
}

interface IRes extends IMessage {
    data: IResultState[];
}

const ResultGamePage: React.FC = () => {
    const { request, loader } = useHttp();
    const [result, setResult] = React.useState<IResultState[]>([]);

    const getAllResult = async () => {
        try {
            const res: IRes = await request('/result');
            setResult(res.data);
        } catch (e) {}
    };

    React.useEffect(() => {
        getAllResult();
    }, []);

    return (
        <>
            {loader && <Loader />}
            {result.length ? (
                <>
                    <div className="result__head">
                        <h1 className="result__title">Результаты</h1>
                    </div>
                    <div className="result">
                        <table>
                            <thead>
                                <tr>
                                    <th>Кол-во вопросов</th>
                                    <th>Верных ответов</th>
                                    <th>Неверных ответов</th>
                                    <th>Сумма баллов</th>
                                    <th>Создано</th>
                                    <th>Завершено</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.count}</td>
                                        <td>{item.answersTrue}</td>
                                        <td>{item.answersFalse}</td>
                                        <td>{item.ball}</td>
                                        <td>{item.begin}</td>
                                        <td>{item.end}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default ResultGamePage;
