import { TouchableOpacity, ViewStyle } from "react-native";
import Icon from "./Icon";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { delay } from "../screens/WriteScreen";

interface Prop {
    style?: ViewStyle;
    onPress?: () => void;
    words: string[][][];
}

export default function PlayButton(props: Prop) {

    function playAudio() {
    }

    function stopAudio() {
    }

    return (
        <TouchableOpacity
            style={props.style}
            onPress={
                async function() {
                    for (let k = 0; k < props.words.length; k++) {
                        for (let j = 0; j < props.words[k].length; j++) {
                            for (let i = 0; i < props.words[k][j].length; i++) {
                                playAudio();
                                await delay(props.words[k][j][i] == '.' ? 100 : 300);
                                stopAudio();
                                await delay(50);
                            }
                            await delay(300);
                        }
                        await delay(500);
                    }
                }
            }
        >
            <Icon
                icon={faCirclePlay}
                size={30}
            />
        </TouchableOpacity>
    )
}

