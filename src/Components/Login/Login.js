// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import Snackbar from "@mui/material/Snackbar";
// import Typography from "@mui/material/Typography";
// import InputAdornment from "@mui/material/InputAdornment";
// import Person2Icon from "@mui/icons-material/Person2";
// import KeyIcon from "@mui/icons-material/Key";
// import DialpadIcon from "@mui/icons-material/Dialpad";
// import BadgeIcon from "@mui/icons-material/Badge";
// import FormControl from "@mui/material/FormControl";
// import React, { useEffect, useId, useState } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import { useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import BasicTextField from "../../Common/BasicTextField";
// import { messageMap } from "../../Common/Constant";
// import uuid from "react-uuid";
// import { setCurrentUser, setUser } from "../../Store/Action";
// import "../../assest/Css/Login.scss";
// import img3 from "../../assest/Image/rafay-ansari-qKoEIBZ4lLM-unsplash.jpg";
// import img2 from "../../assest/Image/reinhart-julian-d4ZYpoGjUXo-unsplash.jpg";
// import img1 from "../../assest/Image/larissa-cardoso-zHUHeNT_UtE-unsplash.jpg";
// import BasicButton from "../../Common/BasicButton";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setCurrentUser } from "../../Store/Action";
import BasicTextField from "../../Common/BasicTextField";
import BasicButton from "../../Common/BasicButton";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Person2Icon from "@mui/icons-material/Person2";
import KeyIcon from "@mui/icons-material/Key";
import DialpadIcon from "@mui/icons-material/Dialpad";
import BadgeIcon from "@mui/icons-material/Badge";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { messageMap } from "../../Common/Constant";
import uuid from "react-uuid";

import img1 from "../../assest/Image/larissa-cardoso-zHUHeNT_UtE-unsplash.jpg";
import img2 from "../../assest/Image/reinhart-julian-d4ZYpoGjUXo-unsplash.jpg";
import img3 from "../../assest/Image/rafay-ansari-qKoEIBZ4lLM-unsplash.jpg";

import "../../assest/Css/Login.scss";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.userStore?.users);
  const shortUUID = uuid().slice(0, 18);
  const [auth, setAuth] = useState({
    id: shortUUID,
    username: "",
    mobileNumber: "",
    password: "",
    email: "",
    loginPassword: "",
    loginEmail: "",
    open: false,
    type: "",
    show: true,
  });
  // Destructuring properties from the 'auth' object
  const {
    id,
    username,
    mobileNumber,
    password,
    email,
    loginEmail,
    loginPassword,
    open,
    type,
    show,
  } = auth;

  // Regular expression for email validation
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/;
  const passwordRegEx =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  // Effect to handle navigation based on 'type'
  useEffect(() => {
    if (type === "login") {
      navigate("/Trello");
    }
    if (type === "signup") {
      toggleView();
    }
  }, [type]);

  // Function to close the Snackbar
  const handleClose = () => {
    setAuth((prvAuth) => ({
      ...prvAuth,
      open: false,
      type: "",
    }));
  };

  // Function to handle login
  const handleLogin = () => {
    if (loginPassword.trim() !== "" && loginEmail.trim() !== "") {
      if (isNaN(loginEmail)) {
        if (!regEx.test(loginEmail)) {
          return setAuth((prvAuth) => ({
            ...prvAuth,
            open: true,
            type: "invaildEmail",
          }));
        }
      } else {
        if (loginEmail.trim().length < 10) {
          return setAuth((prvAuth) => ({
            ...prvAuth,
            open: true,
            type: "lessNumber",
          }));
        }
      }

      if (loginPassword.trim().length < 8) {
        return setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "passwordContain",
        }));
      }

      const userExist = user?.some(
        (user) =>
          user.mobileNumber === loginEmail ||
          user?.email.trim().toLowerCase() === loginEmail.toLowerCase().trim()
      );

      if (!userExist) {
        return setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "userNotFound",
        }));
      }

      const userFound = user?.filter(
        (user) =>
          (user.mobileNumber === loginEmail ||
            user?.email.trim().toLowerCase() ===
              loginEmail.toLowerCase().trim()) &&
          user.password === loginPassword
      );
      if (userFound.length > 0) {
        // Successful login
        const { username, id } = userFound[0];

        dispatch(setCurrentUser(id, username));
        setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "login",
        }));
        resetLogin();
      } else {
        // Invalid credentials for login
        setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "loginFailed",
        }));
      }
    } else {
      setAuth((prvAuth) => ({
        ...prvAuth,
        open: true,
        type: "empty",
      }));
    }
  };

  // Function to handle signup
  const handleSignUp = (e) => {
    e.preventDefault();
    if (
      username.trim() !== "" &&
      mobileNumber.trim() !== "" &&
      password.trim() !== "" &&
      email.trim() !== ""
    ) {
      if (mobileNumber.trim().length !== 10) {
        return setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "lessNumber",
        }));
      }
      if (password.trim().length < 8) {
        return setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "passwordContain",
        }));
      }
      if (!passwordRegEx.test(password)) {
        return setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "invaildPassword",
        }));
      }
      // Check if username already exists
      const emailExist = user?.some(
        (user) => user?.email.toLowerCase() === email.toLowerCase()
      );

      // Check the mobile number already exists
      const numberExist = user?.some(
        (user) => user.mobileNumber === mobileNumber
      );

      //validation for email
      if (!regEx.test(email)) {
        return setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "invaildEmail",
        }));
      }
      // Attempting to sign up
      if (emailExist) {
        setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "emailExist",
        }));
      } else if (numberExist) {
        setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "numberExist",
        }));
      } else {
        // Create new user
        dispatch(setUser({ id, username, email, mobileNumber, password }));
        setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "signup",
        }));
        resetLogin();
      }
    } else {
      // Empty Form Msg
      setAuth((prvAuth) => ({
        ...prvAuth,
        open: true,
        type: "empty",
      }));
    }
  };
  const resetLogin = () => {
    setAuth((prvAuth) => ({
      ...prvAuth,
      id: shortUUID,
      password: "",
      username: "",
      email: "",
      mobileNumber: "",
      loginEmail: "",
      loginPassword: "",
    }));
  };
  // Function to toggle between login and signup views
  const toggleView = () => {
    setAuth((prvAuth) => ({ ...prvAuth, show: !show }));
    resetLogin();
  };

  // Function to handle input change
  const handleChange = (e) => {
    e.preventDefault();
    setAuth({ ...auth, [e.target.name]: e.target.value.trim() });
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
              <FormControl className="cardInputs">
                <BasicTextField
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
                  fullWidth
                  name="loginPassword"
                  value={loginPassword}
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
                <BasicButton
                  elevation={3}
                  className="cardButton"
                  onClick={handleLogin}
                  name="Sign IN"
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
          </>
        ) : (
          <>
            <Box
              elevation={3}
              className={`cardBox ${show ? "login" : "signup"}`}
            >
              <Typography className="cardHeading">Trello</Typography>
              <FormControl className="cardInputs">
                <BasicTextField
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
                <BasicTextField
                  value={email}
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
