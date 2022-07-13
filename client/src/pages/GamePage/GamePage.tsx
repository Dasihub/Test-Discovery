import React from 'react';
import { useTypeSelector } from '../../config/hooks/useTypeSelector';
import { Button, Clues, Loader, Question } from '../../components';
import { useAction } from '../../config/hooks/useAction';
import { useMessage } from '../../config/hooks/useMessage';
import './game_page.scss';

type questionAnswers = {
    id: null | number;
    ball: null | number;
    answers: null | string;
    question: null | string;
};

const GamePage: React.FC = () => {
    const message = useMessage();
    const { getCluesAction } = useAction();
    const [ball, setBall] = React.useState<number>(0);
    const [isQuestion, setIsQuestion] = React.useState<boolean>(false);
    const [questionAnswers, setQuestionAnswers] = React.useState<questionAnswers>({
        id: null,
        answers: null,
        ball: null,
        question: null,
    });
    const [isBegin, setIsBegin] = React.useState(true);
    const { worldsTopic, ac_dcTopic, inventionsTopic, stateTopic, hardTopic, loader } = useTypeSelector(
        (state) => state.cluesReducer,
    );

    console.log(questionAnswers);

    const questionTab = (id: number, ball: number, answers: string, question: string) => {
        setQuestionAnswers({ id, ball, question, answers });
        setIsQuestion(true);
    };

    const isAnswer = (is: boolean, answer?: string) => {
        setIsQuestion(false);
        if (is) {
            if (questionAnswers.answers === answer) {
                message(`Правильный ответ, Вы заработали ${questionAnswers.ball}`, 'success');
                return setBall((pre) => pre + Number(questionAnswers.ball));
            }
            message('Вы неправильно ответили', 'warn');
            return setBall((pre) => pre - Number(questionAnswers.ball));
        }
        message('Вы не успели ответить на вопрос в течение 60 сек!', 'warn');
        setBall((pre) => pre - Number(questionAnswers.ball));
    };

    const beginGame = () => {
        setIsBegin(true);
    };

    React.useEffect(() => {
        getCluesAction();
    }, []);

    if (!isBegin) {
        return (
            <div className="begin">
                <Button value="Начать игру" click={beginGame} />
            </div>
        );
    }

    return (
        <>
            {loader && <Loader />}
            {isQuestion ? (
                <Question questionAnswers={questionAnswers} ball={ball} isAnswer={isAnswer} />
            ) : worldsTopic.length ? (
                <Clues
                    inventionsTopic={inventionsTopic}
                    ac_dcTopic={ac_dcTopic}
                    stateTopic={stateTopic}
                    worldsTopic={worldsTopic}
                    hardTopic={hardTopic}
                    ball={ball}
                    questionTab={questionTab}
                />
            ) : null}
        </>
    );
};

export default GamePage;
