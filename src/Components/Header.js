import {
  AppBar,
  Avatar,
  Container,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import "../assest/Css/Login.scss";
import { useDispatch, useSelector } from "react-redux";
import BasicButton from "../Common/BasicButton";
import { unSetCurrentUser } from "../Store/Action";
import "../assest/Css/Trello.scss";

export default function Header() {
  const user = useSelector((store) => store.userStore.currentUser);
  const dispatch = useDispatch();
  const letter = user?.username?.slice(0, 1).toUpperCase();
  return (
    <AppBar position="fixed" className="navBar" elevation={0}>
      <Toolbar disableGutters className="navToolBar">
        <Typography className="cardHeading">TaskHub</Typography>
        <div>
          <BasicButton
            className="trelloStageButton"
            onClick={() => dispatch(unSetCurrentUser())}
            name="sign out"
          />
          <Tooltip title={user?.username}>
            <Avatar className="headerAvatar">{letter}</Avatar>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
}
