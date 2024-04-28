import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { MixTheme } from './ThemeOption';

export interface UseStyleProps<Type> {
    theme: MixTheme,
    styles: Type
}

export type StyledObject = any;
export type Style = any;

// eslint-disable-next-line no-unused-vars
export const useStyle = <Type extends StyledObject>(makeStyles: (theme:MixTheme) => Type) => {
    const theme = useTheme<MixTheme>();
   
    const style = useMemo(() => {
        const styles = makeStyles(theme);
        return { theme, styles } as UseStyleProps<Type>;
    }, [makeStyles, theme]);
    
    return style;
};
