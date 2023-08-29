import react, { useState, forwardRef, useEffect } from "react";
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Model({ close, open, currentUser }) {
  const { id: userId, username } = currentUser;
  const editStageData = useSelector(
    (store) => store?.trelloStage?.editStageData
  );

  const dispatch = useDispatch();

  const [stage, setStage] = useState({
    id: uuid().slice(0, 18),
    userId,
    name: "",
    color: "#000",
    isDeleted: false,
    openBar: false,
    type: "",
    createdBy: "",
    createdAt: "",
    modifiedBy: "",
    modifiedAt: "",
  });

  useEffect(() => {
    if (editStageData !== null) {
      setStage((prv) => ({
        ...prv,
        id: editStageData?.id || uuid().slice(0, 18),
        name: editStageData?.name || "",
        color: editStageData?.color || "#000",
        openBar: false,
        type: "",
        userId: editStageData?.userId,
        isDeleted: editStageData?.isDeleted || false,
        createdBy: editStageData?.createdBy,
        createdAt: editStageData?.createdAt,
      }));
    }
  }, [editStageData]);
  const { id, color, name, openBar, type, createdAt, modifiedAt } = stage;

  const handleChange = (e) => {
    setStage((prevStage) => ({
      ...prevStage,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClose = () => {
    dispatch(unSetEditStage());
    resetStage();
    close();
  };
  const handleCloseSnackbar = () => {
    setStage((prvstage) => ({
      ...prvstage,
      openBar: false,
      type: "",
    }));
  };

  const handleSubmit = () => {
    if (name !== "") {
      // console.log(sta);
      dispatch(handleSetStage(stage, username));
      setStage((prevStage) => ({
        ...prevStage,
        id: uuid().slice(0, 18),
      }));
      handleClose();
    } else {
      setStage((prvStage) => ({
        ...prvStage,
        openBar: true,
        type: "emptyModel",
      }));
    }
  };
  const resetStage = () => {
    setStage({
      id: uuid().slice(0, 18),
      userId: "",
      name: "",
      color: "#000",
      isDeleted: false,
      openBar: false,
      type: "",
      createdBy: "",
      createdAt: "",
      modifiedBy: "",
      modifiedAt: "",
    });
  };
  const handleUpdate = () => {
    console.log(stage);
    dispatch(handleUpdateStage(stage, username));
    handleClose();
  };
  useEffect(() => {
    if (editStageData === null) {
      setStage((prevStage) => ({
        ...prevStage,
        userId,
      }));
    }
  }, [userId]);
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
            Create Stage
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className="dialogBoxContent">
          <TextField
            value={name}
            fullWidth
            name="name"
            label="Title"
            placeholder="Title"
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
