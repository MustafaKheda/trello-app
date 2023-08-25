import react, { useState, forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Divider, TextField } from "@mui/material";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { handleSetStage } from "../../Store/Action";
import { SwatchesPicker } from "./SwatchesPicker";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Model({ buttonRef, close, open, userID }) {
  const dispatch = useDispatch();
  const [stage, setStage] = useState({
    id: uuid().slice(0, 18),
    userID,
    name: "",
    items: [],
    color: "",
    isDeleted: false,
  });
  const { color } = stage;
  const handleChange = (e) => {
    console.log(e.target.value);
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
    }));
    close();
  };

  const handleSubmit = (e) => {
    console.log(buttonRef);
    dispatch(handleSetStage(stage));
    setStage((prevStage) => ({
      ...prevStage,
      id: uuid().slice(0, 18),
      userID,
      name: "",
      color: "#000",
    }));
    buttonRef?.current.scrollIntoView({ behavior: "smooth" });
    close();
  };
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
        <DialogTitle>{"Create Stage's"}</DialogTitle>
        <Divider />
        <DialogContent className="dialogBoxContent">
          <TextField
            value={stage.name}
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
    </>
  );
}

export default Model;
