import React, { useEffect } from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import { FormikProvider, Form, useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  verifyEmail,
  otpVerificationErrorMsg,
  otpVerificationMsgDis,
  regMsgDis,
} from "../stores/authSlice";

function Otp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const otpMsg = useSelector((state) => state.auths.regMsg);
  console.log(otpMsg);

  const otpVerificationMsg = useSelector(
    (state) => state.auths.otpVerificationMsg
  );
  console.log(otpVerificationMsg);

  const otpVerificationError = useSelector(
    (state) => state.auths.otpVerificationError
  );
  console.log(otpVerificationError);

  const otpSchema = Yup.object().shape({
    digit1: Yup.string()
      .matches(/^\d$/, "Please enter a single digit")
      .required("Fill"),
    digit2: Yup.string()
      .matches(/^\d$/, "Please enter a single digit")
      .required("Fill"),
    digit3: Yup.string()
      .matches(/^\d$/, "Please enter a single digit")
      .required("Fill"),
    digit4: Yup.string()
      .matches(/^\d$/, "Please enter a single digit")
      .required("Fill"),
  });

  const formik = useFormik({
    initialValues: {
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
    },
    validationSchema: otpSchema,
    onSubmit: (values) => {
      const otp = `${values.digit1}${values.digit2}${values.digit3}${values.digit4}`;
      const email = localStorage.getItem("regMail");
      const body = {
        otp,
        email,
      };
      console.log(body);
      dispatch(verifyEmail(body));
    },
  });
  useEffect(() => {
    if (otpMsg) {
      setTimeout(() => {
        dispatch(regMsgDis());
      }, 4000);
    }
    if (otpVerificationMsg) {
      setTimeout(() => {
        dispatch(otpVerificationMsgDis());
        navigate("/");
      }, 3000);
    }
    if (otpVerificationError) {
      setTimeout(() => {
        dispatch(otpVerificationErrorMsg());
      }, 3000);
    }
  }, [otpMsg, otpVerificationMsg, otpVerificationError]);

  const { errors, handleSubmit, handleChange, touched } = formik;

  return (
    <div
      style={{
        backgroundColor: "lightpink",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Box sx={{ flexGrow: 1, marginTop: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={1} md={4} sm={2}></Grid>
          <Grid item xs={10} md={4} sm={8} style={{ textAlign: "center" }}>
            <FormikProvider value={formik}>
              <Grid sx={{ fontSize: 50, fontFamily: "serif", marginBottom: 4 }}>
                Enter OTP
              </Grid>
              <Form
                onSubmit={handleSubmit}
                class="animate__animated animate__pulse"
              >
                <Grid
                  container
                  spacing={2}
                  sx={{
                    border: "1px solid",
                    // color: "transparent",
                    borderRadius: "55px",
                    padding: "56px",
                    paddingLeft: "50px",
                    backgroundColor: "lightgray",
                    boxShadow: "2px 3px 5px 3px #888",
                  }}
                >
                  <Grid item xs={3}>
                    <Field
                      name="digit1"
                      as={TextField}
                      // label="Digit 1"
                      variant="outlined"
                      fullWidth
                      sx={{ backgroundColor: "white" }}
                    />
                    <ErrorMessage name="digit1">
                      {(error) => <div style={{ color: "red" }}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name="digit2"
                      as={TextField}
                      // label="Digit 2"
                      variant="outlined"
                      fullWidth
                      sx={{ backgroundColor: "white" }}
                    />
                    <ErrorMessage name="digit2">
                      {(error) => <div style={{ color: "red" }}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name="digit3"
                      as={TextField}
                      // label="Digit 3"
                      variant="outlined"
                      fullWidth
                      sx={{ backgroundColor: "white" }}
                    />
                    <ErrorMessage name="digit3">
                      {(error) => <div style={{ color: "red" }}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={3} sx={{ marginBottom: 4 }}>
                    <Field
                      name="digit4"
                      as={TextField}
                      // label="Digit 4"
                      variant="outlined"
                      fullWidth
                      sx={{ backgroundColor: "white" }}
                    />
                    <ErrorMessage name="digit4">
                      {(error) => <div style={{ color: "red" }}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid container style={{ justifyContent: "right" }}>
                    <Button type="submit" variant="contained">
                      Enter
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
            {otpMsg ? (
              <div class="animate__animated animate__backInUp animate__delay-1s">
                <Alert
                  variant="filled"
                  severity="success"
                  sx={{ marginTop: 4 }}
                >
                  {otpMsg}
                </Alert>
              </div>
            ) : (
              ""
            )}
            {otpVerificationError ? (
              <div class="animate__animated animate__backInUp ">
                <Alert variant="filled" severity="error" sx={{ marginTop: 4 }}>
                  {otpVerificationError}
                </Alert>
              </div>
            ) : (
              ""
            )}
            {otpVerificationMsg ? (
              <div class="animate__animated animate__backInUp ">
                <Alert
                  variant="filled"
                  severity="success"
                  sx={{ marginTop: 4 }}
                >
                  {otpVerificationMsg}
                </Alert>
              </div>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={1} md={4} sm={2}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Otp;
