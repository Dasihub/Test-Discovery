import React from 'react';

interface IProps {
    questionTab: (id: number, ball: number, answers: string, question: string) => void;
    item: {
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
    };
}

const Topics: React.FC<IProps> = ({ item, questionTab }) => {
    return (
        <button
            disabled={item?.isAnswer?.length ? true : false}
            className="clues__ball"
            key={item.id}
            onClick={questionTab.bind(null, item.id, item.value, item.answer, item.question)}
            style={
                item?.isAnswer?.length
                    ? item?.isAnswer === 'Верно'
                        ? { backgroundColor: 'lime' }
                        : { backgroundColor: 'red' }
                    : {}
            }
        >
            {item?.isAnswer?.length ? item.isAnswer : item.value}
        </button>
    );
};

export default Topics;
