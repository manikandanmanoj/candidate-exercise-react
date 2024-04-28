import React from 'react';
import { Typography,Drawer, IconButton } from '@mui/material';
import Row from './Row';
import Column from './Column';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useStyle } from "../styles";
import { makeStyles } from "./styles";

const drawerWidth = 320;
interface RightDrawlerProps{
    open:boolean;
    setOpen:any;
    children:React.ReactNode;
    title:string;
    anchor?:"left" | "right" | "top" | "bottom",
    window?: () => Window;
}

const CustomDrawler = ({ anchor="right",open,setOpen,children,title,window }:RightDrawlerProps) => {
    const container =
  window !== undefined ? () => window().document.body : undefined;
  const { styles } = useStyle(makeStyles);
  return (
    <div>
    <Drawer
    anchor={anchor}
    container={container}
    variant="temporary"
    open={open}
    onClose={()=>setOpen(false)}
    ModalProps={{
      keepMounted: true // Better open performance on mobile.
    }}
    sx={{            
      display: { xs: 'block', sm: 'block' },
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: drawerWidth
      }
    }}
  >
    <Row>
        <Column md={12}>
            <Row padding={[5]}>
                <IconButton sx={styles.iconCss} onClick={()=>setOpen(false)}>
                <ChevronLeftIcon />
                </IconButton>
                <Typography mt={0.5} ml={1} variant='h6' component={'h6'} >{ title }</Typography>
            </Row>
        </Column>
        <Column md={12} padding={[5,5,5,10]}>
        { children }
        </Column>
    </Row>  
  </Drawer>
  </div>
  );
};

export default CustomDrawler;