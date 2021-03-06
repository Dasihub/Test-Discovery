import React from 'react';
import { useTypeSelector } from '../../config/hooks/useTypeSelector';
import { Button, Clues, Loader, Question } from '../../components';
import { useAction } from '../../config/hooks/useAction';
import { useMessage } from '../../config/hooks/useMessage';
import { useHttp } from '../../config/hooks/useHttp';
import { IMessage } from '../../config/types/types';
import './game_page.scss';

interface questionAnswers {
    id: null | number;
    ball: null | number;
    answers: null | string;
    question: null | string;
    type: boolean;
}

interface answeredTopics {
    begin: null | string | Date;
    end: null | string | Date;
    count: number;
    answersTrue: number;
    answersFalse: number;
}

interface IRes extends IMessage {
    data: [];
}

const GamePage: React.FC = () => {
    const message = useMessage();
    const { request, loader } = useHttp();
    const { getCluesAction, answersAction, clearCluesAction, disabledLinkAction, activeLinkAction } = useAction();
    const [ball, setBall] = React.useState<number>(0);
    const [isQuestion, setIsQuestion] = React.useState<boolean>(false);
    const [isBegin, setIsBegin] = React.useState(false);
    const [answeredTopics, setAnsweredTopics] = React.useState<answeredTopics>({
        begin: null,
        end: null,
        answersTrue: 0,
        answersFalse: 0,
        count: 0,
    });
    const [questionAnswers, setQuestionAnswers] = React.useState<questionAnswers>({
        id: null,
        answers: null,
        ball: null,
        question: null,
        type: false,
    });
    const {
        worldsTopic,
        ac_dcTopic,
        inventionsTopic,
        stateTopic,
        hardTopic,
        loader: LoaderReducer,
    } = useTypeSelector((state) => state.cluesReducer);

    const questionTab = (id: number, ball: number, answers: string, question: string) => {
        setQuestionAnswers({ id, ball, question, answers, type: false });
        setIsQuestion(true);
    };

    const isAnswer = (is: boolean, answer?: string) => {
        setIsQuestion(false);
        if (is) {
            if (questionAnswers.answers === answer) {
                message(`???????????????????? ??????????, ???? ???????????????????? ${questionAnswers.ball}`, 'success');
                setAnsweredTopics(
                    (pre) =>
                        (pre = {
                            ...pre,
                            answersTrue: pre.answersTrue + 1,
                            answersFalse: pre.answersFalse,
                            count: pre.count + 1,
                        }),
                );
                answersAction(questionAnswers.id, '??????????');
                return setBall((pre) => pre + Number(questionAnswers.ball));
            }
            message('???? ?????????????????????? ????????????????', 'warn');
            answersAction(questionAnswers.id, '???? ??????????');
            setAnsweredTopics(
                (pre) =>
                    (pre = {
                        ...pre,
                        answersTrue: pre.answersTrue,
                        answersFalse: pre.answersFalse + 1,
                        count: pre.count + 1,
                    }),
            );
            return setBall((pre) => pre - Number(questionAnswers.ball));
        }
        message('???? ???? ???????????? ???????????????? ???? ???????????? ?? ?????????????? 60 ??????!', 'warn');
        answersAction(questionAnswers.id, '???? ??????????');
        setAnsweredTopics(
            (pre) =>
                (pre = {
                    ...pre,
                    answersTrue: pre.answersTrue + 1,
                    answersFalse: pre.answersFalse + 1,
                    count: pre.count + 1,
                }),
        );
        setBall((pre) => pre - Number(questionAnswers.ball));
    };

    const beginGame = () => {
        setIsBegin(true);
        getCluesAction();
        disabledLinkAction();
        setAnsweredTopics({ ...answeredTopics, begin: new Date().toDateString() });
    };

    const endGame = async (): Promise<void> => {
        try {
            clearCluesAction();
            activeLinkAction();
            const res: IRes = await request('/result', 'POST', {
                begin: answeredTopics.begin,
                end: new Date().toDateString(),
                answersTrue: answeredTopics.answersTrue,
                answersFalse: answeredTopics.answersFalse,
                count: answeredTopics.count,
                ball,
            });
            message(res.message, res.type);
            setIsBegin(false);
        } catch (e) {}
    };

    console.log(questionAnswers);

    if (!isBegin) {
        return (
            <div className="begin">
                <Button value="???????????? ????????" click={beginGame} />
            </div>
        );
    }

    return (
        <>
            {loader || (LoaderReducer && <Loader />)}
            {isQuestion ? (
                <Question questionAnswers={questionAnswers} ball={ball} isAnswer={isAnswer} />
            ) : (
                <Clues
                    ball={ball}
                    hardTopic={hardTopic}
                    ac_dcTopic={ac_dcTopic}
                    stateTopic={stateTopic}
                    worldsTopic={worldsTopic}
                    inventionsTopic={inventionsTopic}
                    questionTab={questionTab}
                    endGame={endGame}
                />
            )}
        </>
    );
};

export default GamePage;
