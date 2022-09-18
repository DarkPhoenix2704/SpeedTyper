import React, { useState, createContext, useEffect, useContext } from 'react';

const TyperContext = createContext<any>({});

export const useTyper = () => useContext(TyperContext);
export const TyperProvider = ({ children }: { children: React.ReactNode }) => {
    const [time, setTime] = useState(90);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [words, setWords] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const temp = words / (time / 60);
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
            value={{ time, wpm, accuracy, setTime, setWords, setAccuracy, setStarted }}
        >
            {children}
        </TyperContext.Provider>
    );
};
