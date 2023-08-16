import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import "../assest/css/Login.scss";

export default function Header() {
  return (
    <AppBar position="fixed" className="navBar" elevation={3}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="navToolBar">
          <Typography className="cardHeading">Trello</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
