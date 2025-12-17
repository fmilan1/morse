import { ScrollView, View } from "react-native";
import { bintree, getMorseCodeFromChar } from "../bintree";
import Signal, { SignalType } from "../components/Signal";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import PlayButton from "../components/PlayButton";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function HelpScreen() {
    return (
        <ScrollView
            style={{
                margin: 'auto',
            }}
        >
            <View
                style={{
                    gap: 5,
                    borderRadius: 10,
                    overflow: 'hidden',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    maxWidth: 1000,
                    margin: 10,
                }}
            >
                {alphabet.map((l, index) => (
                    <ThemedView
                        key={index}
                        style={{
                            paddingInline: 10,
                            height: 50,
                            alignItems: 'center',
                            gap: 15,
                            flexDirection: 'row',
                            width: 180,
                            flexGrow: 1,
                        }}
                    >
                        <ThemedText
                            style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                width: 37,
                            }}
                        >{l}:</ThemedText>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 5,
                            }}
                        >
                            {getMorseCodeFromChar(bintree, l, [])?.map((signal, index) => (
                                <Signal key={index} type={signal == '.' ? SignalType.dot : SignalType.line} />
                            ))}
                        </View>
                        <PlayButton
                            style={{
                                marginLeft: 'auto',
                            }}
                            words={[[getMorseCodeFromChar(bintree, l, []) ?? ['']]]}
                        />
                    </ThemedView>
                ))}
            </View>
        </ScrollView>
    )
}

