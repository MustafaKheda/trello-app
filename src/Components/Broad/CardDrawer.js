import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";
import "../../assest/Css/Trello.scss";
import { useTheme } from "@emotion/react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Close";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  handleSetCard,
  handleUnsetEditCard,
  handleUpdateCard,
  handleUpdateComment,
} from "../../Store/Action";
import BasicButton from "../../Common/BasicButton";
import BasicTextField from "../../Common/BasicTextField";
import { messageMap } from "../../Common/Constant";

function CardDrawer({ open, close, currentUser, stageId }) {
  const users = useSelector((store) => store?.userStore.users);
  const editCardData = useSelector((store) => store?.trelloStage?.editCardData);
  const isEditMode = editCardData !== null;

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
    comment: {
      id: uuid().slice(0, 18),
      userId,
      username,
      commentText: "",
      isDelete: false,
    },
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
    if (isEditMode) {
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
  }, [editCardData, editCardData?.comments]);

  const handleCloseSnackbar = () => {
    setCard({
      ...card,
      openBar: false,
      type: "",
    });
  };

  const resetCard = () => {
    setCard((prevCard) => ({
      ...prevCard,
      id: uuid().slice(0, 18),
      userId,
      stageId,
      assignTo: "",
      title: "",
      description: "",
      dueDate: "",
      comment: {
        id: uuid().slice(0, 18),
        userId,
        username,
        commentText: "",
        isDelete: false,
      },
      comments: [],
      type: "",
      isDelete: false,
      openBar: false,
      createdBy: "",
      createdAt: "",
      modifiedBy: "",
      modifiedAt: "",
    }));
  };
  const handleClose = () => {
    dispatch(handleUnsetEditCard());
    resetCard();
    close();
  };
  const handleChange = (e) => {
    setCard((prevCard) => ({
      ...prevCard,
      [e.target.name]: e.target.value,
    }));
  };
  const handleComment = (e) => {
    setCard((prevCard) => ({
      ...prevCard,
      comment: {
        ...comment,
        commentText: e.target.value,
      },
    }));
  };
  const handleCheckDueDate = () => {
    const enteredDate = new Date(dueDate);
    let currentDate = new Date();
    const editDueDate = new Date(editCardData?.dueDate);
    if (isEditMode && currentDate > editDueDate) {
      currentDate = editDueDate;
    }
    return (
      Date.parse(enteredDate.toString().slice(0, 10)) >=
      Date.parse(currentDate.toString().slice(0, 10))
    );
  };

  const handleFormSubmit = (isUpdate = false) => {
    if (title.trim() !== "" && description !== "" && dueDate !== "") {
      if (handleCheckDueDate()) {
        const actionFunction = isUpdate ? handleUpdateCard : handleSetCard;
        dispatch(actionFunction(card, username));
        handleClose();
      } else {
        setCard((prevCard) => ({
          ...prevCard,
          openBar: true,
          type: "invalidDueDate",
        }));
      }
    } else {
      setCard((prevCard) => ({
        ...prevCard,
        openBar: true,
        type: "emptyCardForm",
      }));
    }
  };

  const handleSubmit = (e) => {
    handleFormSubmit();
  };

  const handleUpdate = (e) => {
    handleFormSubmit(true);
  };

  useEffect(() => {
    if (editCardData === null) {
      setCard((prevCard) => ({
        ...prevCard,
        assignBy: username,
        userId,
        stageId,
        comment: {
          id: uuid().slice(0, 18),
          userId,
          username,
          commentText: "",
          isDelete: false,
        },
      }));
    }
    if (isEditMode) {
      setCard((prevCard) => ({
        ...prevCard,
        comment: {
          id: uuid().slice(0, 18),
          userId,
          username,
          commentText: "",
          isDelete: false,
        },
      }));
    }
  }, [stageId, userId, editCardData]);

  const handleUpdateComments = () => {
    if (comment.commentText !== "") {
      dispatch(handleUpdateComment({ id, comment }));
      setCard((prevCard) => ({
        ...prevCard,
        comment: {
          id: uuid().slice(0, 18),
          userId,
          username,
          commentText: "",
          isDelete: false,
        },
      }));
    } else {
      setCard((prevCard) => ({
        ...prevCard,
        openBar: true,
        type: "emptyComment",
      }));
    }
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
          id="title"
          key="title"
          color="secondary"
          className="cardDrawerTextField"
          value={title}
          name="title"
          label="Title"
          onChange={handleChange}
          variant="standard"
        />
        <BasicTextField
          id="title"
          key="description"
          color="secondary"
          className="cardDrawerTextField"
          value={description}
          name="description"
          label="Description"
          onChange={handleChange}
          variant="standard"
        />
        <BasicTextField
          id="dueDate"
          key="dueDate"
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
        {users.length > 1 ? (
          <TextField
            id="assignTo"
            key="assignTo"
            color="secondary"
            className="cardDrawerTextField"
            select
            name="assignTo"
            label="Assign To"
            value={assignTo}
            onChange={handleChange}
            variant="standard"
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
        ) : null}

        {editCardData ? (
          <>
            <div className="commentTextFieldBox">
              <BasicTextField
                id="comment"
                key="comment"
                label="Comment"
                value={comment.commentText}
                name="comment"
                onChange={handleComment}
                variant="standard"
                className="cardDrawerTextField"
                inputProps={{
                  disableUnderline: true,
                }}
              />
              <BasicButton
                className="drawerButton"
                onClick={handleUpdateComments}
                name="Save"
              />
            </div>
          </>
        ) : null}
        <div className="commentSection">
          {editCardData?.comments?.map((comment) => {
            return !comment?.isDelete ? (
              <BasicTextField
                className="commentTextField"
                value={comment?.commentText}
                readOnly
                InputProps={{
                  endAdornment: (
                    <DeleteIcon
                      onClick={() =>
                        dispatch(deleteComment(comment.id, editCardData.id))
                      }
                      className="commentDeleteIcon"
                    />
                  ),
                }}
              />
            ) : null;
          })}
        </div>
        <ButtonGroup className="drawerButtonGroup">
          <BasicButton
            onClick={editCardData ? handleUpdate : handleSubmit}
            name={editCardData ? "update" : "submit"}
            className="drawerButton"
          />
          <BasicButton
            className="drawerButton"
            onClick={handleClose}
            name={"cancel"}
          />
        </ButtonGroup>
      </Card>
      {/*
        <Card className="commentCard" elevation={0}>
          
        </Card>
      ) : null} */}

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
