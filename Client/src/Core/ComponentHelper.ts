const styleConcat = (style:any) => {
    let obj = {};
    for (let i = 0; i < style.length; i++) {
        obj = Object.assign(obj, style[i]);
    }
    return obj;
};

export { styleConcat };