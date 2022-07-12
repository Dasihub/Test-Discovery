import React from 'react';
import { useTypeSelector } from '../../config/hooks/useTypeSelector';
import { Button, Loader } from '../../components';
import { useAction } from '../../config/hooks/useAction';
import './game_page.scss';

const GamePage: React.FC = () => {
    const { getCluesAction } = useAction();
    const [isBegin, setIsBegin] = React.useState(true);
    const { clues, loader } = useTypeSelector((state) => state.cluesReducer);
    console.log(clues);

    React.useEffect(() => {
        getCluesAction();
    }, []);

    if (!isBegin) {
        return (
            <div className="begin">
                <Button value="Начать игру" click={setIsBegin.bind(null, true)} />
            </div>
        );
    }

    return (
        <>
            {loader && <Loader />}
            <div>
                {clues?.map((item) => (
                    <div key={item.id}>
                        <div>{item.value}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default GamePage;
