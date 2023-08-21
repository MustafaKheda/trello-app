import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Divider, TextField } from "@mui/material";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { handleSetStage } from "../../store/action";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Model({ handleClose, open, userID }) {
  const dispatch = useDispatch();
  const [stage, setStage] = React.useState({
    id: uuid().slice(0, 18),
    userID,
    name: "",
    items: [],
    color: "",
    isDeleted: false,
  });
  const handleChange = (e) => {
    setStage((prevStage) => ({
      ...prevStage,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    console.log(stage);
    dispatch(handleSetStage(stage));
    setStage((prevStage) => ({
      ...prevStage,
      id: uuid().slice(0, 18),
      name: "",
      color: "",
    }));
    handleClose();
  };

  return (
    <div>
      <Dialog
        maxWidth={"sm"}
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Create Stage's"}</DialogTitle>
        <Divider />
        <DialogContent className="dialogBoxContent">
          <TextField
            value={stage.name}
            name="name"
            placeholder="Title"
            onChange={handleChange}
          />
          <TextField
            value={stage.color}
            name="color"
            placeholder="Colour"
            onChange={handleChange}
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleSubmit}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Model;
