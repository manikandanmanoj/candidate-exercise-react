import React from 'react';
import { CircularProgress } from '@mui/material';

interface loaderProps{
    size?:string | number;
    color?:string;
    [props: string]: any;
}

const Loader = ({ size,color,...props }:loaderProps) => {
    return <CircularProgress style={{ height:size,width:size,color:color }} {...props}/>;
};

export default Loader;