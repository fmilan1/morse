import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";

export default function HomeScreen() {
    const navigation = useNavigation();

    const buttons = [
        { text: 'playground', onPress: () => navigation.navigate('Write') },
        { text: 'learn', onPress: () => alert('Not available!') },
        { text: 'settings', onPress: () => navigation.navigate('Settings') },
    ];

    function customBtn(text?: string, onPress?: () => void) {
        return (
            <TouchableOpacity
                key={text}
                style={{
                    width: '100%',
                }}
                onPress={onPress}
            >
                <ThemedView
                    style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 'auto',
                        backgroundColor: 'transparent',
                        borderWidth: 5,
                    }}
                >
                    <ThemedText
                        style={{
                            fontWeight: 900,
                            fontSize: 30,
                        }}
                    >{text?.toUpperCase()}</ThemedText>
                </ThemedView>
            </TouchableOpacity>
        );
    }

    return (
        <View
            style={{
                gap: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: 500,
                width: '100%',
                marginTop: 10,
                marginInline: 'auto',
                paddingInline: 10,
            }}
        >
            {buttons.map((btn, _index) => (
                customBtn(btn.text, btn.onPress)
            ))}
        </View>
    );
}
