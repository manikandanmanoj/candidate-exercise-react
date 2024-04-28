import React from 'react'
import { CustomDrawler } from '../../Core'
import { useStore } from '../../Storeprovider/store';
import Dashboard, { FormComponent } from '../../UiComp/Dashboard';
import useTask from './useTask';
import { globalApicalls } from '../../Utils/Axios';
import { getNextDays } from '../../Utils/validator';

const Index = () => {
  const { opendrawler,setOpendrawler,setAlertMsg } = useStore();
  const {
    view,
    setView,
    fields,
    setFields,
    handleAdd,
    taskdata,
    handleDelete,
    getData
  }=useTask()

  const handleEdit=(val:any)=>{
    let field_clone={...fields}
    field_clone.name.value=val.name;
    field_clone.description.value=val.description;
    field_clone.timeframe.value=getNextDays(2)==val.timeframe || getNextDays(14)==val.timeframe?val.timeframe:'';
    field_clone.id.value=val.id;
    field_clone.status.value=val.status;
    field_clone.ticketId.value=val.ticketId;
    field_clone.userId.value=val.userId;
    setFields(field_clone)
    setOpendrawler(true)
  };

  const handleDragUpdate=async(obj_:any)=>{
    let obj = {
      url: `task/update/${obj_.id}`,
      pay_load: {
        name: obj_.name,
        description: obj_.description,
        timeframe: obj_.timeframe,
        status: obj_.status,
        ticketId:obj_.ticketId,
        id: obj_.id,
        userId: obj_.userId,
      },
    };
    const res: any = await globalApicalls("post", obj);
    if (res.status === 200) {
      getData()
    }
    else{
      setAlertMsg({ msg: "Internal error", type: "error" });
    }
  }

  return (
    <div style={{padding:'20px'}}>
      <CustomDrawler open={opendrawler} setOpen={setOpendrawler} title='Add Task'>
        <FormComponent handleAdd={handleAdd} fields={fields} setFields={setFields}/>
      </CustomDrawler>
      <Dashboard
      handleDragUpdate={handleDragUpdate}
      setView={setView}
      view={view}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      taskdata={taskdata}
      />
    </div>
  )
}

export default Index