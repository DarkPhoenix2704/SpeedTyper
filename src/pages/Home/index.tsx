import { HStack, VStack, Box, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import NavBar from '../../components/NavBar';
import dart from '../../../assets/icons/dart.png';
import timer from '../../../assets/icons/timer.png';
import words from '../../../assets/icons/words.png';
import Word from '../../components/Word';
import { useTyper } from '../../context/typer';
import WelcomeModal from '../../modal/Welcome';
import { Layout } from '../../layout';

const Home = () => {
    const {
        time,
        wpm,
        accuracy,
        started,
        setWords,
        setStarted,
        setGrossWords,
        sentence,
        setActiveIndex,
        setCorrectIndex,
        setWrongIndex,
    } = useTyper();
    const [string, setString] = useState('');
    const {
        isOpen: isOpenWelcomeModal,
        onOpen: onOpenWelcomeModal,
        onClose: onCloseWelcomeModal,
    } = useDisclosure();
    useEffect(() => {
        let score = 0;
        const correctIndex: number[] = [];
        const wrongIndex: number[] = [];
        const wordsSe = string.split(' ');
        setGrossWords(wordsSe.length);
        wordsSe.forEach((word, index) => {
            if (word === sentence[index]) {
                score += 1;
                correctIndex.push(index);
            } else {
                wrongIndex.push(index);
            }
        });
        setCorrectIndex(correctIndex);
        setWrongIndex(wrongIndex);
        setActiveIndex(wordsSe.length - 1);
        setWords(score);
        if (wordsSe.length === sentence.length) setStarted(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [string]);
    useEffect(() => {
        onOpenWelcomeModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Layout>
            <WelcomeModal isOpen={isOpenWelcomeModal} onClose={onCloseWelcomeModal} />
            <VStack bg="#141414">
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
                        {sentence.map((word: string, index: number) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Word content={word} key={index} index={index} />
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
        </Layout>
    );
};

export default Home;
