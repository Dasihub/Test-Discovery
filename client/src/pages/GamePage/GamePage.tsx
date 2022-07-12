import React from 'react';
import { useTypeSelector } from '../../config/hooks/useTypeSelector';
import { Button, Input, Loader } from '../../components';
import { useAction } from '../../config/hooks/useAction';
import './game_page.scss';

const GamePage: React.FC = () => {
    const [ball, setBall] = React.useState<number>(0);
    const { getCluesAction } = useAction();
    const [isBegin, setIsBegin] = React.useState(true);
    const { worlds, ac_dc, inventions, state, hard, loader } = useTypeSelector((state) => state.cluesReducer);
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
            {worlds.length && (
                <>
                    <div className="questions">
                        <div className="questions__item">
                            <div className="questions__topic">{worlds[0]?.category.title}</div>
                            {worlds.map((item) => (
                                <div className="questions__ball" key={item.id}>
                                    {item.value}
                                </div>
                            ))}
                        </div>
                        <div className="questions__item">
                            <div className="questions__topic">{ac_dc[0]?.category.title}</div>
                            {ac_dc.map((item) => (
                                <div className="questions__ball" key={item.id}>
                                    {item.value}
                                </div>
                            ))}
                        </div>
                        <div className="questions__item">
                            <div className="questions__topic">{inventions[0]?.category.title}</div>
                            {inventions.map((item) => (
                                <div className="questions__ball" key={item.id}>
                                    {item.value}
                                </div>
                            ))}
                        </div>
                        <div className="questions__item">
                            <div className="questions__topic">{state[0]?.category.title}</div>
                            {state.map((item) => (
                                <div className="questions__ball" key={item.id}>
                                    {item.value}
                                </div>
                            ))}
                        </div>
                        <div className="questions__item">
                            <div className="questions__topic">{hard[0]?.category.title}</div>
                            {hard.map((item) => (
                                <div className="questions__ball" key={item.id}>
                                    {item.value}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Input value={'ds'} change={() => {}} id="answers" name="answers" type="text" />
                    <div className="count">
                        <p className="count__value">
                            Счет: <strong>{ball}</strong>
                        </p>
                        <Button value="Завершить игру" click={() => {}} />
                    </div>
                </>
            )}
        </>
    );
};

export default GamePage;
