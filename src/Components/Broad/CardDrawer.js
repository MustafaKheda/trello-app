import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";
import "../../assest/Css/Trello.scss";
import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSetCard,
  handleUnsetEditCard,
  handleUpdateCard,
  handleUpdateComment,
} from "../../Store/Action";
import BasicButton from "../../Common/BasicButton";
import BasicTextField from "../../Common/BasicTextField";
import { messageMap } from "../../Common/Constant";

function CardDrawer({ open, close, currentUser, stageId }) {
  const currentDate = new Date();
  const users = useSelector((store) => store?.userStore.users);
  const editCardData = useSelector((store) => store?.trelloStage?.editCardData);
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
    comment: "",
    comments: [],
    type: "",
    isDelete: false,
    openBar: false,
    createdBy: "",
    createdAt: "",
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
    comments,
    comment,
  } = card;
  useEffect(() => {
    if (editCardData !== null) {
      setCard((prv) => ({
        ...prv,
        id: editCardData?.id,
        userId: editCardData?.userId,
        stageId: editCardData?.stageId,
        assignBy: editCardData?.assignBy,
        assignTo: editCardData?.assignTo,
        title: editCardData?.title,
        description: editCardData?.description,
        dueDate: editCardData?.dueDate,
        comments: editCardData?.comments,
        isDelete: editCardData?.isDelete,
        createdBy: editCardData?.createdBy || "",
        createdAt: new Date(editCardData?.createdAt) || "",
        modifiedBy: editCardData?.modifiedBy || "",
        modifiedAt: editCardData?.modifiedAt || "",
      }));
    }
  }, [editCardData]);
  const handleCloseSnackbar = () => {
    setCard({
      ...card,
      openBar: false,
      type: "",
    });
  };
  const resetCard = () => {
    setCard({
      id: uuid().slice(0, 18),
      userId,
      stageId,
      assignBy: "",
      assignTo: "",
      title: "",
      description: "",
      dueDate: "",
      comment: "",
      comments: [],
      type: "",
      isDelete: false,
      openBar: false,
      createdBy: "",
      createdAt: "",
      modifiedBy: "",
      modifiedAt: "",
    });
  };
  const handleClose = () => {
    dispatch(handleUnsetEditCard());
    resetCard();
    close();
  };
  const handleChange = (e) => {
    setCard((prvCard) => ({
      ...prvCard,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    if (
      title.trim() !== "" &&
      assignTo !== "" &&
      description !== "" &&
      dueDate !== ""
    ) {
      dispatch(handleSetCard(card));
      handleClose();
    } else {
      setCard((prevStage) => ({
        ...prevStage,
        openBar: true,
        type: "emptyCardForm",
      }));
    }
  };
  const handleUpdate = (e) => {
    dispatch(handleUpdateCard(card, username));
    handleClose();
  };

  useEffect(() => {
    if (editCardData === null) {
      setCard((prevStage) => ({
        ...prevStage,
        assignBy: username,
        userId,
        stageId,
      }));
    }
    if (editCardData !== null) {
      setCard((prevStage) => ({
        ...prevStage,
        assignBy: editCardData.assignBy,
        userId: editCardData.userId,
        stageId: editCardData.stageId,
      }));
    }
  }, [stageId, userId]);

  const handleUpdateComments = () => {
    if (comment !== "") {
      dispatch(handleUpdateComment({ id, comment }));

      setCard((prvCard) => ({
        ...prvCard,
        comment: "",
      }));
    } else {
      setCard((prevStage) => ({
        ...prevStage,
        openBar: true,
        type: "emptyComment",
      }));
    }
  };

  const handleCancel = () => {
    setCard((prvCard) => ({
      ...prvCard,
      comment: "",
    }));
  };
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
      <Card className="drawerCard" elevation={0}>
        <BasicTextField
          color="secondary"
          className="cardDrawerTextField"
          value={title}
          name="title"
          label="Title"
          onChange={handleChange}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
        />
        <BasicTextField
          color="secondary"
          className="cardDrawerTextField"
          value={description}
          name="description"
          label="Description"
          onChange={handleChange}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
        />
        <BasicTextField
          color="secondary"
          className="cardDrawerTextField"
          value={dueDate}
          name="dueDate"
          label="Due Date"
          type="datetime-local"
          variant="standard"
          inputProps={{
            min: new Date().toISOString().slice(0, 16),
            // disableUnderline: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        <TextField
          color="secondary"
          className="cardDrawerTextField"
          select
          name="assignTo"
          label="Assign To"
          value={assignTo}
          onChange={handleChange}
          variant="standard"
          inputProps={{
            disableUnderline: true,
          }}
        >
          {users &&
            users.map((user) =>
              userId !== user.id ? (
                <MenuItem key={user.id} value={user.username}>
                  {user.username}
                </MenuItem>
              ) : null
            )}
        </TextField>
        <BasicButton
          onClick={editCardData ? handleUpdate : handleSubmit}
          name={editCardData ? "update" : "submit"}
          className="drawerButton"
        />
      </Card>
      {editCardData ? (
        <Card className="commentCard">
          <Typography variant="h6" fontWeight={600}>
            Comment Section
          </Typography>
          <BasicTextField
            value={comment}
            name="comment"
            onChange={handleChange}
            variant="standard"
            className="commentTextField"
          />
          <BasicButton
            className="drawerButton"
            onClick={handleUpdateComments}
            name="Save"
          />
          <BasicButton
            className="drawerButton"
            onClick={handleCancel}
            name="cancel"
          />
          {editCardData?.comments?.map((comment) => {
            return <BasicTextField value={comment} readonly />;
          })}
        </Card>
      ) : null}

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
