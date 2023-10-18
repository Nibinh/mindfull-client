import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function HeaderTwo() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "brown" }}>
          <Toolbar>
            <Link to={"/home"} style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "white" }}
              >
                User Management
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default HeaderTwo;
