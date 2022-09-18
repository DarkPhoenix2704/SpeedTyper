import { HStack, VStack, Box, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import NavBar from '../../components/NavBar';
import dart from '../../../assets/icons/dart.png';
import timer from '../../../assets/icons/timer.png';
import words from '../../../assets/icons/words.png';
import Word from '../../components/Word';
import { useTyper } from '../../context/typer';

const Home = () => {
    const { time, wpm, accuracy, started, setWords, setStarted, setGrossWords } = useTyper();
    const [string, setString] = useState('');
    const sentence = [
        'In',
        'linguistics',
        'and',
        'grammar,',
        'a',
        'sentence',
        'is',
        'a',
        'linguistic',
        'expression,',
        'such',
        'as',
        'the',
        'English',
        'example',
        '/"The',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'dog./"',
        'In',
        'traditional',
        'grammar,',
        'it',
        'is',
        'typically',
        'defined',
        'as',
        'a',
        'string',
        'of',
    ];
    useEffect(() => {
        const wordsSe = string.split(' ');
        let score = 0;
        setGrossWords(wordsSe.length);
        wordsSe.forEach((word, index) => {
            if (word === sentence[index]) {
                score += 1;
            }
        });
        setWords(score);
        if (wordsSe.length === sentence.length) setStarted(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [string]);
    return (
        <VStack width="100vw" bg="#141414">
            <NavBar />
            <HStack spacing="32px">
                <Card image={dart} heading="Accuracy" content={`${accuracy}%`} />
                <Card image={timer} heading="Timer" content={`${time}`} />
                <Card image={words} heading="Words/min" content={`${wpm}`} />
            </HStack>
            <Box>
                <HStack
                    borderRadius="8px"
                    paddingBlock="16px"
                    justifyContent="center"
                    backgroundColor="#282828"
                    wrap="wrap"
                    marginInline="36px"
                    spacing="8px"
                >
                    {sentence.map((word, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Word content={word} key={index} />
                    ))}
                </HStack>
            </Box>
            <Box>
                <Textarea
                    borderRadius="8px"
                    paddingBlock="16px"
                    justifyContent="center"
                    width="1250px"
                    backgroundColor="#282828"
                    border="0px"
                    textColor="#fff"
                    fontSize="24px"
                    height="250px"
                    disabled={time <= 0}
                    placeholder="Type here..."
                    _placeholder={{ textColor: '#D9D9D9' }}
                    onChange={(e: any) => {
                        setString(e.target.value);
                        if (!started) {
                            setStarted(true);
                        }
                    }}
                    onFocus={() => {
                        if (!started) setStarted(true);
                    }}
                />
            </Box>
        </VStack>
    );
};

export default Home;
