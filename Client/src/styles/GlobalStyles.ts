import { GlobalStylesProps } from '@mui/material';
import { theme } from './Theme';

export const styles: GlobalStylesProps['styles'] = {
    'html, body': {
      fontFamily: 'Lato',
      minHeight: '100vh',
      margin: 0    
    },
  
    body: {
      fontFamily: 'Lato',
      overflowY: 'scroll',
      background:theme.global?.grey,
      // position:'relative'
    },
    // '.token-modal .MuiDialog-paper':{
    //   width: '80%',
    //   maxWidth: '80%'
    // }
  };