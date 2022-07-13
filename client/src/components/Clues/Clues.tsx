import React from 'react';
import './clues.scss';
import { Button, Topics } from '../index';

interface IClues {
    id: number;
    answer: string;
    question: string;
    value: number;
    airdate: string;
    created_at: string;
    updated_at: string;
    category_id: number;
    game_id: null;
    invalid_count: null;
    category: {
        id: number;
        title: string;
        created_at: string;
        updated_at: string;
        clues_count: number;
    };
    isAnswer: string;
}

interface IProps {
    ball: number;
    hardTopic: IClues[];
    ac_dcTopic: IClues[];
    stateTopic: IClues[];
    worldsTopic: IClues[];
    inventionsTopic: IClues[];
    endGame: () => void | Promise<void>;
    questionTab: (id: number, ball: number, answers: string, question: string) => void;
}

const Clues: React.FC<IProps> = ({
    worldsTopic,
    hardTopic,
    stateTopic,
    inventionsTopic,
    ac_dcTopic,
    ball,
    questionTab,
    endGame,
}) => {
    const wordsTopicMemo = React.useMemo(() => {
        return worldsTopic.map((item) => <Topics key={item.id} questionTab={questionTab} item={item} />);
    }, [worldsTopic]);

    const stateTopicMemo = React.useMemo(() => {
        return stateTopic.map((item) => <Topics key={item.id} questionTab={questionTab} item={item} />);
    }, [stateTopic]);

    const hardTopicMemo = React.useMemo(() => {
        return hardTopic.map((item) => <Topics key={item.id} questionTab={questionTab} item={item} />);
    }, [worldsTopic]);

    const ac_dcTopicMemo = React.useMemo(() => {
        return ac_dcTopic.map((item) => <Topics key={item.id} questionTab={questionTab} item={item} />);
    }, [ac_dcTopic]);

    const inventionsTopicMemo = React.useMemo(() => {
        return inventionsTopic.map((item) => <Topics key={item.id} questionTab={questionTab} item={item} />);
    }, [inventionsTopic]);

    return (
        <>
            <div className="clues">
                <div className="clues__item">
                    <div className="clues__topic">{worldsTopic[0]?.category?.title}</div>
                    {wordsTopicMemo}
                </div>
                <div className="clues__item">
                    <div className="clues__topic">{ac_dcTopic[0]?.category?.title}</div>
                    {ac_dcTopicMemo}
                </div>
                <div className="clues__item">
                    <div className="clues__topic">{inventionsTopic[0]?.category?.title}</div>
                    {inventionsTopicMemo}
                </div>
                <div className="clues__item">
                    <div className="clues__topic">{stateTopic[0]?.category?.title}</div>
                    {stateTopicMemo}
                </div>
                <div className="clues__item">
                    <div className="clues__topic">{hardTopic[0]?.category?.title}</div>
                    {hardTopicMemo}
                </div>
            </div>
            <div className="count">
                <p className="count__value">
                    Счет: <strong>{ball}</strong>
                </p>
                <Button value="Закончить игру" click={endGame} />
            </div>
        </>
    );
};

export default React.memo(Clues);
