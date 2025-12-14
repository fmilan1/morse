import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Modal {
    shown: boolean,
    children?: ReactElement
    bgColor?: string,
    onClose: () => void,
}

export default function Modal(props: Modal) {
    if (!props.shown) return;
    return (
        <View
            style={[styles.container, {
                backgroundColor: props.bgColor || 'white',
            }]}
        >
            {props.children}
            <TouchableOpacity
                style={[styles.button, {
                    position: 'absolute',
                    right: 20,
                    top: 50,
                }]}
                onPressIn={props.onClose}
            >
                <FontAwesomeIcon
                    icon={faXmark}
                    color={props.bgColor || 'black'}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingBlock: 50,
        paddingInline: 10,
    },
    button: {
        width: 30,
        aspectRatio: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
})
