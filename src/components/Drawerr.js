import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import { getAdminDetails } from "../stores/authSlice";
import { useDispatch } from "react-redux";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import Logout from "./Logout";

function Drawerr() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    left: false,
  });

  const id = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getAdminDetails(id));
  }, []);

  const logD = useSelector((state) => state.auths.logfullDetails);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemButton>
            <Grid>
              <Grid sx={{ marginBottom: 2, fontSize: 30, fontWeight: 700 }}>
                {logD.user?.name}
              </Grid>
              <Grid sx={{ marginBottom: 1, fontSize: 19 }}>
                {logD.user?.email}
              </Grid>
              <Grid sx={{ marginBottom: 1, fontSize: 17 }}>
                Phone : {logD.user?.phone}
              </Grid>
              <Grid sx={{ marginBottom: 1, fontSize: 17 }}>
                Sate : {logD.user?.state}
              </Grid>
              <Grid sx={{ marginBottom: 1, fontSize: 17 }}>
                City : {logD.user?.city}
              </Grid>
              <Grid sx={{ fontSize: 17 }}>Gender : {logD.user?.gender}</Grid>
            </Grid>
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Grid>
            <Logout />
          </Grid>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            Home <HomeIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Drawerr;
