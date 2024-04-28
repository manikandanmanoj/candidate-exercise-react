// https://mui.com/material-ui/customization/theming/
import { ThemeOptions, Theme } from "@mui/material/styles";

export interface ExtendsThemeOptions {
  fonts?: {
    latonormal: string;
  };
  global?: {
    red:string;
    blue:string;
    green:string;
    grey:string;
    textGrey:string;
  };
}
export type MixThemeOptions = ExtendsThemeOptions & ThemeOptions;

export type MixTheme = ExtendsThemeOptions & Theme;
