import { Text, TextStyle, useColorScheme } from "react-native";
import ColorTheme from "../Colors";

interface ThemedText {
    style?: TextStyle,
    children?: React.ReactNode | undefined;
}

export default function ThemedText(props: ThemedText) {
    const Colors = ColorTheme[useColorScheme() ?? 'light'];

    return (
        <Text
            style={[{
                color: Colors.text,
            }, props.style]}
        >
            {props.children}
        </Text>
    );
}
