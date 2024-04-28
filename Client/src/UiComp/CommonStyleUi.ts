import { MixTheme, StyledObject, Style } from '../styles';

export interface CommonStyle extends StyledObject {
    rowSignin:Style;
    loginButton:Style;
    leftSignText:Style;
    taskAddCss:Style;
    saveButton:Style;
    cardCsstask:Style;
    todoCss:Style;
    DoneCss:Style;
    progressCss:Style;
    todoIconCss:Style;
    progressIconCss:Style;
    iconText:Style;
    backgrounCol:Style;
    infoButtonCss:Style;
    logintext:Style;
    logoutCss:Style;
}

export const makeStyles = (theme: MixTheme) => {
    return {
          rowSignin:{
            minHeight:'100vh'
          },
          loginButton:{
            backgroundColor:theme.global?.blue,
            marginTop:'20px',
            '&:hover': {
                background: theme?.global?.blue
            }
          },
          spanStyle:{
            color:theme.global?.blue,
            cursor:'pointer'
          },
          leftSignText:{
            fontSize:'70px',
            fontWeight:700,
            color:'#E60E4B'
          },
          taskAddCss:{
            backgroundColor:'#E60E4B',
            height:'30px',
            marginTop:'20px',
            '&:hover': {
                background:'#E60E4B'
            }
          },
          saveButton:{
            backgroundColor:theme.global?.red,
            marginTop:'20px',
            '&:hover': {
                background: theme?.global?.red
            }
          },
          cardCsstask:{
            backgroundColor:'#e5dfdf'
          },
          todoCss:{
            backgroundColor:theme.global?.textGrey,
            color:'black',
            fontWeight:700,
            padding:'9px',
            borderRadius:'10px'
          },
          progressCss:{
            backgroundColor:theme.global?.blue,
            color:'white',
            fontWeight:700,
            padding:'9px',
            borderRadius:'10px'
          },
          DoneCss:{
            backgroundColor:theme.global?.green,
            color:'white',
            fontWeight:700,
            padding:'9px',
            borderRadius:'10px'
          },
          todoIconCss:{
            color:'black',
            backgroundColor:theme.global?.textGrey,
            padding:'3px',
            borderRadius:'10px',
            marginTop:'3px',
            fontSize:'15px'
          },
          progressIconCss:{
            backgroundColor:theme.global?.blue,
            color:'white',
            padding:'3px',
            borderRadius:'10px',
            marginTop:'3px',
            fontSize:'15px'
          },
          DoneIconCss:{
            backgroundColor:theme.global?.green,
            color:'white',
            padding:'3px',
            borderRadius:'10px',
            marginTop:'3px',
            fontSize:'15px'
          },
          iconText:{
            position:'relative',
            top:'-5px'
          },
          backgrounCol:{
            backgroundColor:theme.global?.blue,
            height:'60px',
            borderRadius:'10px'
          },
          infoButtonCss:{
            position:'absolute',
            bottom:'-16px',
            backgroundColor:'white',
            color:theme.global?.blue
          },
          logintext:{
            backgroundColor:theme.global?.blue,
            borderRadius:'30px',
            color:'white',
            padding:'10px 10px'
          },
          logoutCss:{
            color:theme.global?.blue,
            position:'relative',
            top:'1px',
            marginLeft:'10px',
          }
    } as CommonStyle;
};
