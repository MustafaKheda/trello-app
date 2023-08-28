import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";
import "../../assest/Css/Trello.scss";
import { useTheme } from "@emotion/react";
import { Button, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import { handleSetCard } from "../../Store/Action";
import BasicButton from "../../Common/BasicButton";
import BasicTextField from "../../Common/BasicTextField";
import { messageMap } from "../../Common/Constant";

function CardDrawer({ open, close, currentUser, stageId }) {
  const users = useSelector((store) => store?.userStore.users);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { id: userId, username } = currentUser;
  const [card, setCard] = useState({
    id: uuid().slice(0, 18),
    userId,
    stageId,
    assignBy: username,
    assignTo: "",
    title: "",
    description: "",
    dueDate: "",
    comment: [],
    type: "",
    isDelete: false,
    openBar: false,
    createdBy: new Date(),
    createdAt: username,
    modifiedBy: "",
    modifiedAt: "",
  });
  const {
    title,
    description,
    dueDate,
    assignTo,
    id,
    assignBy,
    type,
    openBar,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
    isDelete,
    comment,
  } = card;

  const handleCloseSnackbar = () => {
    setCard({
      ...card,
      openBar: false,
      type: "",
    });
  };
  const handleSetDate = () => {
    if (!createdAt) {
      setCard((prvCard) => ({
        ...prvCard,
        createdAt: new Date(),
        createdBy: username,
      }));
    } else {
      setCard((prvCard) => ({
        ...prvCard,
        modifiedAt: new Date(),
        modifiedBy: username,
      }));
    }
  };
  const handleClose = () => {
    close();
    setCard((prevStage) => ({
      ...prevStage,
      createdBy: "",
      createdAt: "",
      modifiedBy: "",
      modifiedAt: "",
      assignTo: "",
      title: "",
      description: "",
      dueDate: "",
      type: "",
    }));
  };
  const handleChange = (e) => {
    setCard((prvCard) => ({
      ...prvCard,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    handleSetDate();
    e.preventDefault();
    console.log(card);
    if (
      title.trim() !== "" &&
      assignTo !== "" &&
      description !== "" &&
      dueDate !== "" &&
      createdBy !== ""
    ) {
      dispatch(
        handleSetCard({
          title,
          description,
          dueDate,
          assignTo,
          id,
          assignBy,
          createdAt: card.createdAt, // Use the updated createdAt value
          modifiedAt: card.modifiedAt, // Use the updated modifiedAt value
          createdBy: card.createdBy, // Use the updated createdBy value
          modifiedBy: card.modifiedBy, // Use the updated modifiedBy value
          userId,
          stageId,
          comment,
          isDelete,
        })
      );
      setCard((prevStage) => ({
        ...prevStage,
        id: uuid().slice(0, 18),
        createdAt: "",
        createdBy: "",
        modifiedBy: "",
        modifiedAt: "",
        assignTo: "",
        title: "",
        description: "",
        dueDate: "",
      }));
      close();
    } else {
      setCard((prevStage) => ({
        ...prevStage,
        openBar: true,
        type: "emptyCardForm",
      }));
    }
  };
  useEffect(() => {
    setCard((prevStage) => ({
      ...prevStage,
      userId,
      stageId,
    }));
  }, [stageId, userId]);

  return (
    <Drawer
      key={stageId}
      className="trelloDrawer"
      anchor="right"
      open={open}
      onClose={handleClose}
    >
      <div className="drawerHeader">
        <IconButton onClick={handleClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <BasicTextField
        className="cardDrawerTextField"
        value={title}
        name="title"
        label="Title"
        placeholder="Title"
        onChange={handleChange}
      />
      <BasicTextField
        className="cardDrawerTextField"
        value={description}
        name="description"
        label="Description"
        placeholder="Description"
        multiline
        rows="3"
        onChange={handleChange}
      />
      <BasicTextField
        className="cardDrawerTextField"
        value={dueDate}
        name="dueDate"
        label="Due date"
        type="datetime-local"
        onChange={handleChange}
      />
      <TextField
        className="cardDrawerTextField"
        select
        name="assignTo"
        value={assignTo}
        onChange={handleChange}
      >
        {users &&
          users.map((user) =>
            userId !== user.isd ? (
              <MenuItem value={user.username}>{user.username}</MenuItem>
            ) : null
          )}
      </TextField>
      <BasicButton onClick={handleSubmit} name={"Submit"} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openBar}
        onClose={handleCloseSnackbar}
        message={messageMap[type]}
      />
    </Drawer>
  );
}

export default CardDrawer;
