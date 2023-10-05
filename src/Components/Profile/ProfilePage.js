import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../../assest/Css/Profile.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CardActions from "@mui/material/CardActions";
import BasicButton from "../../Common/BasicButton";
import { useNavigate } from "react-router";
import {
  handleUnsetEditUser,
  handleUpdatePasswordAction,
  handleUpdateUserAction,
} from "../../Store/Action";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import BasicTextField from "../../Common/BasicTextField";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../assest/Css/Login.scss";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { messageMap } from "../../Common/Constant";
import BasicSnackBar from "../../Common/BasicSnackBar";
import Header from "../Header";
import { Avatar, CardHeader, Grid, Typography } from "@mui/material";

function ProfilePage() {
  const editUser = useSelector((store) => store?.userStore?.editUserData);
  const user = useSelector((state) => state?.userStore?.users);
  const letter = editUser?.firstName
    ? `${editUser?.firstName?.slice(0, 1).toUpperCase()}${editUser?.lastName
        ?.slice(0, 1)
        .toUpperCase()}`
    : "U";
  const {
    email: editEmail,
    mobileNumber: editMobileNumber,
    id: editId,
  } = editUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    id: editUser?.id,
    mobileNumber: null,
    email: "",
    oldPassword: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    open: false,
    type: "",
    show: true,
    showPassword: false,
    showForgetPassword: false,
    showForgetPasswordConfirm: false,
    openDialog: false,
    editProfile: false,
  });
  const {
    id,
    mobileNumber,
    password,
    email,
    openDialog,
    open,
    type,
    confirmPassword,
    showPassword,
    showForgetPassword,
    showForgetPasswordConfirm,
    firstName,
    lastName,
    oldPassword,
    newPassword,
    editProfile,
  } = profile;

  useEffect(() => {
    setProfile((prvProfile) => ({
      ...prvProfile,
      id: editUser?.id,
      mobileNumber: editMobileNumber,
      email: editEmail,
      password: editUser?.password,
      firstName: editUser?.firstName,
      lastName: editUser?.lastName,
    }));
  }, [editUser]);

  useEffect(() => {
    setTimeout(() => {
      setProfile((prvProfile) => ({
        ...prvProfile,
        type: "",
        open: false,
      }));
    }, 3000);
  }, [type]);

  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,8}(.[a-z{3,8}])?/;
  const passwordRegEx =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const handleCloseDialogBox = () => {
    setProfile((prvProfile) => ({
      ...prvProfile,
      openDialog: false,
      newPassword: "",
      oldPassword: "",
      confirmPassword: "",
      type: "",
    }));
  };
  const handleEditProfile = () => {
    setProfile((prvProfile) => ({
      ...prvProfile,
      editProfile: !editProfile,
    }));
  };
  const handleOpenDialogBox = (e) => {
    setProfile((prvProfile) => ({
      ...prvProfile,
      openDialog: true,
      type: "",
    }));
  };
  const handleShowPassword = () => {
    setProfile((prvProfile) => ({
      ...prvProfile,
      showPassword: !showPassword,
    }));
  };
  const handleShowForgetPassword = () => {
    setProfile((prvProfile) => ({
      ...prvProfile,
      showForgetPassword: !showForgetPassword,
    }));
  };
  const handleClose = () => {
    setProfile((prvProfile) => ({
      ...prvProfile,
      open: false,
    }));
  };
  const handleChange = (e) => {
    e.preventDefault();
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleShowForgetPasswordConfirm = () => {
    setProfile((prvProfile) => ({
      ...prvProfile,
      showForgetPasswordConfirm: !showForgetPasswordConfirm,
    }));
  };
  const handleBack = () => {
    navigate(-1);
    setTimeout(() => {
      dispatch(handleUnsetEditUser());
    }, 100);
  };
  const handleUpdateUser = () => {
    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      mobileNumber.trim() !== "" &&
      email.trim() !== ""
    ) {
      if (
        firstName.trim() === editUser?.firstName &&
        lastName.trim() === editUser?.lastName.trim() &&
        mobileNumber.trim() === editMobileNumber &&
        email.trim() === editEmail
      ) {
        return setProfile((prvProfile) => ({
          ...prvProfile,
          type: "notChange",
        }));
      }
      if (mobileNumber.trim().length !== 10) {
        return setProfile((prvProfile) => ({
          ...prvProfile,
          type: "lessNumber",
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
        return setProfile((prvProfile) => ({
          ...prvProfile,
          type: "invaildEmail",
        }));
      }
      // Attempting to sign up
      if (emailExist && editEmail !== email) {
        setProfile((prvProfile) => ({
          ...prvProfile,
          type: "emailExist",
        }));
      } else if (numberExist && editMobileNumber !== mobileNumber) {
        setProfile((prvProfile) => ({
          ...prvProfile,
          type: "numberExist",
        }));
      } else {
        // Create new user
        dispatch(
          handleUpdateUserAction({
            id,
            password,
            email,
            mobileNumber,
            firstName,
            lastName,
          })
        );
        setProfile((prvProfile) => ({
          ...prvProfile,
          open: true,
          type: "userUpdated",
          editProfile: false,
        }));
        resetProfile();
      }
    } else {
      // Empty Form Msg
      setProfile((prvProfile) => ({
        ...prvProfile,
        open: true,
        type: "empty",
      }));
    }
  };

  const resetProfile = () => {
    setProfile((prvProfile) => ({
      ...prvProfile,
      username: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      email: "",
      showPassword: false,
      showForgetPassword: false,
      showForgetPasswordConfirm: false,
      openDialog: false,
      newPassword: "",
      oldPassword: "",
    }));
  };
  const handleUpdatePassword = () => {
    if (
      newPassword.trim() !== "" &&
      oldPassword.trim() !== "" &&
      confirmPassword.trim() !== ""
    ) {
      const validPassword = editUser.password === oldPassword;
      if (!validPassword) {
        return setProfile((prvProfile) => ({
          ...prvProfile,
          open: true,
          type: "passwordNotCorrect",
        }));
      }

      if (newPassword.trim().length < 8) {
        return setProfile((prvProfile) => ({
          ...prvProfile,
          open: true,
          type: "passwordContain",
        }));
      }
      if (!passwordRegEx.test(newPassword)) {
        return setProfile((prvProfile) => ({
          ...prvProfile,
          open: true,
          type: "invaildPassword",
        }));
      }
      if (newPassword.trim() !== confirmPassword.trim()) {
        return setProfile((prvProfile) => ({
          ...prvProfile,
          open: true,
          type: "passNotMatch",
        }));
      }
      if (newPassword.trim() === oldPassword.trim()) {
        return setProfile((prvProfile) => ({
          ...prvProfile,
          open: true,
          type: "passwordSame",
        }));
      }
      dispatch(handleUpdatePasswordAction({ editId, newPassword }));
      setProfile((prvProfile) => ({
        ...prvProfile,
        open: true,
        type: "passwordChanged",
      }));
      resetProfile();
    } else {
      setProfile((prvProfile) => ({
        ...prvProfile,
        open: true,
        type: "empty",
      }));
    }
  };
  return (
    <div className="profilePage">
      <Header />
      {/* <Typography className="profile" variant="h5">Profile Page</Typography> */}
      <Card className="profileCard">
        <CardHeader
          title={editProfile ? "Edit Profile" : "Profile Page"}
          className="cardHeader"
        />
        <Grid container columnGap={2}>
          <Grid item xs={3} sm={3} md={3} lg={3}>
            <Avatar className="profileLogo">{letter}</Avatar>
          </Grid>
          <Grid
            container
            rowSpacing={editProfile ? 3 : 1}
            columnSpacing={2}
            xs={9}
            sm={9}
            md={9}
            lg={9}
          >
            {editProfile ? (
              <>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Typography>First Name</Typography>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <BasicTextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="basicTextField"
                    name="firstName"
                    value={firstName}
                    label="First Name"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Typography>Last Name</Typography>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <BasicTextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="lastName"
                    value={lastName}
                    label="Last Name"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Typography>Email</Typography>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <BasicTextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="email"
                    className="basicTextField"
                    value={email}
                    label="Email"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Typography>Mobile Number</Typography>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <BasicTextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="mobileNumber"
                    className="basicTextField"
                    value={mobileNumber}
                    label="Mobile Number"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Typography
                  onClick={handleOpenDialogBox}
                  className="link position"
                >
                  Change Password
                </Typography>

                <Typography className="message">
                  {openDialog && type !== "userUpdated"
                    ? null
                    : messageMap[type]}
                </Typography>
              </>
            ) : (
              <>
                {" "}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography>First Name</Typography>
                  <Typography variant="h6">{editUser.firstName}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography>Last Name</Typography>
                  <Typography variant="h6">{editUser.lastName}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography>Email</Typography>
                  <Typography variant="h6">{editEmail}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography>Mobile Number</Typography>
                  <Typography variant="h6">{editMobileNumber}</Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>

        <CardActions className="profileCardAction">
          <BasicButton
            className="cardButton"
            onClick={editProfile ? handleEditProfile : handleBack}
            name={editProfile ? "cancel" : "back"}
          />
          <BasicButton
            onClick={editProfile ? handleUpdateUser : handleEditProfile}
            className={editProfile ? "cardButton" : "editButton"}
            name={editProfile ? "Save" : "Edit Profile"}
          />
        </CardActions>
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialogBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update Password"}</DialogTitle>
        <DialogContent className="signinDailogBox">
          <BasicTextField
            className="basicTextField"
            value={oldPassword}
            fullWidth
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            placeholder="Old Password"
            onChange={handleChange}
            InputProps={{
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
            value={newPassword}
            fullWidth
            type={showForgetPassword ? "text" : "password"}
            name="newPassword"
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
          <Typography>{openDialog ? messageMap[type] : null}</Typography>
        </DialogContent>
        <DialogActions>
          <BasicButton
            className="cardButton"
            onClick={handleCloseDialogBox}
            name="Cancel"
          />
          <BasicButton
            className="cardButton"
            onClick={handleUpdatePassword}
            autoFocus
            name="update"
          />
        </DialogActions>
      </Dialog>
      <BasicSnackBar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        // The message map is an object that contains types of messages, and the type variable will determine which type of message needs to be shown.
        message={messageMap[type]}
      />
    </div>
  );
}

export default ProfilePage;
