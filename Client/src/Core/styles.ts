import { MixTheme, StyledObject, Style } from '../styles';

export interface CompoundStyles extends StyledObject {   
    iconCss:Style;
}

export const makeStyles = (theme: MixTheme) => {
    return {
       iconCss:{
            backgroundColor:theme.global?.blue,
            borderRadius:'20px',
            color:'white',
            '&:hover': {
                background: theme?.global?.blue,
                color:'white',
            }
       }
    } as CompoundStyles;
};