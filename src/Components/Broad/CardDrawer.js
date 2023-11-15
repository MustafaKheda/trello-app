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
import { Avatar, Typography } from "@mui/material";

function CardDrawer({ open, close, currentUser, stageId, commentSection }) {
  console.log(commentSection);
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

  const letter = currentUser?.firstName
    ? `${currentUser?.firstName
        ?.slice(0, 1)
        ?.toUpperCase()}${currentUser?.lastName?.slice(0, 1)?.toUpperCase()}`
    : "U";

  const [card, setCard] = useState({
    timerId: null,
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
    history: {
      id: uuid().slice(0, 18),
      createdAt: "",
      desc: "",
      type: "",
      title: "",
    },
    tempArray: [],
    historyArray: [],
    isHistoryShowing: false,
  });
  useEffect(() => {
    if (commentSection === true) {
      handleChangeComment();
    }
  }, [commentSection]);
  const {
    timerId,
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
    history,
    historyArray,
    tempArray,
    isHistoryShowing,
  } = card;

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
          commentText: "",
          isDelete: false,
        },
      }));
    }
  }, [stageId, userId, editCardData]);

  useEffect(() => {
    console.log("update edit card", editCardData);
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
        historyArray: editCardData?.historyArray,
      }));
    }
  }, [editCardData]);

  useEffect(() => {
    console.log("update comment", editCardData);
    if (editCardData !== null) {
      setCard((prv) => ({
        ...prv,
        comments: [...editCardData?.comments],
      }));
    }
  }, [editCardData?.comments]);

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

  useEffect(() => {
    if (history?.type === "" || history?.type === "comment") {
      return;
    }
    const isHistoryInTempArray = tempArray?.some(
      (item) => item?.type === history?.type
    );
    if (isHistoryInTempArray) {
      const updatedTempArray = tempArray?.map((item) => {
        if (item?.type === history.type) {
          if (editCardData[history.type]?.trim() !== history?.title?.trim()) {
            return history;
          }
          return;
        } else {
          return item;
        }
      });
      console.log("true", history);
      setCard((prevCard) => ({
        ...prevCard,
        tempArray: updatedTempArray?.filter((item) => item !== undefined), // Remove undefined items
      }));
    } else {
      console.log("else", history);
      setCard((prevCard) => ({
        ...prevCard,
        tempArray: [history, ...tempArray],
      }));
    }
  }, [history]);

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
        ...card.comment,
      },
      history: {
        id: uuid().slice(0, 18),
        title: "",
        desc: "",
        createdAt: "",
        type: "",
      },
      comments: [],
      type: "",
      isDelete: false,
      isDisable: false,
      createdBy: "",
      createdAt: "",
      modifiedBy: "",
      modifiedAt: "",
      historyArray: [],
      tempArray: [],
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

  const handleUpdateChange = (e) => {
    clearTimeout(timerId);
    setCard((prevCard) => ({
      ...prevCard,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "assignTo" || e.target.name === "dueDate") {
      handleCreateHistory(e.target);
      return;
    }
    const id = setTimeout(() => {
      console.log(e.target);
      handleCreateHistory(e.target);
    }, 1000);
    setCard((prevCard) => ({
      ...prevCard,
      timerId: id,
    }));
  };

  const handleCreateHistory = (target) => {
    // to handle Assingee
    if (target.name === "assignTo") {
      return setCard((prevCard) => ({
        ...prevCard,
        history: {
          id: uuid().slice(0, 18),
          createdAt: new Date(),
          type: target.name,
          desc: target.value,
          title: `Assignee changed`,
        },
      }));
    } else if (target.name === "dueDate") {
      return setCard((prevCard) => ({
        ...prevCard,
        history: {
          id: uuid().slice(0, 18),
          createdAt: new Date(),
          type: target.name,
          desc: target.value,
          title: `Due Date changed`,
        },
      }));
    } else {
      setCard((prevCard) => ({
        ...prevCard,
        history: {
          id: uuid().slice(0, 18),
          createdAt: new Date(),
          type: target.name,
          desc: target.value,
          title: `${target.name} changed`,
        },
      }));
    }
  };

  //Set comment to state
  const handleComment = (e) => {
    const { name, value } = e.target;
    setCard((prevCard) => ({
      ...prevCard,
      comment: {
        ...comment,
        commentText: value,
      },
      history: {
        id: uuid().slice(0, 18),
        createdAt: new Date(),
        type: name,
        desc: value,
        title: `Comment Created`,
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
    console.log("historyArray", historyArray);
    console.log("tempArray", tempArray);
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
              historyArray: [...tempArray, ...historyArray],
            },
            fullName,
            {
              id: uuid().slice(0, 18),
              createdAt: new Date(),
              type: "created",
              title: "Card created SuccessFully",
            }
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
    if (
      editCardData.description === description &&
      editCardData.title === title &&
      editCardData.assignTo === assignTo &&
      editCardData.dueDate === dueDate
    ) {
      return;
    }
    handleFormSubmit(true);
  };

  const handleUpdateComments = (e, history) => {
    if (comment.commentText !== "" && history.type !== "") {
      console.log(history);
      dispatch(handleUpdateComment({ id, comment }, history));
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

  const handleChangeHistory = () => {
    setCard((prevCard) => ({
      ...prevCard,
      isHistoryShowing: true,
    }));
  };

  const handleChangeComment = () => {
    setCard((prevCard) => ({
      ...prevCard,
      isHistoryShowing: false,
    }));
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
          onChange={editCardData ? handleUpdateChange : handleChange}
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
          onChange={editCardData ? handleUpdateChange : handleChange}
          variant="standard"
          multiline
          minRows={2}
          maxRows={4}
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
          onChange={editCardData ? handleUpdateChange : handleChange}
        />

        {users?.length > 1 ? (
          <TextField
            id="assignTo"
            key="assignTo"
            color="secondary"
            className="cardDrawerTextField"
            select
            name="assignTo"
            label="Assign To"
            value={assignTo}
            onChange={editCardData ? handleUpdateChange : handleChange}
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
            <ButtonGroup className="sectionButtonGroup">
              <BasicButton
                className={`${
                  isHistoryShowing ? null : "borderBottom"
                } sectionButton`}
                onClick={handleChangeComment}
                name={"Comment"}
              />
              <BasicButton
                className={`${
                  isHistoryShowing ? "borderBottom" : null
                } sectionButton`}
                onClick={handleChangeHistory}
                name={"history"}
              />
            </ButtonGroup>
            {isHistoryShowing ? (
              <div className="historySection">
                {editCardData?.historyArray?.map((history, index) => {
                  const { title, createdAt } = history;
                  const time = new Date(createdAt);
                  time.setHours(time.getHours() + 5);
                  time.setMinutes(time.getMinutes() + 30);
                  const newDate = new Date(time).toISOString();
                  // const time = new Date(createdAt).toLocaleString(undefined, {
                  //   timeZone: "Asia/Kolkata",
                  // });
                  // console.log(history?.createdAt);
                  return createdAt ? (
                    <div className="historyBox">
                      <Avatar className="headerAvatar">{letter || "U"}</Avatar>
                      <Typography className="historyTitle">{title}</Typography>
                      {createdAt && (
                        <Typography variant="subtitle2">
                          on {newDate?.slice(0, 10)} at {newDate?.slice(11, 16)}
                        </Typography>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <>
                <div className="commentSection">
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
                      onClick={(e) => handleUpdateComments(e, history)}
                      name="Save"
                    />
                  </div>
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
                                dispatch(
                                  deleteComment(comment.id, editCardData.id, {
                                    id: uuid().slice(0, 18),
                                    createdAt: new Date(),
                                    type: "comment",
                                    title: "Comment Deleted",
                                  })
                                )
                              }
                              className="commentDeleteIcon"
                            />
                          ),
                        }}
                      />
                    ) : null;
                  })}
                </div>
              </>
            )}
          </>
        ) : null}

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
