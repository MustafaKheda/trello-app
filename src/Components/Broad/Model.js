import react, { useState, forwardRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Divider, Snackbar, TextField } from "@mui/material";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { handleSetStage } from "../../Store/Action";
import { SwatchesPicker } from "./SwatchesPicker";
import { messageMap } from "../../Common/Constant";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Model({ buttonRef, close, open, currentUser }) {
  const { id: userId, username } = currentUser;
  const dispatch = useDispatch();
  const [stage, setStage] = useState({
    id: uuid().slice(0, 18),
    name: "",
    color: "#000",
    isDeleted: false,
    openBar: false,
    type: "",
    createdBy: new Date(),
    createdAt: username,
    modifiedBy: "",
    modifiedAt: "",
  });
  const {
    id,
    color,
    name,
    openBar,
    type,
    isDeleted,
    createdBy,
    createdAt,
    modifiedBy,
    modifiedAt,
  } = stage;
  console.log(createdBy, createdAt);
  const handleSetDate = () => {
    if (createdAt) {
      setStage((prevStage) => ({
        ...prevStage,
        modifiedAt: new Date(),
        modifiedBy: username,
      }));
    } else {
      console.log("success");
      setStage((prevStage) => ({
        ...prevStage,
        createdAt: new Date(),
        createdBy: username,
      }));
    }
  };
  const handleChange = (e) => {
    setStage((prevStage) => ({
      ...prevStage,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClose = () => {
    setStage((prevStage) => ({
      ...prevStage,
      name: "",
      color: "",
      createdAt: "", // Reset the createdAt field
      createdBy: "", // Reset the createdBy field
      modifiedAt: "", // Reset the modifiedAt field
      modifiedBy: "", // Reset the modifiedBy field
    }));
    close();
  };
  const handleCloseSnackbar = () => {
    setStage((stage) => ({
      ...stage,
      openBar: false,
      type: "",
    }));
  };
  console.log(stage);
  const handleSubmit = (e) => {
    handleSetDate();
    if (name !== "") {
      console.log(stage);
      dispatch(
        handleSetStage({
          userId,
          id,
          color,
          name,
          isDeleted,
          createdAt: stage.createdAt, // Use the updated createdAt value
          modifiedAt: stage.modifiedAt, // Use the updated modifiedAt value
          createdBy: stage.createdBy, // Use the updated createdBy value
          modifiedBy: stage.modifiedBy, // Use the updated modifiedBy value,
        })
      );
      setStage((prevStage) => ({
        ...prevStage,
        id: uuid().slice(0, 18),
      }));
      buttonRef?.current.scrollIntoView({ behavior: "smooth" });
    } else {
      setStage((prvStage) => ({
        ...prvStage,
        openBar: true,
        type: "emptyModel",
      }));
    }
    handleClose();
  };
  useEffect(() => {
    setStage((prevStage) => ({
      ...prevStage,
      userId,
    }));
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
        <DialogTitle>{"Create Stage"}</DialogTitle>
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
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleSubmit}>submit</Button>
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
