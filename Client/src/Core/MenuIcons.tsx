import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  Menu,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete, ModeEditOutline, Visibility } from "@mui/icons-material";

interface menuProps {
  data: any;
  setView: any;
  handleEdit:(val:any)=>void;
  handleDelete:(val:any)=>void;
}

const MenuIcons = ({ data, setView,handleEdit,handleDelete }: menuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const theme: MixTheme = useTheme();
  const [particularindex, setParticularindex] = useState<any>("");
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setParticularindex(data.id);
  };
  const handleCustomDelete = () => {
    // deleteAction!=undefined && deleteAction(obj[uniqueId]);
    setAnchorEl(null);
    setParticularindex(null);
    handleDelete(data)
  };

  const handleCustomEdit = () => {
    setAnchorEl(null);
    setParticularindex(null);
    handleEdit(data)
  };

  const handleClose = () => {
    setAnchorEl(null);
    setParticularindex(null);
  };

  const handleView = () => {
    setView({
      flag: true,
      data: data,
    });
    setAnchorEl(null);
    setParticularindex(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={particularindex === data.id ? "long-menu" : undefined}
        aria-expanded={particularindex === data.id ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={particularindex === data.id}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "14ch",
          },
        }}
      >
        <MenuItem onClick={handleCustomEdit}>
          <ListItemIcon>
            <ModeEditOutline />
          </ListItemIcon>
          <Typography variant="inherit">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleCustomDelete}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Delete</Typography>
        </MenuItem>
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <Visibility />
          </ListItemIcon>
          <Typography variant="inherit">View</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuIcons;
