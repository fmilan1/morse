import { ReactNode, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SignalType } from './Signal';
import ColorTheme from '../Colors';

interface Button {
    onPressIn?: () => void;
    onPressOut?: (signalType: SignalType) => void;
    children?: ReactNode | undefined;
}
export default function Button(props: Button) {
    const pressedDateRef = useRef<number>(0);
    const [isPressed, setIsPressed] = useState(false);

    function buttonPressIn() {
        pressedDateRef.current = Date.now();
        if (props.onPressIn) {
            props.onPressIn();
        }
        setIsPressed(true);
    }

    function buttonPressOut() {
        let duration = Date.now() - pressedDateRef.current;
        if (props.onPressOut) {
            props.onPressOut(duration > 150 ? SignalType.line : SignalType.dot);
        }
        pressedDateRef.current = 0;
        setIsPressed(false);
    }

    useEffect(() => {
        if (Platform.OS == 'web') {
            document.addEventListener('keydown', (e) => {
                if (e.key == ' ' && !e.repeat) {
                    buttonPressIn();
                }
            });
            document.addEventListener('keyup', (e) => {
                if (e.key == ' ') {
                    buttonPressOut();
                }
            });
        }
    }, []);


    return (
        <TouchableOpacity
            style={[styles.container, isPressed ? styles.pressed : '']}
            onPressIn={buttonPressIn}
            onPressOut={buttonPressOut}
            activeOpacity={1}
        >{props.children}</TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorTheme.babyPink,
        height: 150,
        aspectRatio: 1,
        borderRadius: '50%',
    },
    pressed: {
        backgroundColor: ColorTheme.watermelon,
        transform: 'scale(0.95)',
    }
});
