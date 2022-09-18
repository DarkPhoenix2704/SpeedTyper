import React, { useState, createContext, useEffect, useContext } from 'react';

const TyperContext = createContext<any>({});

export const useTyper = () => useContext(TyperContext);
export const TyperProvider = ({ children }: { children: React.ReactNode }) => {
    const [time, setTime] = useState<number>(90);
    const [wpm, setWpm] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [words, setWords] = useState<number>(0);
    const [started, setStarted] = useState<boolean>(false);

    useEffect(() => {
        const temp = words / ((90 - time) / 60);
        setWpm(temp);
    }, [words, time]);

    useEffect(() => {
        if (started) {
            const interval = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        return () => {};
    }, [started]);

    return (
        <TyperContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{ time, wpm, accuracy, started, setTime, setWords, setAccuracy, setStarted }}
        >
            {children}
        </TyperContext.Provider>
    );
};
