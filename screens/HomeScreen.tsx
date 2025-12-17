import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";
import { ReactNode } from "react";
import Icon from "../components/Icon";
import { faChildReaching, faGear, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

interface CustomProp {
    text?: string;
    children?: ReactNode | undefined;
    onPress?: () => void;
    disabled?: boolean;
}

function CustomBtn(props: CustomProp) {
    return (
        <TouchableOpacity
            disabled={props.disabled}
            key={props.text}
            style={{
                width: '100%',
                opacity: props.disabled ? 0.2 : 1,
            }}
            onPress={props.onPress}
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
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                {props.children}
                <ThemedText
                    style={{
                        fontSize: 30,
                        fontWeight: 900,
                        textTransform: 'uppercase',
                    }}
                >{props.text}</ThemedText>
            </ThemedView>
        </TouchableOpacity>
    );
}

export default function HomeScreen() {
    const navigation = useNavigation();


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
            <CustomBtn
                onPress={() => navigation.navigate('Write')}
                text='playground'
            >
                <Icon
                    icon={faChildReaching}
                    size={30}
                />
            </CustomBtn>
            <CustomBtn
                text='learn'
                disabled
            >
                <Icon
                    icon={faGraduationCap}
                    size={30}
                />
            </CustomBtn>
            <CustomBtn
                disabled
                text='settings'
                onPress={() => navigation.navigate('Settings')}
            >
                <Icon
                    icon={faGear}
                    size={30}
                />
            </CustomBtn>
        </View>
    );
}
