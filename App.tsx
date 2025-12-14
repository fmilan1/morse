import { createStaticNavigation, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WriteScreen from './screens/WriteScreen';
import HomeScreen from './screens/HomeScreen';
import HelpScreen from './screens/HelpScreen';
import { useColorScheme } from 'react-native';
import ColorTheme from './Colors';
import { StatusBar } from 'expo-status-bar';
import SettingsScreen from './screens/SettingsScreen';

const linking = {
    enabled: 'auto',
};

const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerTitleStyle: {
            fontSize: 25,
        },
        headerTitleAlign: 'center',
        headerBackTitle: 'Back',
    },
    initialRouteName: 'Home',
    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                title: 'Welcome',
            },
        },
        Write: {
            screen: WriteScreen,
            options: {
                title: 'Playground',
            },
            linking: {
                path: 'playground'
            }
        },
        Help: HelpScreen,
        Settings: SettingsScreen,
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    const scheme = useColorScheme();
    const Colors = ColorTheme[scheme ?? 'light'];
    return (
        <>
            <StatusBar style='auto' />
            <Navigation
                linking={linking}
                theme={{
                    ...DefaultTheme,
                    colors: {
                        ...DefaultTheme.colors,
                        background: Colors.bg,
                        primary: Colors.text,
                        text: Colors.text,
                        card: Colors.bg,
                    },
                }}
            />
        </>
    )
}
