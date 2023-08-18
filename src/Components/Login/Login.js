import {
  Box,
  Button,
  Card,
  CardMedia,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Person2Icon from "@mui/icons-material/Person2";
import KeyIcon from "@mui/icons-material/Key";
import DialpadIcon from "@mui/icons-material/Dialpad";
import BadgeIcon from "@mui/icons-material/Badge";
import FormControl from "@mui/material/FormControl";
import React, { useEffect, useId, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";

import { setUser } from "../../store/action";
import "../../assest/css/Login.scss";
import img3 from "../../assest/Image/rafay-ansari-qKoEIBZ4lLM-unsplash.jpg";
import img2 from "../../assest/Image/reinhart-julian-d4ZYpoGjUXo-unsplash.jpg";
import img1 from "../../assest/Image/larissa-cardoso-zHUHeNT_UtE-unsplash.jpg";
import { useSelector } from "react-redux";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users?.user);
  const shortUUID = uuid().slice(0, 8);
  const [show, setShow] = useState(true);
  const [auth, setAuth] = useState({
    id: shortUUID,
    username: "",
    mobileNumber: "",
    password: "",
    email: "",
  });
  const [login, setLogin] = useState({
    loginPassword: "",
    loginEmail: "",
  });
  const [openSnackBar, setOpen] = useState({
    open: false,
    type: "",
  });
  const messageMap = {
    signup: "Signup Successful",
    login: "Login Successful",
    emailExist: "This email already exists!",
    loginFailed: "Wrong Password",
    numberExist: "Someone is already registered with this number",
    empty: "Please fill the form",
    lessNumber: "Please enter a 10-digit mobile number.",
    passwordContain: "Password must have at least 8 characters.",
    userNotFound: "User not found. Please sign up.",
  };
  const { username, mobileNumber, password, email } = auth;
  const { open, type } = openSnackBar;
  const { loginPassword, loginEmail } = login;

  useEffect(() => {
    if (type === "login" || type === "signup") {
      navigate("/Trello");
    }
  }, [type]);
  const handleClose = () => {
    setOpen({
      open: false,
      type: "",
    });
  };

  const handleSignUp = (e) => {
    console.log(user);
    e.preventDefault();
    if (
      username.trim() !== "" &&
      mobileNumber.trim() !== "" &&
      password.trim() !== "" &&
      email.trim() !== ""
    ) {
      if (mobileNumber.trim().length !== 10) {
        return setOpen({
          open: true,
          type: "lessNumber",
        });
      }
      if (password.trim().length < 8) {
        return setOpen({
          open: true,
          type: "passwordContain",
        });
      }

      // Check if username already exists
      const emailExist = user?.some(
        (user) => user?.email.toLowerCase() === email.toLowerCase()
      );

      // Checking if the mobile number already exists
      const numberExist = user?.some(
        (user) => user.mobileNumber === mobileNumber
      );
      // Attempting to sign up
      if (emailExist) {
        setOpen({
          open: true,
          type: "emailExist",
        });
      } else if (numberExist) {
        setOpen({
          open: true,
          type: "numberExist",
        });
      } else {
        // Create new user
        dispatch(setUser(auth));
        setOpen({
          open: true,
          type: "signup",
        });
        setAuth({ password: "", username: "", email: "", mobileNumber: "" });
      }
    } else {
      // to send message the to fill the form
      setOpen({
        open: true,
        type: "empty",
      });
    }
    // dispatch(setUser(auth));
    // setAuth({ password: "", username: "", email: "", mobileNumber: "" });
    // console.log(auth);
  };
  const toggleView = () => {
    setShow((currShow) => !currShow);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <Card
        elevation={7}
        className={`loginCard ${show ? "login " : "signup"} `}
      >
        {show ? (
          <>
            <Box className={`cardBox ${show ? "login" : "signup"} `}>
              <Typography className="cardHeading">Trello</Typography>
              <Box className="cardInputs">
                <TextField
                  fullWidth
                  placeholder="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="inputIcon" position="start">
                        <Person2Icon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <TextField
                  fullWidth
                  placeholder="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="inputIcon" position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <Button
                  elevation={3}
                  className="cardButton"
                  onClick={toggleView}
                >
                  Login
                </Button>
              </Box>
            </Box>
            <Carousel
              infiniteLoop={true}
              showStatus={false}
              showThumbs={false}
              className={`cardMedia ${show ? "login" : "signup"}`}
            >
              <div>
                <img src={img2} />
                <p className="legend">Legend 1</p>
              </div>
              <div>
                <img src={img1} />
                <p className="legend">Legend 2</p>
              </div>
              <div>
                <img src={img3} />
                <p className="legend">Legend 3</p>
              </div>
            </Carousel>
            {/* <CardMedia
              component={"img"}
              className={`cardMedia ${show ? "login" : "signup"}`}
            /> */}
          </>
        ) : (
          <>
            <Box
              elevation={3}
              className={`cardBox ${show ? "login" : "signup"}`}
            >
              <Typography className="cardHeading">Trello</Typography>
              <FormControl className="cardInputs">
                <TextField
                  value={username}
                  name="username"
                  fullWidth
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
                <TextField
                  value={email}
                  required
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

                <TextField
                  value={mobileNumber}
                  name="mobileNumber"
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
                <TextField
                  value={password}
                  name="password"
                  fullWidth
                  placeholder="Password"
                  onChange={handleChange}
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="inputIcon" position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  elevation={3}
                  className="cardButton"
                  onClick={handleSignUp}
                >
                  Sign up
                </Button>
              </FormControl>
            </Box>
            {/* <CardMedia
              component={"img"}
              className={`cardMedia ${show ? "login" : "signup"}`}
            /> */}
            <Carousel
              autoPlay={true}
              interval={5000}
              autoFocus={true}
              infiniteLoop={true}
              showStatus={false}
              showThumbs={false}
              className={`cardMedia ${show ? "login" : "signup"}`}
            >
              <div>
                <img src={img2} />
                <p className="legend">Legend 1</p>
              </div>
              <div>
                <img src={img1} />
                <p className="legend">Legend 2</p>
              </div>
              <div>
                <img src={img3} />
                <p className="legend">Legend 3</p>
              </div>
            </Carousel>
          </>
        )}
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        // The message map is an object that contains types of messages, and the type variable will determine which type of message needs to be shown.
        message={messageMap[type]}
      />
    </div>
  );
}

export default Login;
