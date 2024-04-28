import { createTheme } from '@mui/material/styles';
import { MixThemeOptions ,MixTheme } from './ThemeOption';

export const theme:MixTheme = createTheme({ 
    typography: {
      fontFamily: 'Lato',
      button: {
        textTransform: 'none'
      }
    },
    fonts:{
     latonormal:'Lato',
    },
    global: {
      red:'#FF0000',  
      blue:'#0A66C2',
      green:'#2fa069',
      grey:'#faf6f6',
      textGrey:'#a4aba7'
  }
  } as MixThemeOptions);