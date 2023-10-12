import React, { useState, forwardRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
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
    (store) => store?.taskhubStage?.editStageData
  );

  const { id: userId, firstName, lastName } = currentUser;
  const fullName = `${firstName} ${lastName}`;

  const [stage, setStage] = useState({
    id: "",
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
    setTimeout(() => {
      setStage((prevStage) => ({
        ...prevStage,
        type: "",
      }));
    }, 5000);
  }, [stage.type]);

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
      type: "",
    }));
  };

  const handleFormSubmission = (event, isUpdate = false) => {
    event.preventDefault();
    console.log(fullName);
    if (name !== "") {
      const actionFunction = isUpdate ? handleUpdateStage : handleSetStage;
      dispatch(
        actionFunction({
          id,
          color,
          name,
          isDelete,
          createdAt,
          createdBy: fullName,
          modifiedAt,
          modifiedBy,
          userId: isUpdate ? stage.userId : userId,
        }),
        firstName
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

  const resetStage = () => {
    setStage((prevStage) => ({
      ...prevStage,
      id: "",
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
            InputLabelProps={{
              shrink: true,
            }}
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
          <Typography color={"red"} className="errorMsgStage">
            {messageMap[type]}
          </Typography>
          <Button className="taskHubStageButton" onClick={handleClose}>
            cancel
          </Button>
          <Button
            className="taskHubStageButton"
            onClick={editStageData ? handleUpdate : handleSubmit}
          >
            {editStageData ? "Update" : "submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Model;
