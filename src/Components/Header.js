import { AppBar, Avatar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import "../assest/Css/Login.scss";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((store) => store.userStore.currentUser);
  const letter = user.username.slice(0, 1).toUpperCase();
  return (
    <AppBar position="absolute" className="navBar" elevation={0}>
      <Toolbar disableGutters className="navToolBar">
        <Typography className="cardHeading">Trello</Typography>
        <Avatar className="headerAvatar">{letter}</Avatar>
      </Toolbar>
    </AppBar>
  );
}
