import { Theme } from '@react-navigation/native';

const fontStyle = {
  fontFamily: 'System',
  fontWeight: 'normal' as 'normal',
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#007aff',
    background: '#ffffff',
    card: '#f0f0f0',
    text: '#000000',
    border: '#cccccc',
    notification: '#ff453a',
  },
  fonts: {
    regular: fontStyle,
    medium: { ...fontStyle, fontWeight: '500' },
    bold: { ...fontStyle, fontWeight: '700' },
    heavy: { ...fontStyle, fontWeight: '800' },
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#0a84ff',
    background: '#000000',
    card: '#1c1c1e',
    text: '#ffffff',
    border: '#333333',
    notification: '#ff453a',
  },
  fonts: {
    regular: fontStyle,
    medium: { ...fontStyle, fontWeight: '500' },
    bold: { ...fontStyle, fontWeight: '700' },
    heavy: { ...fontStyle, fontWeight: '800' },
  },
};
