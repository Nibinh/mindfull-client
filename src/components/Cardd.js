import * as React from "react";
import { Card, Grid } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getUser } from "../stores/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

function Cardd({ id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const user = useSelector((state) => state.users.user);
  console.log(user);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 200);
  }, []);

  useEffect(() => {
    dispatch(getUser(id));
  }, [id]);

  return (
    <div>
      {open ? (
        <CircularProgress color="success" />
      ) : (
        <Card
          sx={{
            marginTop: 5,
            border: "1px solid",
            borderRadius: "70px",
            padding: "20px",
            // paddingLeft: "50px",
            backgroundColor: "lightgray",
            boxShadow: "2px 3px 5px 3px #888",
            borderColor: "red",
          }}
        >
          <CardMedia />
          <CardContent>
            <Typography>
              <h1>{user.name}</h1>
            </Typography>
            <Typography>Email : {user.email}</Typography>
            <Typography>Phone : {user.phone}</Typography>
            <Typography>createdBy : {user.createdBy.name}</Typography>
          </CardContent>
          <Grid>
            <Tooltip title="Edit">
              <Link
                to={"/edituser/" + user._id}
                style={{ textDecoration: "none" }}
              >
                <EditIcon />
              </Link>
            </Tooltip>
          </Grid>
          {/* <CardActions></CardActions> */}
        </Card>
      )}
    </div>
  );
}

export default Cardd;
