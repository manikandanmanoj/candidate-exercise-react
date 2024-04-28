import React, { useCallback, useEffect, useState } from "react";
import SignIn, { SignUp } from "../../UiComp/SignUp";
import { globalApicalls } from "../../Utils/Axios";
import { generateRandomId, validator } from "../../Utils/validator";
import { useStore } from "../../Storeprovider/store";
import { StorageService } from "../../Storeprovider/SessionStorage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

interface fieldUniqueData {
  value: string;
  is_require: boolean;
  error: boolean;
  min_length: number;
  max_length: null | number;
  type: string;
  err_msg: string;
}

export interface textFieldsSign {
  username: fieldUniqueData;
  password: fieldUniqueData;
  confirm: fieldUniqueData;
}

let fields_= {
  username: {
    value: "",
    is_require: true,
    error: false,
    min_length: 4,
    max_length: null,
    type: "text",
    err_msg: "",
  },
  password: {
    value: "",
    is_require: true,
    error: false,
    min_length: 8,
    max_length: null,
    type: "text",
    err_msg: "",
  },
  confirm: {
    value: "",
    is_require: true,
    error: false,
    min_length: 8,
    max_length: null,
    type: "text",
    err_msg: "",
  },
}

const obj_ = JSON.parse(JSON.stringify(fields_));

const Index = () => {
  const navigate=useNavigate()
  const { setAlertMsg,setAuth } = useStore();
  const [flag, setFlag] = useState<boolean>(false);
  const [fields, setFields] = useState<any>(obj_);

  useEffect(() => {
    let clone_ = { ...fields };
    if (flag) {
      for(let index in clone_){
        if(index==='confirm'){
        clone_[index].is_require=true
        clone_[index].value=''
        clone_[index].error=false
        }
        else{
          clone_[index].value=''
          clone_[index].error=false
        }
      }
    } else {
      for(let index in clone_){
        if(index==='confirm'){
        clone_[index].is_require=false
        clone_[index].value=''
        clone_[index].error=false
        }
        else{
          clone_[index].value=''
          clone_[index].error=false
        }
      }
    }
    setFields(clone_);
  }, [flag]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let localFields_ = { ...fields };
      if (e.target.value.length === 0) {
        localFields_[e.target.name].error = localFields_[e.target.name]
          .is_require
          ? true
          : false;
        localFields_[e.target.name].err_msg = localFields_[e.target.name]
          .is_require
          ? `Required field`
          : "";
        localFields_[e.target.name].value = e.target.value;
      } else {
        localFields_[e.target.name].value = e.target.value;
        localFields_[e.target.name].error = false;
      }
      setFields(localFields_);
    },
    [fields]
  );

  const SignupOperations = async () => {
    let localFields_validation: any = { ...fields };
    localFields_validation = validator(localFields_validation);
    if (localFields_validation.err) {
      setFields(localFields_validation.values);
    }
    if (!localFields_validation.err) {
      let obj = {
        url: "user/add",
        pay_load: {
          username: fields.username.value,
          password: fields.password.value,
          confirm: fields.confirm.value,
          id: generateRandomId(),
        },
      };
      const res: any = await globalApicalls("post", obj);
      if (res.status === 200) {
        setAlertMsg({ msg: 'Signup successfully', type: 'success' });
        StorageService.auth.setValue(JSON.stringify(res.data))
        setAuth(StorageService.auth.setValue(JSON.stringify(res.data)))
        navigate(ROUTES.DASHBOARD)
      } else {
        setAlertMsg({ msg: res.data.message, type: "error" });
      }
    } else {
      setAlertMsg({ msg: "Required field", type: "error" });
    }
  };

  const signInOperations=async()=>{
    let localFields_validation: any = { ...fields };
    localFields_validation = validator(localFields_validation);
    if (localFields_validation.err) {
      setFields(localFields_validation.values);
    }
    if (!localFields_validation.err) {
      let obj = {
        url: "user/signin",
        pay_load: {
          username: fields.username.value,
          password: fields.password.value,
        },
      };
      const res: any = await globalApicalls("post", obj);
      if (res.status === 200) {
        setAlertMsg({ msg: 'Signin successfully', type: 'success' });
        StorageService.auth.setValue(JSON.stringify(res.data))
        setAuth(StorageService.auth.setValue(JSON.stringify(res.data)))
        navigate(ROUTES.DASHBOARD)
      } else {
        setAlertMsg({ msg: res.data.message, type: "error" });
      }
    } else {
      setAlertMsg({ msg: "Required field", type: "error" });
    }
  }

  return (
    <div>
      {flag ? (
        <SignUp
          flag={flag}
          setFlag={setFlag}
          fields={fields}
          setFields={setFields}
          handleChange={handleChange}
          SignupOperations={SignupOperations}
        />
      ) : (
        <SignIn
          flag={flag}
          setFlag={setFlag}
          fields={fields}
          setFields={setFields}
          handleChange={handleChange}
          signInOperations={signInOperations}
        />
      )}
    </div>
  );
};

export default Index;
