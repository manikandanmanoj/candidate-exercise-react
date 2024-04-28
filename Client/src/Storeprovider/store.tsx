import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { StorageService } from "./SessionStorage";

export interface ContextType {
  alert_msg: alertProps;
  setAlertMsg: (value: React.SetStateAction<alertProps>) => void;
  list:any;
  setList:any;
  opendrawler:boolean;
  setOpendrawler: React.Dispatch<React.SetStateAction<boolean>>
  auth:any;
  setAuth: React.Dispatch<any>
  setSearchfilter: React.Dispatch<React.SetStateAction<string>>
  searchfilter: string;
  sessionOut: () => void
}

interface alertProps {
  msg: string;
  type: AlertColor | any;
}

const Context = createContext<ContextType>({} as ContextType);

export const useStore = () => {
  return useContext(Context);
};

const Store = ({ children }: { children?: React.ReactNode }) => {
  const [alert_msg, setAlertMsg] = useState<alertProps>({ msg: "", type: "" });
  const [auth,setAuth]=useState<any>(StorageService.auth.getValue() || '')
  const [opendrawler,setOpendrawler]=useState<boolean>(false);
  const [searchfilter,setSearchfilter]=useState<string>('')

  useEffect(()=>{
    if(localStorage.getItem("auth")){
      let d:any=StorageService.auth.getValue() || '';
      setAuth(d)
    }
  },[localStorage.getItem("auth")])

  const sessionOut=useCallback(()=>{
    StorageService.auth.clear();
    localStorage.clear();   
    setAuth('') 
    window.location.href = '/';
},[StorageService]);

  return (
    <Context.Provider value={{ 
      alert_msg,
      setAlertMsg,
      auth,
      setAuth,
      opendrawler,setOpendrawler,
      searchfilter,setSearchfilter,
      sessionOut
       }as ContextType}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ height: 100 }}
        open={typeof alert_msg.msg == "object" || alert_msg.msg.length > 0}
        autoHideDuration={2000}
        onClose={() => setAlertMsg({ msg: "", type: "" })}
      >
        <Alert
          variant="filled"
          severity={alert_msg.type}
          onClose={() => setAlertMsg({ msg: "", type: "" })}
        >
          {" "}
          {alert_msg.msg}
        </Alert>
      </Snackbar>
      {children}
    </Context.Provider>
  );
};

export default Store;
