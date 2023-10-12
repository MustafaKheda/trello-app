import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";
import "../../assest/Css/TaskHub.scss";
import { useTheme } from "@emotion/react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Close";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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
import { Typography } from "@mui/material";

function CardDrawer({ open, close, currentUser, stageId }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const users = useSelector((store) => store?.userStore.users);
  const editCardData = useSelector(
    (store) => store?.taskhubStage?.editCardData
  );
  let isCommentMode = false;
  const isEditMode = editCardData ? true : false;
  isCommentMode = editCardData?.type === "commentMode";

  const { id: userId, firstName, lastName } = currentUser;
  const fullName = `${firstName} ${lastName}`;
  const [card, setCard] = useState({
    id: uuid().slice(0, 18),
    userId,
    stageId: "",
    assignBy: fullName,
    assignTo: "",
    title: "",
    description: "",
    dueDate: "",
    comment: {
      id: uuid().slice(0, 18),
      userId,
      fullName,
      commentText: "",
      isDelete: false,
    },
    comments: [],
    type: "",
    isDelete: false,
    isDisable: false,
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
    isDisable,
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
        comments: [...editCardData?.comments],
        isDelete: editCardData?.isDelete,
        createdBy: editCardData?.createdBy || "",
        createdAt: new Date(editCardData?.createdAt) || "",
        modifiedBy: editCardData?.modifiedBy || "",
        modifiedAt: editCardData?.modifiedAt || "",
      }));
    }
  }, [editCardData, editCardData?.comments]);
  useEffect(() => {
    const drawerTimerId = setTimeout(() => {
      setCard((prevCard) => ({
        ...prevCard,
        type: "",
      }));
    }, 5000);
    return () => {
      clearTimeout(drawerTimerId);
    };
  }, [type]);

  // const handleCloseSnackbar = () => {
  //   setCard({
  //     ...card,
  //     openBar: false,
  //     type: "",
  //   });
  // };

  // Reset to initial state
  const resetCard = () => {
    return setCard((prevCard) => ({
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
        fullName,
        commentText: "",
        isDelete: false,
      },
      comments: [],
      type: "",
      isDelete: false,
      isDisable: false,
      createdBy: "",
      createdAt: "",
      modifiedBy: "",
      modifiedAt: "",
    }));
  };

  // To close drawer
  const handleClose = () => {
    dispatch(handleUnsetEditCard());
    resetCard();
    return close();
  };

  const handleChange = (e) => {
    setCard((prevCard) => ({
      ...prevCard,
      [e.target.name]: e.target.value,
    }));
  };

  //Set comment to state
  const handleComment = (e) => {
    setCard((prevCard) => ({
      ...prevCard,
      comment: {
        ...comment,
        commentText: e.target.value,
      },
    }));
  };

  // Check due date
  const handleCheckDueDate = () => {
    const enteredDate = new Date(dueDate);
    let currentDate = new Date();
    const editDueDate = new Date(editCardData?.dueDate);

    //to change least due date
    if (isEditMode && currentDate > editDueDate) {
      currentDate = editDueDate;
    }
    if (
      Date.parse(enteredDate.toString().slice(0, 16)) <
      Date.parse(currentDate.toString().slice(0, 16))
    ) {
      handleAlertMessage("invalidDueDate");
      return false;
    } else if (enteredDate < currentDate) {
      handleAlertMessage("invalidTime");
      return false;
    } else {
      return enteredDate >= currentDate;
    }
  };

  const handleFormSubmit = (isUpdate = false) => {
    if (title.trim() !== "" && description !== "") {
      if (handleCheckDueDate()) {
        // select action function
        isUpdate
          ? handleAlertMessage("cardUpdated", true)
          : handleAlertMessage("cardCreated", true);
        const actionFunction = isUpdate ? handleUpdateCard : handleSetCard;
        dispatch(
          actionFunction(
            {
              assignTo,
              assignBy,
              comments,
              createdAt,
              createdBy,
              description,
              dueDate,
              id,
              isDelete,
              modifiedAt,
              modifiedBy,
              stageId: card.stageId || stageId,
              title,
              userId,
            },
            fullName
          )
        );

        const drawerTimer = setTimeout(() => {
          handleClose();
        }, 1200);
        return () => {
          clearTimeout(drawerTimer);
        };
      }
    } else {
      handleAlertMessage("emptyCardForm");
    }
  };

  const handleAlertMessage = (message, disable = false) => {
    if (disable) {
      setCard((prevCard) => ({
        ...prevCard,
        isDisable: true,
        type: message,
      }));
    }

    setCard((prevCard) => ({
      ...prevCard,
      type: message,
    }));
  };
  const handleSubmit = (e) => {
    handleFormSubmit();
  };

  const handleUpdate = (e) => {
    console.log(editCardData);
    if (
      editCardData.description === description &&
      editCardData.title === title &&
      editCardData.assignTo === assignTo &&
      editCardData.dueDate === dueDate
    ) {
      console.log(card);
      return;
    }
    handleFormSubmit(true);
  };
  // To bind user and stage id
  useEffect(() => {
    if (!isEditMode && !isCommentMode) {
      setCard((prevCard) => ({
        ...prevCard,
        assignBy: fullName,
        userId,
        stageId,
        comment: {
          id: uuid().slice(0, 18),
          userId,
          fullName,
          commentText: "",
          isDelete: false,
        },
      }));
    }
    if (isEditMode || isCommentMode) {
      setCard((prevCard) => ({
        ...prevCard,
        comment: {
          id: uuid().slice(0, 18),
          userId,
          fullName,
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
          fullName,
          commentText: "",
          isDelete: false,
        },
      }));
    } else {
      handleAlertMessage("emptyComment");
    }
  };

  return (
    <Drawer
      key={stageId}
      className="taskHubDrawer"
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
          required
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
          required
          id="description"
          key="description"
          color="secondary"
          className="cardDrawerTextField"
          value={description}
          name="description"
          label="Description"
          onChange={handleChange}
          variant="standard"
          multiline
          minRows={1}
        />
        <BasicTextField
          required
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
              users.map((user) => {
                const fullName = user?.firstName
                  ? `${user?.firstName} ${user?.lastName}`
                  : null;
                return userId !== user.id && fullName !== null ? (
                  <MenuItem key={user.id} value={fullName}>
                    {fullName}
                  </MenuItem>
                ) : null;
              })}
          </TextField>
        ) : null}
        <Typography
          className="errorMsg"
          color={
            type === "cardCreated" || type === "cardUpdated" ? "green" : "red"
          }
        >
          {messageMap[type]}
        </Typography>
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
                key={comment?.id}
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
            disabled={isDisable}
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
    </Drawer>
  );
}

export default CardDrawer;
