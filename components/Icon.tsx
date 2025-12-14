import { useColorScheme } from "react-native";
import ColorTheme from "../Colors"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Props {
    icon: IconDefinition;
    color?: string,
    size?: number
}

export default function Icon(props: Props) {
    const ColorScheme = ColorTheme[useColorScheme() ?? 'light'];
    return (
        <FontAwesomeIcon
            icon={props.icon}
            color={props.color ?? ColorScheme.text}
            size={props.size}
        />
    )
}

