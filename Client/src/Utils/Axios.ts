import axios from "axios";
const getHeaders = () => {
    // const authUser:any = StorageService?.auth?.getValue();
    const header:any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    };
    // if (authUser) {
    //   header['Authorization'] = `Bearer ${ JSON.parse(authUser)?.accessToken }`;
    // }
    return header;
  };

const http = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: getHeaders()
  });

const globalApicalls=(method:string,req:any)=>{ 
    if(method==='get'){
        return new Promise((resolve, reject) => {
            http.get(req.url,req.pay_load)
            .then((responseJson) => {
              resolve(responseJson);
            })
            .catch((error) => {
              resolve(error.response);
              reject(error);
            });
          }); 
    }
    else if(method==='post'){
        return new Promise((resolve, reject) => {
            http.post(req.url,req.pay_load)
            .then((responseJson) => {
              resolve(responseJson);
            })
            .catch((error) => {
                resolve(error.response);
                reject(error);            
            });
          }); 
    }
   }

   export {
    globalApicalls
  };