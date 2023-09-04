import React, { useState, forwardRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Divider, Snackbar, TextField, Typography } from "@mui/material";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSetStage,
  handleUpdateStage,
  unSetEditStage,
} from "../../Store/Action";
import { SwatchesPicker } from "./SwatchesPicker";
import { messageMap } from "../../Common/Constant";
import BasicTextField from "../../Common/BasicTextField";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Model({ close, open, currentUser }) {
  const dispatch = useDispatch();
  const editStageData = useSelector(
    (store) => store?.trelloStage?.editStageData
  );

  const { id: userId, username } = currentUser;

  const [stage, setStage] = useState({
    id: uuid().slice(0, 18),
    userId,
    name: "",
    color: "#000",
    isDelete: false,
    openBar: false,
    type: "",
    createdBy: "",
    createdAt: "",
    modifiedBy: "",
    modifiedAt: "",
  });

  useEffect(() => {
    if (editStageData !== null) {
      setStage((prevStage) => ({
        ...prevStage,
        id: editStageData?.id,
        name: editStageData?.name || "",
        color: editStageData?.color || "#000",
        userId: editStageData?.userId,
        isDelete: editStageData?.isDelete || false,
        createdBy: editStageData?.createdBy,
        createdAt: editStageData?.createdAt,
        modifiedAt: editStageData?.modifiedAt,
        modifiedBy: editStageData?.modifiedBy,
      }));
    }
  }, [editStageData]);

  const {
    id,
    color,
    name,
    openBar,
    type,
    isDelete,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
  } = stage;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStage((prevStage) => ({
      ...prevStage,
      [name]: value,
    }));
  };
  // Close Dialog Box
  const handleClose = () => {
    dispatch(unSetEditStage());
    resetStage();
    close();
  };

  const handleCloseSnackbar = () => {
    setStage((prevStage) => ({
      ...prevStage,
      openBar: false,
      type: "",
    }));
  };

  const handleFormSubmission = (event, isUpdate = false) => {
    event.preventDefault();

    if (name !== "") {
      const actionFunction = isUpdate ? handleUpdateStage : handleSetStage;

      dispatch(
        actionFunction(
          {
            id,
            color,
            name,
            isDelete,
            createdAt,
            createdBy,
            modifiedAt,
            modifiedBy,
            userId: isUpdate ? stage.userId : userId,
          },
          username
        )
      );

      handleClose();
    } else {
      setStage((prevStage) => ({
        ...prevStage,
        openBar: true,
        type: "emptyModel",
      }));
    }
  };

  const handleSubmit = (event) => {
    handleFormSubmission(event);
  };

  const handleUpdate = (event) => {
    handleFormSubmission(event, true);
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (name !== "") {
  //     dispatch(
  //       handleSetStage(
  //         {
  //           id,
  //           color,
  //           name,
  //           isDelete,
  //           createdAt,
  //           createdBy,
  //           modifiedAt,
  //           modifiedBy,
  //           userId: stage.userId,
  //         },
  //         username
  //       )
  //     );
  //     handleClose();
  //   } else {
  //     setStage((prvStage) => ({
  //       ...prvStage,
  //       openBar: true,
  //       type: "emptyModel",
  //     }));
  //   }
  // };
  // const handleUpdate = (event) => {
  //   event.preventDefault();
  //   dispatch(handleUpdateStage(stage, username));
  //   handleClose();
  // };

  const resetStage = () => {
    setStage((prevStage) => ({
      ...prevStage,
      id: uuid().slice(0, 18),
      name: "",
      color: "#000",
      isDelete: false,
      openBar: false,
      type: "",
      createdBy: "",
      createdAt: "",
      modifiedBy: "",
      modifiedAt: "",
    }));
  };

  useEffect(() => {
    if (editStageData === null) {
      setStage((prevStage) => ({
        ...prevStage,
        userId,
      }));
    }
  }, [userId]);

  const isEditMode = editStageData !== null;

  return (
    <>
      <Dialog
        maxWidth={"sm"}
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography fontWeight={"600"} textTransform={"uppercase"}>
            {isEditMode ? "Edit Stage" : "Create Stage"}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className="dialogBoxContent">
          <BasicTextField
            value={name}
            fullWidth
            name="name"
            label="Title"
            onChange={handleChange}
          />
          <SwatchesPicker color={color} onChange={setStage} />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button className="trelloStageButton" onClick={handleClose}>
            cancel
          </Button>
          <Button
            className="trelloStageButton"
            onClick={editStageData ? handleUpdate : handleSubmit}
          >
            {editStageData ? "Update" : "submit"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openBar}
        onClose={handleCloseSnackbar}
        message={messageMap[type]}
      />
    </>
  );
}

export default Model;
