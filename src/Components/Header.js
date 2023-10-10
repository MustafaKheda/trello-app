import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../assest/Css/Login.scss";
import { useDispatch, useSelector } from "react-redux";

import { handleEditUser, unSetCurrentUser } from "../Store/Action";
import "../assest/Css/TaskHub.scss";
import { useNavigate } from "react-router";

export default function Header() {
  const currentUser = useSelector((store) => store.userStore.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const letter = currentUser?.firstName
    ? `${currentUser?.firstName
        ?.slice(0, 1)
        ?.toUpperCase()}${currentUser?.lastName?.slice(0, 1)?.toUpperCase()}`
    : "U";
  const fullName = currentUser?.firstName
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : "Unknown";
  const [open, setOpen] = useState({
    anchorProfile: null,
    openProfile: false,
  });

  useEffect(() => {
    if (Object.keys(currentUser).length <= 0) {
      navigate("/");
    }
  }, [currentUser]);

  const { anchorProfile, openProfile } = open;

  const handleOpenProfilePage = () => {
    dispatch(handleEditUser(currentUser.id));
    navigate("/profile");
  };
  const handleCloseMenu = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      anchorProfile: null,
      openProfile: false,
    }));
  };

  const handleOpenProfileMenu = (event) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      anchorProfile: event.currentTarget,
      openProfile: true,
    }));
  };

  return Object.keys(currentUser).length > 0 ? (
    <>
      <AppBar position="fixed" className="navBar" elevation={0}>
        <Toolbar disableGutters className="navToolBar">
          <Typography
            onClick={() => navigate("/task-hub")}
            className="cardHeading"
          >
            TaskHub
          </Typography>
          <div>
            <Typography className="headerName">
              {currentUser.firstName}
            </Typography>
            <Avatar onClick={handleOpenProfileMenu} className="headerAvatar">
              {letter || "U"}
            </Avatar>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        id={`profile-menu`}
        anchorEl={anchorProfile}
        open={openProfile}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenProfilePage}>Profile</MenuItem>
        <MenuItem onClick={() => dispatch(unSetCurrentUser())}>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  ) : null;
}
