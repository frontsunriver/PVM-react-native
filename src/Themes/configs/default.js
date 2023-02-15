import {DefaultTheme} from 'react-native-paper';
import colors from '../Colors';

const theme = {
  ...DefaultTheme,
  id: 1,
  dark: false,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    accent: '#0e39d1',
    background: colors.issabeline,
    mainBackground: '#e7e9f5',
    text: colors.panegrey,
    placeholder: colors.ashgrey,
    header: '#5c80bc',
    headerTitle: colors.white,
    surface: colors.white,
    primaryText: '#fff',
    buttonColor: '#0d39d1',
    buttonSecondary: '#00c851'
  },
};

export default theme;
