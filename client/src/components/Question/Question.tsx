import React from 'react';
import { Button, Input, Timer } from '../index';
import './question.scss';

type questionAnswers = {
    id: null | number;
    ball: null | number;
    answers: null | string;
    question: null | string;
};

interface IProps {
    ball: number;
    isAnswer: (is: boolean, answer?: string) => void;
    questionAnswers: questionAnswers;
}

const Question: React.FC<IProps> = ({ questionAnswers, ball, isAnswer }) => {
    const [inputAnswer, setInputAnswer] = React.useState<string>('');

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputAnswer(e.target.value);
    };

    return (
        <>
            <div className="question">{questionAnswers.question}</div>
            <div className="title__info">
                Вопрос на {questionAnswers.ball}, Вы должны ответить на этот вопрос в течение 60 секунд!{' '}
                <Timer isAnswer={isAnswer} />
            </div>
            <Input value={inputAnswer} change={change} id="answers" name="answers" type="text" />
            <div className="count">
                <p className="count__value">
                    Счет: <strong>{ball}</strong>
                </p>
                <Button
                    disabled={!inputAnswer.length}
                    value="Ответить"
                    click={isAnswer.bind(null, true, inputAnswer.trim())}
                />
            </div>
        </>
    );
};

export default React.memo(Question);
