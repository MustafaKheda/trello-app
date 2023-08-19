import React from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";
import "../../assest/css/Trello.scss";
import { useTheme } from "@emotion/react";

function CardDrawer({ open, close, userId, cardId }) {
  console.log(userId, cardId);
  const theme = useTheme();
  return (
    <Drawer className="trelloDrawer" anchor="right" open={open} onClose={close}>
      <div className="drawerHeader">
        <IconButton onClick={close}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <h1>{userId}</h1>
      <h3>{cardId}</h3>
    </Drawer>
  );
}

export default CardDrawer;
