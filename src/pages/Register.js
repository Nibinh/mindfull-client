import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  FormControl,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FormikProvider, Form, useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { register, regErrorMsg, regMsgDis } from "../stores/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [visibletwo, setVisibletwo] = useState(false);
  const regMsg = useSelector((state) => state.auths.regMsg);

  const regMsgError = useSelector((state) => state.auths.regError);

  const regMail = useSelector((state) => state.auths.regMail);

  const regLoading = useSelector((state) => state.auths.regLoading);

  const EndAdorement = ({ visible, setVisible }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={() => setVisible(!visible)}>
          {visible ? <VisibilityIcon /> : <VisibilityOffOutlinedIcon />}
        </IconButton>
      </InputAdornment>
    );
  };
  const EndAdorementtwo = ({ visibletwo, setVisibletwo }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={() => setVisibletwo(!visibletwo)}>
          {visibletwo ? <VisibilityIcon /> : <VisibilityOffOutlinedIcon />}
        </IconButton>
      </InputAdornment>
    );
  };

  const registerSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    name: Yup.string().required("Name is required"),
    phone: Yup.number()
      .max(11111111111, "only 10 numbers")
      .required("Phone nuumber is required"),
    gender: Yup.string().required("Gender is required"),
    how: Yup.string().required("Fill it"),
    city: Yup.string().required("Fill it"),
    state: Yup.string().required("Fill it"),
    password: Yup.string().required("Password is required"),
    confirmpassword: Yup.string().required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      gender: "",
      how: "",
      city: "",
      state: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(register(values));
    },
  });

  useEffect(() => {
    if (regMsgError) {
      setTimeout(() => {
        dispatch(regErrorMsg());
      }, 4000);
    }
    if (regMsg) {
      setTimeout(() => {
        localStorage.setItem("regMail", regMail);
        navigate("/otp");
      }, 2000);
    }
  }, [regMsgError, regMail]);

  const { errors, handleSubmit, handleChange, touched } = formik;

  return (
    <div
      style={{
        backgroundColor: "lightpink",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        {/* <div class="animate__animated animate__pulse">Example</div> */}
        <Grid container spacing={2}>
          <Grid item xs={1} md={4} sm={2}></Grid>
          <Grid item xs={10} md={4} sm={8} style={{ textAlign: "center" }}>
            <FormikProvider value={formik}>
              <Grid sx={{ fontSize: 50, fontFamily: "serif", marginBottom: 4 }}>
                Register User
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
                    color: "transparent",
                    borderRadius: "55px",
                    padding: "56px",
                    paddingLeft: "50px",
                    backgroundColor: "lightgray",
                    boxShadow: "2px 3px 5px 3px #888",
                  }}
                >
                  <Grid item md={12} xs={12}>
                    {/* /// */}
                    <Grid sx={{ marginBottom: 4 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Enter your name"
                          rows={2}
                          name="name"
                          onChange={handleChange}
                          sx={{
                            backgroundColor: "white",
                          }}
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
                          label="Enter Email"
                          rows={2}
                          name="email"
                          type="email"
                          onChange={handleChange}
                          sx={{
                            backgroundColor: "white",
                          }}
                        />
                        <ErrorMessage name="email">
                          {(error) => (
                            <div style={{ color: "red" }}>{error}</div>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    </Grid>
                    <Grid sx={{ marginBottom: 4 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Enter your Phonenumber"
                          rows={2}
                          name="phone"
                          onChange={handleChange}
                          sx={{
                            backgroundColor: "white",
                          }}
                        />
                        <ErrorMessage name="phone">
                          {(error) => (
                            <div style={{ color: "red" }}>{error}</div>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    </Grid>
                    {/* /? */}
                    <Grid sx={{ marginBottom: 4 }} textAlign="left">
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Gender
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          onChange={handleChange}
                          name="gender"
                        >
                          <FormControlLabel
                            value="Female"
                            control={<Radio />}
                            label="Female"
                            sx={{ color: "black" }}
                          />
                          <FormControlLabel
                            value="Male"
                            control={<Radio />}
                            label="Male"
                            sx={{ color: "black" }}
                          />
                          <FormControlLabel
                            value="Others"
                            control={<Radio />}
                            label="Other"
                            sx={{ color: "black" }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* //// */}
                    <Grid sx={{ marginBottom: 4 }} textAlign="left">
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          How did you hear about this?
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          onChange={handleChange}
                          name="how"
                        >
                          <FormControlLabel
                            value="LinkedIn"
                            control={<Radio />}
                            label="LinkedIn"
                            sx={{ color: "black" }}
                          />
                          <FormControlLabel
                            value="Friends"
                            control={<Radio />}
                            label="Friends"
                            sx={{ color: "black" }}
                          />
                          <FormControlLabel
                            value="JobPortal"
                            control={<Radio />}
                            label="Job Portal"
                            sx={{ color: "black" }}
                          />
                          <FormControlLabel
                            value="Others"
                            control={<Radio />}
                            label="Others"
                            sx={{ color: "black" }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* /// */}
                    <Grid sx={{ marginBottom: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          City
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="City"
                          name="city"
                          onChange={handleChange}
                        >
                          <MenuItem value="mumbai">Mumbai</MenuItem>
                          <MenuItem value="pune">Pune</MenuItem>
                          <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* ///// */}

                    <Grid sx={{ marginBottom: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          State
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="State"
                          name="state"
                          onChange={handleChange}
                        >
                          <MenuItem value="Gujarat">Gujarat</MenuItem>
                          <MenuItem value="Karnataka">Karnataka</MenuItem>
                          <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* ///// */}
                    <Grid sx={{ marginBottom: 4 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Enter Password"
                          rows={2}
                          name="password"
                          type={visible ? "text" : "password"}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <EndAdorement
                                visible={visible}
                                setVisible={setVisible}
                              />
                            ),
                          }}
                          sx={{
                            backgroundColor: "white",
                          }}
                        />
                        <ErrorMessage name="password">
                          {(error) => (
                            <div style={{ color: "red" }}>{error}</div>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    </Grid>
                    <Grid sx={{ marginBottom: 1 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Confirm Password"
                          rows={2}
                          name="confirmpassword"
                          type={visibletwo ? "text" : "password"}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <EndAdorementtwo
                                visibletwo={visibletwo}
                                setVisibletwo={setVisibletwo}
                              />
                            ),
                          }}
                          sx={{
                            backgroundColor: "white",
                          }}
                        />
                        <ErrorMessage name="confirmpassword">
                          {(error) => (
                            <div style={{ color: "red" }}>{error}</div>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    {regMsg || regLoading === "pending" ? (
                      <CircularProgress color="success" />
                    ) : (
                      ""
                    )}
                    <Grid container style={{ justifyContent: "right" }}>
                      <Button type="submit" variant="contained">
                        Register
                      </Button>
                    </Grid>
                    {regMsgError ? (
                      <Alert
                        severity="error"
                        variant="filled"
                        sx={{ marginTop: 3 }}
                      >
                        {regMsgError}
                      </Alert>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
          </Grid>
          <Grid item xs={1} md={4} sm={2}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Register;
