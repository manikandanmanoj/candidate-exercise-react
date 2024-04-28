import React from 'react';
import Grid from '@mui/material/Grid';
import { styleConcat } from './ComponentHelper';

interface ColumnProps{
    middle?:boolean; 
    left?:boolean;
    right?:boolean;
    top?:boolean;
    bottom?:boolean;
    center?:boolean;
    style?:any;
    sx?:any;
    padding?:number[];
    margin?:number[];
    color?:string;
    children:React.ReactNode;
    [props:string]: any;
}

const Column=({ middle, left, right, top, bottom, center, style, padding, margin, color, children,...props }:ColumnProps)=>{

    function handleMargins() { 
        if (typeof margin === 'number') {
            return {
                marginTop: margin,
                marginRight: margin,
                marginBottom: margin,
                marginLeft: margin
            };
        }

        if (typeof margin === 'object') {
            const marginSize = Object.keys(margin).length;
            switch (marginSize) {
                case 1:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[0],
                        marginBottom: margin[0],
                        marginLeft: margin[0]
                    };
                case 2:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[1],
                        marginBottom: margin[0],
                        marginLeft: margin[1]
                    };
                case 3:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[1],
                        marginBottom: margin[2],
                        marginLeft: margin[1]
                    };
                default:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[1],
                        marginBottom: margin[2],
                        marginLeft: margin[3]
                    };
            }
        }
    }

    function handlePaddings() {
        
        if (typeof padding === 'number') {
            return {
                paddingTop: padding,
                paddingRight: padding,
                paddingBottom: padding,
                paddingLeft: padding
            };
        }

        if (typeof padding === 'object') {
            const paddingSize = Object.keys(padding).length;
            switch (paddingSize) {
                case 1:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[0],
                        paddingBottom: padding[0],
                        paddingLeft: padding[0]
                    };
                case 2:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[1],
                        paddingBottom: padding[0],
                        paddingLeft: padding[1]
                    };
                case 3:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[1],
                        paddingBottom: padding[2],
                        paddingLeft: padding[1]
                    };
                default:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[1],
                        paddingBottom: padding[2],
                        paddingLeft: padding[3]
                    };
            }
        }
    }


    // justify  flex-start center flex-end space-between space-around space-evenly
    // alignItems flex-start center flex-end stretch baseline 
    const defaultStyle = [
        middle ? { alignItems: 'center' } : {},
        center ? { justifyContent: 'center' } : {},
        left ? { alignContent: 'flex-start' } : {},
        right ? { alignContent: 'flex-end' } : {},
        top ? { justifyContent: 'flex-start' } : {},
        bottom ? { justifyContent: 'flex-end' } : {},
        margin ? handleMargins() : {},
        padding ? handlePaddings() : {},
        style,
        color ? { backgroundColor: color } : ''];

    return (
        <Grid
            container
            item
            direction="column"
            style={ styleConcat(defaultStyle) }
            { ...props }>
            { children }
        </Grid>
    );
};

export default Column;