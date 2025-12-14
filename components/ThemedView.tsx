import { useColorScheme, View, ViewStyle } from "react-native";
import ColorTheme from "../Colors";

interface ThemedView {
    style?: ViewStyle,
    children?: React.ReactNode | undefined;
}

export default function ThemedView(props: ThemedView) {
    const Colors = ColorTheme[useColorScheme() ?? 'light'];

    return (
        <View
            style={[{
                borderColor: Colors.primary,
                backgroundColor: Colors.primary,
            }, props.style]}
        >
            {props.children}
        </View>
    );
}
