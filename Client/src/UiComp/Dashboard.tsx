import React, { useCallback, useMemo, useState } from "react";
import {
  Row,
  Column,
  Card,
  CustomTextFiled,
  CustomDropDown,
  MenuIcons,
  ModalComponent,
} from "../Core";
import { Button, IconButton, Typography } from "@mui/material";
import { theme, useStyle } from "../styles";
import { makeStyles } from "./CommonStyleUi";
import TaskIcon from "@mui/icons-material/Task";
import InfoIcon from "@mui/icons-material/Info";
import { getNextDays, truncateString } from "../Utils/validator";
import { useStore } from "../Storeprovider/store";

interface dashProps {
  setView: React.Dispatch<any>;
  view: any;
  taskdata:any;
  handleEdit:(val:any)=>void
  handleDelete:(val:any)=>void;
  handleDragUpdate: (obj_: any) => Promise<void>
}

const Dashboard = ({
  handleDragUpdate,
  view, 
  setView,
  taskdata:todoData,
  handleEdit,
  handleDelete
}: dashProps) => {
  const {searchfilter}=useStore()
  const searchfilterMemo=useMemo(()=>{
      return todoData.filter((f:any)=>f.name.toLowerCase().includes(searchfilter.toLowerCase()) || 
      f.ticketId.toLowerCase().includes(searchfilter.trim().toLowerCase()))      
  },[searchfilter,todoData])
  return (
    <div>
      <Row>
        <Column md={4} padding={[20]}>
          <CardComponent
            title="Todo"
            setView={setView}
            handleDragUpdate={handleDragUpdate}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            dragData={
              searchfilter.trim()!==''?
              searchfilterMemo:
              todoData
            }
            data={
              searchfilter.trim()!==''?
              searchfilterMemo.filter((f:any) => f.status === "todo"):
              todoData.filter((f:any) => f.status === "todo")
            }
          />
        </Column>
        <Column md={4} padding={[20]}>
          <CardComponent
            title="Progress"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            setView={setView}
            handleDragUpdate={handleDragUpdate}
            dragData={
              searchfilter.trim()!==''?
              searchfilterMemo:
              todoData
            }
            data={
              searchfilter.trim()!==''?
              searchfilterMemo.filter((f:any) => f.status === "progress"):
              todoData.filter((f:any) => f.status === "progress")
            }
          />
        </Column>
        <Column md={4} padding={[20]}>
          <CardComponent
            title="Done"
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            setView={setView}
            handleDragUpdate={handleDragUpdate}
            dragData={
              searchfilter.trim()!==''?
              searchfilterMemo:
              todoData
            }
            data={
              searchfilter.trim()!==''?
              searchfilterMemo.filter((f:any) => f.status === "done"):
              todoData.filter((f:any) => f.status === "done")
            }
          />
        </Column>
        <ModalComponent
          open={view.flag}
          setOpen={() => setView({ flag: false, data: null })}
        >
          <ModalElement viewData={view.data} />
        </ModalComponent>
      </Row>
    </div>
  );
};

export default Dashboard;

const ModalElement = ({ viewData }: any) => {
  const { styles } = useStyle(makeStyles); 
  return (
    <div>
      <Row>
        <Column md={12} sx={styles.backgrounCol}>
          <></>
        </Column>
        <Column md={12} sx={{ position: "relative" }} center middle>
          <IconButton sx={styles.infoButtonCss}>
            <InfoIcon />
          </IconButton>
        </Column>
        <Column md={12}>
          <Typography variant="h6" component={"h6"} fontWeight={700}>
            {viewData.name}
          </Typography>
          <Typography mt={1} variant="body1" component={"h6"}>
            {viewData.description}
          </Typography>
          <Typography mt={1} variant="body1" component={"h6"}>
            End date for this task is {viewData.timeframe}
          </Typography>
        </Column>
      </Row>
    </div>
  );
};

interface cardProps {
  title: string;
  data: any;
  setView: any;
  handleEdit:(val:any)=>void;
  handleDelete:(val:any)=>void;
  dragData:any;
  handleDragUpdate: (obj_: any) => Promise<void>
}

