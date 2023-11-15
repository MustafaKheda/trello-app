import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setUser,
  setCurrentUser,
  handleForgetPasswordAction,
  unSetCurrentUser,
  handleSetStage,
} from "../../Store/Action";
import BasicTextField from "../../Common/BasicTextField";
import BasicButton from "../../Common/BasicButton";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import uuid from "react-uuid";
import "../../assest/Css/Login.scss";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { messageMap } from "../../Common/Constant";
import { Tooltip, Typography } from "@mui/material";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.userStore?.users);
  const shortUUID = uuid().slice(0, 18);
  const [auth, setAuth] = useState({
    id: shortUUID,
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    email: "",
    loginPassword: "",
    loginEmail: "",
    open: false,
    type: "",
    show: true,
    showPassword: false,
    showForgetPassword: false,
    showForgetPasswordConfirm: false,
    showForgetPasswordDialog: false,
  });
  // Destructuring properties from the 'auth' object
  const {
    id,
    firstName,
    lastName,
    mobileNumber,
    password,
    email,
    loginEmail,
    loginPassword,
    type,
    show,
    confirmPassword,
    showPassword,
    showForgetPassword,
    showForgetPasswordDialog,
    showForgetPasswordConfirm,
  } = auth;

  // Regular expression for email validation
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/;
  const passwordRegEx =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  // Effect to handle navigation based on 'type'
  useEffect(() => {
    let timeOut;
    clearTimeout(timeOut);
    if (type === "login") {
      setTimeout(() => {
        navigate("/task-hub");
      }, 600);
    }
    if (type === "signup") {
      toggleView();
    }
    timeOut = setTimeout(() => {
      setAuth((prvAuth) => ({
        ...prvAuth,
        open: false,
        type: "",
      }));
    }, 5000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [type]);

  useEffect(() => {
    dispatch(unSetCurrentUser());
  }, []);
  // Function to close the Snackbar
  const handleClose = () => {
    setAuth((prvAuth) => ({
      ...prvAuth,
      open: false,
      openDialog: false,
      type: "",
    }));
  };
  const handleCloseDialogBox = () => {
    setAuth((prvAuth) => ({
      ...prvAuth,
      showForgetPasswordDialog: false,
      type: "",
    }));
    resetLogin("forgetPassword");
  };

  const handleOpenDialogBox = (e, forgetPasswordEmail) => {
    if (isNaN(forgetPasswordEmail)) {
      return setAuth((prvAuth) => ({
        ...prvAuth,
        email: forgetPasswordEmail,
        showForgetPasswordDialog: true,
      }));
    }
    setAuth((prvAuth) => ({ ...prvAuth, showForgetPasswordDialog: true }));
  };
  const handleShowPassword = () => {
    setAuth((prvAuth) => ({ ...prvAuth, showPassword: !showPassword }));
  };
  const handleShowForgetPassword = () => {
    setAuth((prvAuth) => ({
      ...prvAuth,
      showForgetPassword: !showForgetPassword,
    }));
  };

  const handleShowForgetPasswordConfirm = () => {
    setAuth((prvAuth) => ({
      ...prvAuth,
      showForgetPasswordConfirm: !showForgetPasswordConfirm,
    }));
  };

  const handleForgetPassword = () => {
    // Check if the password, confirmPassword, and email fields are not empty
    if (
      password?.trim() !== "" &&
      confirmPassword?.trim() !== "" &&
      email?.trim() !== ""
    ) {
      // Check if the password length is less than 8 characters
      if (password?.trim().length < 8) {
        return setAuth((prvAuth) => ({
          ...prvAuth,
          type: "passwordLength",
        }));
      }
      // Check if the password does not meet the required format
      if (!passwordRegEx.test(password)) {
        return setAuth((prvAuth) => ({
          ...prvAuth,

          type: "invaildPassword",
        }));
      }
      if (password.trim() !== confirmPassword.trim()) {
        return setAuth((prvAuth) => ({
          ...prvAuth,
          type: "passNotMatch",
        }));
      }
      if (isNaN(email)) {
        const emailExist = user?.some(
          (user) => user?.email.toLowerCase() === email?.toLowerCase()
        );
        if (!emailExist) {
          return setAuth((prvAuth) => ({
            ...prvAuth,
            type: "userNotFoundForgetPassword",
          }));
        }
      } else {
        const mobileExist = user.some((user) => user?.mobileNumber === email);
        if (!mobileExist) {
          return setAuth((prvAuth) => ({
            ...prvAuth,
            type: "userNotFoundForgetPasswordMobile",
          }));
        }
      }
      dispatch(handleForgetPasswordAction({ email, password }));

      setAuth((prvAuth) => ({
        ...prvAuth,
        type: "passwordChanged",
      }));

      setTimeout(() => {
        resetLogin();
      }, 1200);
    } else {
      setAuth((prvAuth) => ({
        ...prvAuth,
        type: "fillForgetPasswordForm",
      }));
    }
  };
  // Function to handle login
  const handleSignin = () => {
    if (loginPassword.trim() !== "" && loginEmail.trim() !== "") {
      if (!isNaN(loginEmail) && loginEmail.trim().length !== 10) {
        return setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "lessNumber",
        }));
      }

      if (isNaN(loginEmail) && !regEx.test(loginEmail)) {
        return setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "invaildEmail",
        }));
      }

      if (loginPassword.trim()?.length < 8) {
        return setAuth((prvAuth) => ({
          ...prvAuth,
          open: true,
          type: "passwordLength",
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

      const userFound = user?.find(
        (user) =>
          (user.mobileNumber === loginEmail ||
            user?.email.trim().toLowerCase() ===
              loginEmail.toLowerCase().trim()) &&
          user?.password === loginPassword
      );
      if (userFound) {
        // Successful login
        const { firstName, lastName, id } = userFound;

        dispatch(setCurrentUser({ id, firstName, lastName }));
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
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      mobileNumber.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      email.trim() !== ""
    ) {
      if (!regEx.test(email)) {
        return handleAlertMessage("invaildEmail");
      }
      // Check the email already exists
      const emailExist = user?.some(
        (user) => user?.email.toLowerCase() === email.toLowerCase()
      );
      if (emailExist) {
        return handleAlertMessage("emailExist");
      }
      if (mobileNumber.trim().length !== 10) {
        return handleAlertMessage("lessNumber");
      }
      // Check the mobile number already exists
      const numberExist = user?.some(
        (user) => user.mobileNumber === mobileNumber
      );
      if (numberExist) {
        return handleAlertMessage("numberExist");
      }

      if (password.trim().length < 8) {
        return handleAlertMessage("passwordLength");
      }
      if (!passwordRegEx.test(password)) {
        return handleAlertMessage("invaildPassword");
      }
      if (password.trim() !== confirmPassword.trim()) {
        return handleAlertMessage("passNotMatch");
      }

      //validation for email

      // Attempting to sign up
      const fullName = `${firstName} ${lastName}`;
      // Create new user
      dispatch(
        setUser({ id, firstName, lastName, email, mobileNumber, password })
      );
      // Default stage
      dispatch(
        handleSetStage({
          id: "",
          color: "#000",
          name: "Default stage",
          isDelete: false,
          createdBy: fullName,
          createdAt: "",
          modifiedBy: "",
          modifiedAt: "",
          userId: auth?.id,
        }),
        fullName
      );
      handleAlertMessage("signup");
      resetLogin();
    } else {
      // Empty Form Msg
      handleAlertMessage("empty");
    }
  };

  const handleAlertMessage = (message) => {
    setAuth((prvAuth) => ({
      ...prvAuth,
      open: true,
      type: message,
    }));
  };
  const resetLogin = () => {
    setAuth((prvAuth) => ({
      ...prvAuth,
      id: shortUUID,
      firstName: "",
      lastName: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      email: "",
      loginPassword: "",
      loginEmail: "",
      showPassword: false,
      showForgetPassword: false,
      showForgetPasswordDialog: false,
    }));
  };
  // Function to toggle between login and signup views
  const toggleView = () => {
    setAuth((prvAuth) => ({ ...prvAuth, show: !show }));
    resetLogin();
    if (type !== "signup") handleClose();
  };

  // Function to handle input change
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
          <SignIn
            auth={auth}
            handleChange={handleChange}
            toggleView={toggleView}
            handleSignin={handleSignin}
            handleOpenDialogBox={handleOpenDialogBox}
            handleClose={handleClose}
            handleShowPassword={handleShowPassword}
            messageMap={messageMap}
          />
        ) : (
          <SignUp
            auth={auth}
            handleChange={handleChange}
            toggleView={toggleView}
            handleSignUp={handleSignUp}
            handleClose={handleClose}
            handleShowPassword={handleShowPassword}
            messageMap={messageMap}
            handleShowForgetPassword={handleShowForgetPassword}
          />
        )}
      </Card>

      <Dialog
        cl
        open={showForgetPasswordDialog}
        onClose={handleCloseDialogBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change Password"}</DialogTitle>
        <DialogContent className="signinDailogBox">
          <BasicTextField
            className="basicTextField"
            value={email}
            fullWidth
            name="email"
            placeholder="Email or Mobile Number"
            onChange={handleChange}
          />
          <Tooltip title={messageMap["msgTooltip"]} placement="top-end" arrow>
            <BasicTextField
              className="basicTextField"
              value={password}
              fullWidth
              type={showForgetPassword ? "text" : "password"}
              name="password"
              placeholder="New Password"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowForgetPassword}>
                      {showForgetPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
          <Tooltip title={messageMap["msgTooltip"]} placement="top-end" arrow>
            <BasicTextField
              fullWidth
              className="basicTextField"
              value={confirmPassword}
              name="confirmPassword"
              type={showForgetPasswordConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowForgetPasswordConfirm}>
                      {showForgetPasswordConfirm ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
          <Typography color={type !== "passwordChanged" ? "red" : "green"}>
            {messageMap[type]}
          </Typography>
        </DialogContent>
        <DialogActions>
          <BasicButton
            className="cardButton"
            onClick={handleCloseDialogBox}
            name="Cancel"
          />
          <BasicButton
            className="cardButton"
            onClick={handleForgetPassword}
            autoFocus
            name="save"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Login;
