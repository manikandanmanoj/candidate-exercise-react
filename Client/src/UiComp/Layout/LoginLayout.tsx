import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import  {ROUTES}  from '../../routes';
import { StorageService } from '../../Storeprovider/SessionStorage';

const LoginLayout = () => {
    const user: any = StorageService.auth.getValue(); 

    if (user) {
        return <Navigate to={ ROUTES.DASHBOARD } />;
    }

    return (
        <div>             
            <Outlet />
        </div>
    );
};

export default LoginLayout;