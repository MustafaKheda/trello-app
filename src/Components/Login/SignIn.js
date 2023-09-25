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
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../assest/Image/larissa-cardoso-zHUHeNT_UtE-unsplash.jpg";
import img2 from "../../assest/Image/reinhart-julian-d4ZYpoGjUXo-unsplash.jpg";
import img7 from "../../assest/Image/ryan-ancill-aJYO8JmVodY-unsplash.jpg";

import "../../assest/Css/Login.scss";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CommonCarousel from "./CommonCarousel";

function SignIn({
  auth,
  handleOpenDialogBox,
  toggleView,
  handleChange,
  handleSignin,
  handleClose,
  messageMap,
  handleShowPassword,
}) {
  const { loginEmail, loginPassword, showPassword, show, type, open } = auth;
  return (
    <>
      <Box className={`cardBox ${show ? "login" : "signup"} `}>
        <Typography className="cardHeading">TaskHub</Typography>
        <FormControl className="cardInputs">
          <BasicTextField
            className="basicTextField"
            fullWidth
            name="loginEmail"
            value={loginEmail}
            placeholder="Email or Mobile Number"
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
            className="basicTextField"
            fullWidth
            name="loginPassword"
            value={loginPassword}
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
          {type === "loginFailed" ? (
            <Typography
              onClick={(e) => handleOpenDialogBox(e, loginEmail)}
              className="forgetPassword"
            >
              Forget Password?
            </Typography>
          ) : (
            <Typography
              onClick={handleOpenDialogBox}
              className="forgetPassword"
            >
              Forget Password?
            </Typography>
          )}

          <BasicButton
            elevation={3}
            className="cardButton"
            onClick={handleSignin}
            name="Sign in"
          />
          <Typography onClick={toggleView} className="login_link">
            Don't have an account?
            <Typography className="link" variant="subtitle">
              {" "}
              Signup
            </Typography>
          </Typography>
        </FormControl>
      </Box>
      <CommonCarousel auth={auth} />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={handleClose}
        // The message map is an object that contains types of messages, and the type variable will determine which type of message needs to be shown.
        message={messageMap[type]}
      />
    </>
  );
}

export default SignIn;
