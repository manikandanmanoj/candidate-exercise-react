import React from 'react';
import { StorageService } from '../../Storeprovider/SessionStorage';
import { Navigate, Outlet } from 'react-router-dom';
import { Card, CustomTextFiled,Column,Row } from '../../Core';
import { useStore } from '../../Storeprovider/store';
import { useStyle } from "../../styles";
import { makeStyles } from "../CommonStyleUi";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, IconButton } from '@mui/material';

const HomeLayout = () => {
    const {setSearchfilter,searchfilter,setOpendrawler,opendrawler,sessionOut}=useStore()
    const user = StorageService.auth.getValue();
    const { styles } = useStyle(makeStyles);

    if (!user) {
        return <Navigate to="/" />;
      }

    return (
        <div>  
            <Card padding={[10]}>
                <Row>
                    <Column md={4} center>
                        <CustomTextFiled
                        placeholder='Search task'
                        value={searchfilter}
                        onChange={(e:any)=>setSearchfilter(e.target.value)}
                        />
                    </Column>
                    <Column md={8} right>
                        <div style={{display:'flex'}}>
                        <p style={styles.logintext}>{JSON.parse(StorageService.auth.getValue() || '').username.charAt(0).toUpperCase()}</p>
                        <IconButton onClick={sessionOut} sx={styles.logoutCss}>
                        <LogoutIcon />
                        </IconButton>
                        <Button onClick={()=>setOpendrawler(!opendrawler)} variant='contained' sx={styles.taskAddCss}>Add Task</Button>
                        </div>
                    </Column>
                </Row>
            </Card> 
            <Outlet />
        </div>
    );
};

export default HomeLayout;