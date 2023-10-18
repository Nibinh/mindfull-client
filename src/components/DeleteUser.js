import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { deleteUser, deleteMsgDis } from "../stores/userSlice";
import Tooltip from "@mui/material/Tooltip";

function DeleteUser({ id }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteUser(id));
    setTimeout(() => {
      dispatch(deleteMsgDis());
    }, 1500);
    console.log(id);
  };
  return (
    <div>
      <IconButton variant="text" onClick={handleClick}>
        <Tooltip title="Delete">
          <DeleteIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
}

export default DeleteUser;