const CardComponent = ({ 
  title, 
  data, 
  setView,
  handleEdit,
  handleDelete,
  dragData,
  handleDragUpdate
 }: cardProps) => {
  const { styles } = useStyle(makeStyles); 
  const {setAlertMsg}=useStore()
  const[startdata,setStartdata]=useState<any>(null)

  const onDragOver=(e:any)=>{
    e.preventDefault();
  }

  const onDragStart=(e:any,val:any)=>{
    setStartdata(val)   
    e.dataTransfer.setData("id", val.id);    
  }

  const onDrop=(e:any,startdata:any,title?:string)=>{
    let id_=dragData.filter((f:any)=>f.id===e.dataTransfer.getData("id"))[0]    
    if(startdata==null){
      let obj_={...id_}
      obj_.status=title?.toLowerCase()
      handleDragUpdate(obj_)
    }
    else if(id_.status===startdata.status){
      setAlertMsg({ msg: "Don't perform drag on same status", type: "info" });
    }
    else{
    let obj_={...id_}
    obj_.status=startdata.status
    handleDragUpdate(obj_)
    }
  }

  return (
    <Card sx={{...styles.cardCsstask,height:'100vh'}} padding={[10]}>
      <Row>
        <Column md={4} left>
          <Typography
            sx={
              title === "Todo"
                ? styles.todoCss
                : title === "Progress"
                ? styles.progressCss
                : styles.DoneCss
            }
            variant="h6"
            component={"h6"}
          >
            {title}
          </Typography>
        </Column>
        <Column md={8}>
          <></>
          {/* <Typography sx={styles.todoCss} variant="h6" component={'h6'}>{title}</Typography> */}
        </Column>
        <div 
        style={{width:'100%',height:'100vh'}}
         onDragOver={(e) => onDragOver(e)}
         onDrop={(e) => onDrop(e,startdata,title)}>
        {data.length>0?data.map((val: any, index: number) => (
           <div
           style={{width:'100%'}}
           key={index}
           draggable
           onDragStart={(e) => onDragStart(e, val)}          
         >
          <Column md={12} margin={[10, 0, 0, 0]}>
            <Card padding={[10]}>
              <Row>
                <Column md={10}>
                  <Typography variant="h6" component={"h6"} fontWeight={700}>
                    {truncateString(val.name, 5)}
                  </Typography>
                  <Typography variant="body2" component={"h6"}>
                    {val.timeframe}
                  </Typography>
                  <Typography variant="body2" component={"h6"}>
                    <TaskIcon
                      sx={
                        title === "Todo"
                          ? styles.todoIconCss
                          : title === "Progress"
                          ? styles.progressIconCss
                          : styles.DoneIconCss
                      }
                    />
                    &nbsp;&nbsp;
                    <span style={styles.iconText}>{val.ticketId}</span>
                  </Typography>
                </Column>
                <Column md={2}>
                  <MenuIcons handleDelete={handleDelete} handleEdit={handleEdit} setView={setView} data={val} />
                </Column>
              </Row>
            </Card>
          </Column>
          </div>
        )):<Typography>No records found</Typography>}
        </div>
      </Row>
    </Card>
  );
};

interface formProps {
  setFields: React.Dispatch<any>;
  fields: any;
  handleAdd: () => Promise<void>
}

export const FormComponent = ({ handleAdd,setFields, fields }: formProps) => {
  const { styles } = useStyle(makeStyles);
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
  return (
    <div>
      <Row>
        <Column md={12}>
          <Typography mt={1} mb={0.5} color={theme.global?.textGrey}>
            Name
          </Typography>
          <CustomTextFiled
            name="name"
            onChange={handleChange}
            value={fields.name.value}
            error={fields.name.error}
            helperText={
              fields.name.value === "" ? "Required field" : fields.name.err_msg
            }
            required={fields.name.is_require}
          />
          <Typography mt={1} mb={0.5} color={theme.global?.textGrey}>
            Description
          </Typography>
          <CustomTextFiled
            name="description"
            onChange={handleChange}
            value={fields.description.value}
            error={fields.description.error}
            helperText={
              fields.description.value === ""
                ? "Required field"
                : fields.description.err_msg
            }
            required={fields.description.is_require}
            multiline
            rows={4}
            // maxRows={Infinity}
          />
          <Typography mt={1} mb={0.7} color={theme.global?.textGrey}>
            Time frame
          </Typography>
          <CustomDropDown
            name="timeframe"
            data={fields.timeframe.value}
            onChange={handleChange}
            error={fields.timeframe.error}
            helperText={
              fields.timeframe.value === ""
                ? "Required field":''
            }
            menuData={[
              {
                value: getNextDays(2),
                label: "2 days",
              },
              {
                value:getNextDays(14),
                label: "2 weeks",
              },
            ]}
          />
          <Button onClick={handleAdd} sx={styles.saveButton} variant="contained">
            Save
          </Button>
        </Column>
      </Row>
    </div>
  );
};
