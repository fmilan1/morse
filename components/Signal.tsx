import { StyleSheet, useColorScheme, Text as View } from "react-native";
import ColorTheme from "../Colors";

export enum SignalType {
    dot,
    line,
}

export interface SignalProps {
    type: SignalType
}

export default function Signal(props: SignalProps) {
    return (
        <View
            style={[styles.container, {
                width: props.type == SignalType.dot ? 5 : 15,
                backgroundColor: ColorTheme.babyPink,
            }]}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        height: 5,
        borderRadius: 10,
    }
})

