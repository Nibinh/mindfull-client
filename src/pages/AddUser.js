import React, { useEffect, useState } from "react";
import { Box, Grid, FormControl, TextField, Button } from "@mui/material";
import { FormikProvider, Form, useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "@mui/base/useSnackbar";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { css, keyframes, styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import HeaderTwo from "../components/HeaderTwo";
import { addUsers, addUserMsgDis, addUserErrorDis } from "../stores/userSlice";

function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addingMsg, setAddmsg] = useState("");
  const addMsg = useSelector((state) => state.users.addUserMsg);
  const addMsgError = useSelector((state) => state.users.addUserError);

  const [open, setOpen] = React.useState(false);

  const { getRootProps, onClickAway } = useSnackbar({
    open,
    autoHideDuration: 5000,
  });

  const todoSchema = Yup.object().shape({
    name: Yup.string().required("Name is requird"),
    email: Yup.string().required("Email is requird"),
    phone: Yup.number()
      .typeError("Phone number must be a number")
      .positive("Phone number must be positive")
      .integer("Phone number must be an integer")
      .test(
        "is-ten-digits",
        "Phone number must be exactly 10 digits",
        (value) => {
          return value.toString().length === 10;
        }
      )
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      adminId: localStorage.getItem("userId"),
    },
    validationSchema: todoSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(addUsers(values));
    },
  });

  useEffect(() => {
    if (addMsg) {
      setOpen(true);
      setTimeout(() => {
        dispatch(addUserMsgDis());
        setOpen(false);
        navigate("/home");
      }, 1050);
    }
    if (addMsgError) {
      setOpen(true);
      setTimeout(() => {
        dispatch(addUserErrorDis());
        setOpen(false);
      }, 3000);
    }
  }, [addMsg, addMsgError]);

  const { errors, handleSubmit, handleChange, touched } = formik;

  return (
    <div>
      <HeaderTwo />
      <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={1} md={4} sm={2}></Grid>
          <Grid item xs={10} md={4} sm={8} style={{ textAlign: "center" }}>
            <Grid sx={{ fontSize: 50, fontFamily: "serif", marginBottom: 4 }}>
              Add User <PersonAddAltIcon sx={{ fontSize: 40 }} />
            </Grid>

            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <Grid sx={{ marginBottom: 4 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Enter the User Name"
                          rows={2}
                          name="name"
                          onChange={handleChange}
                        />
                        <ErrorMessage name="name">
                          {(error) => (
                            <div style={{ color: "red" }}>{error}</div>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    </Grid>
                    <Grid sx={{ marginBottom: 4 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Enter User Email"
                          rows={2}
                          name="email"
                          onChange={handleChange}
                        />
                      </FormControl>
                      <ErrorMessage name="email">
                        {(error) => <div style={{ color: "red" }}>{error}</div>}
                      </ErrorMessage>
                    </Grid>
                    <Grid sx={{ marginBottom: 4 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Enter User PhoneNumber"
                          rows={2}
                          name="phone"
                          onChange={handleChange}
                        />
                      </FormControl>
                      <ErrorMessage name="phone">
                        {(error) => <div style={{ color: "red" }}>{error}</div>}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                  {/* {err && (<p>{ err}</p>)} */}
                  <Grid item xs={12} md={12}>
                    <Grid container style={{ justifyContent: "right" }}>
                      <Button type="submit" variant="contained">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
          </Grid>
          <Grid item xs={1} md={4} sm={2}></Grid>
        </Grid>
        {open ? (
          <ClickAwayListener onClickAway={onClickAway}>
            <CustomSnackbar {...getRootProps()}>
              {addMsg || addMsgError}
            </CustomSnackbar>
          </ClickAwayListener>
        ) : null}
      </Box>
    </div>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const CustomSnackbar = styled("div")(
  ({ theme }) => css`
    position: fixed;
    z-index: 5500;
    display: flex;
    right: 16px;
    bottom: 16px;
    left: auto;
    justify-content: start;
    max-width: 560px;
    min-width: 300px;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : grey[400]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[50]};
    box-shadow: ${theme.palette.mode === "dark"
      ? `0 4px 8px rgb(0 0 0 / 0.7)`
      : `0 4px 8px rgb(0 0 0 / 0.1)`};
    padding: 0.75rem;
    color: ${theme.palette.mode === "dark" ? blue[200] : blue[900]};
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    animation: ${snackbarInRight} 200ms;
    transition: transform 0.2s ease-out;
  `
);

export default AddUser;
