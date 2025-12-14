const Colors = {
    dark: '#2B303A',
    light: '#ffffff',
    watermelon: '#EF2D56',
    yellow: '#FAF33E',
    slateBlue: '#5D737E',
    mutedTeal: '#7FC6A4',
    frostedMint: '#D6F8D6',
    lightGrey: 'rgb(200, 200, 200)',
    darkGrey: 'rgb(100, 100, 100)',
    bronze: '#DDA88B',
    lightCoral: '#DD8B8B',
    cottonRose: '#FFCCCC',
    platinum: '#ECECEC',
    pink: '#FF686B',
    aquamarine: '#A5FFD6',
    babyPink: '#FFA69E',
}

const ColorTheme = {
    ...Colors,
    light: {
        bg: Colors.light,
        text: '#9AA6B2',
        primary: '#D9EAFD',
    },
    dark: {
        bg: Colors.dark,
        text: Colors.aquamarine,
        primary: Colors.slateBlue,
    },
}

export default ColorTheme;
