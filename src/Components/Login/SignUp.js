import React from "react";

import BasicTextField from "../../Common/BasicTextField";
import BasicButton from "../../Common/BasicButton";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Person2Icon from "@mui/icons-material/Person2";
import KeyIcon from "@mui/icons-material/Key";
import DialpadIcon from "@mui/icons-material/Dialpad";
import BadgeIcon from "@mui/icons-material/Badge";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { messageMap } from "../../Common/Constant";
import img1 from "../../assest/Image/larissa-cardoso-zHUHeNT_UtE-unsplash.jpg";
import img2 from "../../assest/Image/reinhart-julian-d4ZYpoGjUXo-unsplash.jpg";
import img7 from "../../assest/Image/ryan-ancill-aJYO8JmVodY-unsplash.jpg";

import "../../assest/Css/Login.scss";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CommonCarousel from "./CommonCarousel";
function SignUp({
  auth,
  handleChange,
  handleShowPassword,
  handleSignUp,
  toggleView,
  handleShowForgetPassword,
  handleClose,
}) {
  const {
    username,
    mobileNumber,
    password,
    email,
    open,
    type,
    show,
    confirmPassword,
    showPassword,
    showForgetPassword,
  } = auth;
  return (
    <>
      <Box elevation={3} className={`cardBox ${show ? "login" : "signup"}`}>
        <Typography className="cardHeading">TaskHub</Typography>
        <FormControl className="cardInputs">
          <BasicTextField
            className="basicTextField"
            fullWidth
            type="text"
            value={username}
            name="username"
            placeholder="Username"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment className="inputIcon" position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            }}
          />
          <BasicTextField
            value={email}
            className="basicTextField"
            name="email"
            fullWidth
            placeholder="Email"
            type="email"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment className="inputIcon" position="start">
                  <Person2Icon />
                </InputAdornment>
              ),
            }}
          />

          <BasicTextField
            value={mobileNumber}
            name="mobileNumber"
            className="basicTextField"
            fullWidth
            type="number"
            placeholder="Mobile Number"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment className="inputIcon" position="start">
                  <DialpadIcon />
                </InputAdornment>
              ),
            }}
          />

          <BasicTextField
            value={password}
            name="password"
            className="basicTextField"
            fullWidth
            placeholder="Password"
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment className="inputIcon" position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <BasicTextField
            className="basicTextField"
            value={confirmPassword}
            name="confirmPassword"
            fullWidth
            placeholder="Confirm Password"
            onChange={handleChange}
            type={showForgetPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment className="inputIcon" position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowForgetPassword}>
                    {showForgetPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <BasicButton
            elevation={3}
            className="cardButton"
            onClick={handleSignUp}
            name="sign up"
          />

          <Typography onClick={toggleView} className="login_link">
            Already have an Account!
            <Typography className="link" variant="subtitle">
              {" "}
              Signin
            </Typography>
          </Typography>
        </FormControl>
      </Box>
      <CommonCarousel auth={auth} />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        message={messageMap[type]}
      />
    </>
  );
}

export default SignUp;
