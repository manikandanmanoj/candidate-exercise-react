import { useEffect, useState } from "react";
import { generateRandomId, validator } from "../../Utils/validator";
import { useStore } from "../../Storeprovider/store";
import { globalApicalls } from "../../Utils/Axios";
import { StorageService } from "../../Storeprovider/SessionStorage";

let fields_ = {
  name: {
    value: "",
    is_require: true,
    error: false,
    min_length: 4,
    max_length: 55,
    type: "text",
    err_msg: "",
  },
  description: {
    value: "",
    is_require: true,
    error: false,
    min_length: 8,
    max_length: null,
    type: "text",
    err_msg: "",
  },
  timeframe: {
    value: "",
    is_require: true,
    error: false,
  },
  id: {
    value: "",
    is_require: false,
    error: false,
  },
  status: {
    value: "",
    is_require: false,
    error: false,
  },
  ticketId: {
    value: "",
    is_require: false,
    error: false,
  },
  userId: {
    value: "",
    is_require: false,
    error: false,
  },
};
const obj_ = JSON.parse(JSON.stringify(fields_));
const useTask = () => {
  const { setAlertMsg, auth,setOpendrawler } = useStore();
  const [taskdata,setTaskdata]=useState([])
  const [view, setView] = useState<any>({
    flag: false,
    data: null,
  }); 
  const [fields, setFields] = useState<any>(obj_);
  
  const getData=async()=>{
    let obj = {
      url: `task/all/${JSON.parse(StorageService.auth.getValue() || '').id}`,
      pay_load: {},
    };
    const res: any = await globalApicalls("get", obj);
      if (res.status === 200) {
        setTaskdata(res.data)
      } else {
        setAlertMsg({ msg: res.data.message, type: "error" });
      }
  }

  useEffect(()=>{
  getData()
  },[])

  const handleAdd = async () => {
    if(fields.id.value===""){
    let localFields_validation: any = { ...fields };
    localFields_validation = validator(localFields_validation);
    if (localFields_validation.err) {
      setFields(localFields_validation.values);
    }
    if (!localFields_validation.err) {
      let obj = {
        url: `task/add/${JSON.parse(auth).id}`,
        pay_load: {
          name: fields.name.value,
          description: fields.description.value,
          timeframe: fields.timeframe.value,
          status: "todo",
          ticketId:generateRandomId(4),
          id: generateRandomId(20),
        },
      };
      const res: any = await globalApicalls("post", obj);
      if (res.status === 200) {
        setAlertMsg({ msg: "Saved successfully", type: "success" });
        getData()
        setOpendrawler(false)
        setFields(fields_)
      } else {
        setAlertMsg({ msg: res.data.message, type: "error" });
      }
    } else {
      setAlertMsg({ msg: "Required field", type: "error" });
    }
  }
  else{
    // setOpendrawler(true)
    let localFields_validation: any = { ...fields };
    localFields_validation = validator(localFields_validation);
    if (localFields_validation.err) {
      setFields(localFields_validation.values);
    }
    if (!localFields_validation.err) {
      let obj = {
        url: `task/update/${fields.id.value}`,
        pay_load: {
          name: fields.name.value,
          description: fields.description.value,
          timeframe: fields.timeframe.value,
          status: fields.status.value,
          ticketId:fields.ticketId.value,
          id: fields.id.value,
          userId: fields.userId.value,
        },
      };
      const res: any = await globalApicalls("post", obj);
      if (res.status === 200) {
        setAlertMsg({ msg: "Updated successfully", type: "success" });
        getData()
        setOpendrawler(false)
        setFields(fields_)
      } else {
        setAlertMsg({ msg: res.data.message, type: "error" });
      }
    } else {
      setAlertMsg({ msg: "Required field", type: "error" });
    }
  }
  };

  const handleDelete=async(val:any)=>{
    let obj = {
      url: `task/delete/${val.id}`,
      pay_load: {},
    };
    const res: any = await globalApicalls("post", obj);
    if (res.status === 200) {
      setAlertMsg({ msg: "Deleted successfully", type: "success" });
      getData()
    }
    else{
      setAlertMsg({ msg: res.data.message, type: "error" });
    }
  }


  return {
    view,
    setView,
    fields,
    setFields,
    handleAdd,
    taskdata,
    setTaskdata,
    handleDelete,
    getData
  };
};

export default useTask;
