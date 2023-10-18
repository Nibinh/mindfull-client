import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, deleteMsgDis } from "../stores/userSlice";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import { AdminLogout } from "../stores/authSlice";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logoutMsg = useSelector((state) => state.auths.logoutMsg);

  const handleClick = () => {
    dispatch(AdminLogout());
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Logout
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure want to Logout ?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="success">
            Disagree
          </Button>
          <Button onClick={handleClick} color="error" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Logout;
