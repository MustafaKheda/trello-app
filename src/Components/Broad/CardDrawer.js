import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";
import "../../assest/css/Trello.scss";
import { useTheme } from "@emotion/react";
import { TextField } from "@mui/material";
import uuid from "react-uuid";

function CardDrawer({ open, close, currentUser, stageId }) {
  const { id: userId, username } = currentUser;
  const [card, setCard] = useState({
    id: uuid().slice(0, 18),
    stageId,
    userId,
    assignBy: username,
    assignTo: "",
    title: "",
    description: "",
    dueDate: "",
    comment: [],
  });
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
      <h3>{stageId}</h3>
      <TextField placeholder="title" />
      <TextField placeholder="Description" multiline rows={"5"} />
      <TextField
        label="Due Date"
        placeholder="Due Date"
        type="datetime-local"
      />
      <TextField placeholder="Assign to"></TextField>
    </Drawer>
  );
}

export default CardDrawer;
