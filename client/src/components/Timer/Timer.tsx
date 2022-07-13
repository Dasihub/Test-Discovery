import React from 'react';

interface IProps {
    isAnswer: (is: boolean) => void;
}

const Timer: React.FC<IProps> = ({ isAnswer }) => {
    const [timer, setTimer] = React.useState<number>(60);

    React.useEffect(() => {
        setInterval(() => {
            setTimer((pre) => pre - 1);
        }, 1000);
    }, []);

    React.useEffect(() => {
        if (timer == 0) {
            isAnswer(false);
        }
    }, [timer]);

    return <div>Время: {timer}</div>;
};

export default Timer;
