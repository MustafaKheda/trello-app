import { AppBar, Avatar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import "../assest/css/Login.scss";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((store) => store.userStore.currentUser);
  const letter = user.username.slice(0, 1).toUpperCase();
  return (
    <AppBar position="fixed" className="navBar" elevation={3}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="navToolBar">
          <Typography className="cardHeading">Trello</Typography>
          <Avatar className="headerAvatar">{letter}</Avatar>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
