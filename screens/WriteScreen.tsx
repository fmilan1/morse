import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import { useEffect, useRef, useState } from 'react';
import Signal, { SignalProps, SignalType } from '../components/Signal';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons/faDeleteLeft';
import { faCirclePlay, faPlaneArrival, faQuestion, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getCharFromMorseCode } from '../bintree';
import { useNavigation } from '@react-navigation/native';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import Icon from '../components/Icon';
import PlayButton from '../components/PlayButton';
import ColorTheme from '../Colors';
export const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function WriteScreen() {
    const [letterSignals, setLetterSignals] = useState<SignalProps[]>([]);
    const [letters, setLetters] = useState<string[][]>([]);
    const [words, setWords] = useState<string[][][]>([]);
    const wordsRef = useRef<string[][][]>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const navigation = useNavigation();


    async function playSound() {
    }

    async function stopSound() {
    }

    useEffect(() => {
        async function configureAudio() {
        }
        configureAudio();
    }, []);


    useEffect(() => {
        if (letterSignals.length == 0) return;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setLetters([...letters, letterSignals.map(l => l.type == SignalType.dot ? '.' : '-')]);
            setLetterSignals([]);
        }, 150);
    }, [letterSignals]);

    useEffect(() => {
        if (letters.length == 0) return;
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setWords([...words, letters]);
            setLetters([]);
        }, 300);
    }, [letters]);

    useEffect(() => {
        wordsRef.current = words;
    }, [words]);

    function deleteLastWord() {
        setWords(wordsRef.current.splice(0, wordsRef.current.length - 1));
    }

    useEffect(() => {
        if (Platform.OS == 'web') {
            document.addEventListener('keydown', (e) => {
                if (e.key == 'Backspace') {
                    deleteLastWord();
                }
            });
        }

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Help')}
                >
                    <ThemedView
                        style={{
                            width: 30,
                            aspectRatio: 1,
                            borderRadius: 7,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: Platform.OS == 'web' ? 15 : 0,
                        }}
                    >
                        <Icon
                            icon={faQuestion}
                        />
                    </ThemedView>
                </TouchableOpacity>
            )
        })

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);


    return (
        <>
            <View style={styles.container}>
                <ThemedView
                    style={{
                        width: '100%',
                        minHeight: 125,
                        borderRadius: 7,
                        paddingTop: 10,
                        paddingInline: 10,
                        columnGap: 45,
                        rowGap: 10,
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                    }}
                >
                    <PlayButton
                        style={{
                            position: 'absolute',
                            right: 0,
                            margin: 10,
                            zIndex: 1,
                        }}
                        words={words}
                    />
                    {words.map((words, index1) => (
                        <View
                            key={index1}
                            style={{
                                flexDirection: 'row',
                                gap: 15,
                            }}
                        >
                            {words.map((letters, index2) => (
                                <View
                                    key={index2}
                                    style={{
                                        flexDirection: 'row',
                                        gap: 5,
                                    }}
                                >
                                    {letters.map((letter, index3) => (
                                        <Signal
                                            key={index3}
                                            type={letter == '.' ? SignalType.dot : SignalType.line}
                                        />
                                    ))}

                                </View>
                            ))}
                        </View>
                    ))}
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 15,
                        }}
                    >
                        {letters.length != 0 &&

                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 15,
                                }}
                            >
                                {letters.map((letter, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            flexDirection: 'row',
                                            gap: 5,
                                        }}
                                    >
                                        {letter.map((signal, index2) => (
                                            <Signal key={index2} type={signal == '.' ? SignalType.dot : SignalType.line} />
                                        ))}
                                    </View>
                                ))}
                            </View>
                        }
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 5,
                            }}
                        >
                            {letterSignals.map((l, index) => (
                                <Signal
                                    key={index}
                                    type={l.type}
                                />
                            ))}
                        </View>
                    </View>
                </ThemedView>
                <ThemedView
                    style={{
                        width: '100%',
                        minHeight: 125,
                        borderRadius: 7,
                        paddingTop: 10,
                        paddingInline: 10,
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        gap: 10,
                    }}
                >
                    {words.map((word, index1) => (
                        <ThemedText
                            key={index1}
                            style={{
                                fontWeight: 'bold'
                            }}
                        >
                            {word.map((letters, _index2) => getCharFromMorseCode(letters.join('')))}
                        </ThemedText>
                    ))}
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        {letters.length > 0 &&
                            <ThemedText
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {letters.map((letter, _index) =>
                                    getCharFromMorseCode(letter.join(''))
                                )}
                            </ThemedText>
                        }
                        {letterSignals.length > 0 &&
                            <ThemedText
                                style={{
                                    fontWeight: 'bold',
                                    color: ColorTheme.yellow,
                                }}
                            >
                                {getCharFromMorseCode(letterSignals.map(ls => ls.type == SignalType.dot ? '.' : '-').join(''))}
                            </ThemedText>
                        }
                    </View>
                </ThemedView>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20,
                        marginTop: 'auto',
                    }}
                >
                    <TouchableOpacity
                        onPressIn={() => {
                            setWords([]);
                        }}
                    >
                        <ThemedView
                            style={{
                                width: 50,
                                aspectRatio: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                            }}
                        >
                            <Icon
                                icon={faXmark}
                                size={25}
                            />
                        </ThemedView>
                    </TouchableOpacity>
                    <Button
                        onPressIn={() => {
                            if (timerRef.current) {
                                clearTimeout(timerRef.current);
                            }
                            playSound();
                        }}
                        onPressOut={(signalType) => {
                            setLetterSignals(prev => {
                                let tmp = [...prev];
                                tmp.push({ type: signalType });
                                return tmp;
                            });
                            stopSound();
                        }}
                    />
                    <TouchableOpacity
                        onPressIn={deleteLastWord}
                    >
                        <ThemedView
                            style={{
                                width: 50,
                                aspectRatio: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                            }}
                        >
                            <Icon
                                icon={faDeleteLeft}
                                size={30}
                            />
                        </ThemedView>
                    </TouchableOpacity>
                </View>
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 10,
        paddingBottom: 100,
        flex: 1,
        gap: 5,
        alignItems: 'center',
    },
});
