import React, { useState, createContext, useEffect, useContext } from 'react';
import { faker } from '@faker-js/faker';
import { useClient } from 'react-supabase';

const TyperContext = createContext<any>({});

export const useTyper = () => useContext(TyperContext);
export const TyperProvider = ({ children }: { children: React.ReactNode }) => {
    const [time, setTime] = useState<number>(90);
    const [wpm, setWpm] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [words, setWords] = useState<number>(0);
    const [grossWords, setGrossWords] = useState<number>(0);
    const [started, setStarted] = useState<boolean>(false);
    const [sentence, setSentence] = useState<string[]>([]);
    const client = useClient();

    const sentServer = async () => {
        const { error } = await client.from('typing_data').insert([
            {
                user_id: client.auth.user().id,
                wpm,
                accuracy,
            },
        ]);
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        if (error) throw error;
    };
    useEffect(() => {
        setSentence(faker.random.words(40).split(' '));
    }, []);

    useEffect(() => {
        const temp = words / ((90 - time) / 60);
        setWpm(Math.round(temp) || 0);
        const gwpm = grossWords / ((90 - time) / 60);
        setAccuracy(Math.round((temp / gwpm) * 100) || 0);
    }, [words, time, grossWords]);

    useEffect(() => {
        if (started) {
            const interval = setInterval(() => {
                if (time > 0) {
                    setTime(time - 1);
                }
                if (time === 0) {
                    clearInterval(interval);
                    sentServer();
                }
            }, 1000);
            return () => clearInterval(interval);
        }
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [started, time]);

    return (
        <TyperContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                time,
                wpm,
                accuracy,
                started,
                sentence,
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
