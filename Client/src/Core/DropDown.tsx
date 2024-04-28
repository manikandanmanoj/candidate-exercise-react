import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface selectDropProps {
  menuData: any;
  name:string
  onChange:any
  data:string 
  error:boolean;
  helperText:string;
}

export default function SelectSmall({helperText,data,error,menuData,name,onChange }: selectDropProps) {

  const handleChange = (event: SelectChangeEvent) => {
    onChange({ target: { value: event.target.value, name: name } })
  };

  return (
    <FormControl sx={{ minWidth: "100%" }} size="small">
      {/* <InputLabel id="demo-select-small-label">Time</InputLabel> */}
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={data}
        error={error}    
        onChange={handleChange}
      >
        {menuData.map(
          (val: { label: string; value: string }, index: number) => (
            <MenuItem key={index} value={val.value}>{val.label}</MenuItem>
          )
        )}
      </Select>
      {error && helperText && <p
      style={{
        position:'relative',
        top:'-14px',
        fontSize:'14px',
        marginLeft:'4px',
        color:'red'
      }}
      >{helperText}</p>}
    </FormControl>
  );
}
