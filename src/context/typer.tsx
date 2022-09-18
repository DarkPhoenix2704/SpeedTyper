import React, { useState, createContext, useEffect, useContext } from 'react';

const TyperContext = createContext<any>({});

export const useTyper = () => useContext(TyperContext);
export const TyperProvider = ({ children }: { children: React.ReactNode }) => {
    const [time, setTime] = useState<number>(90);
    const [wpm, setWpm] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [words, setWords] = useState<number>(0);
    const [grossWords, setGrossWords] = useState<number>(0);
    const [started, setStarted] = useState<boolean>(false);

    useEffect(() => {
        const temp = words / ((90 - time) / 60);
        setWpm(Math.round(temp) || 0);
        const gwpm = grossWords / ((90 - time) / 60);
        setAccuracy(Math.round((temp / gwpm) * 100) || 100);
    }, [words, time, grossWords]);

    useEffect(() => {
        if (started) {
            const interval = setInterval(() => {
                if (time > 0) {
                    setTime(time - 1);
                }
                if (time === 0) {
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
        return () => {};
    }, [started, time]);

    return (
        <TyperContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                time,
                wpm,
                accuracy,
                started,
                setTime,
                setWords,
                setAccuracy,
                setStarted,
                setGrossWords,
            }}
        >
            {children}
        </TyperContext.Provider>
    );
};
