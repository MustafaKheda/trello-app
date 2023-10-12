import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import "../../assest/Css/TaskHub.scss";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { useDispatch } from "react-redux";
import { handleDeleteCard, handleEditCard } from "../../Store/Action";
import BasicButton from "../../Common/BasicButton";
import CardComponent from "./CardComponent";
import { Typography } from "@mui/material";

function StageList({ id, openDrawerById, cards, cardCount, state }) {
  const { filter } = state;
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    tempData: null,
    anchorEl: null,
    openDailog: false,
    openMenu: false,
  });
  const { tempData, anchorEl, openDailog, openMenu } = open;

  const handleOpenMenu = (event, cardId) => {
    const temp = cards().find((card) => card.id === cardId);
    setOpen((prevOpen) => ({
      ...prevOpen,
      anchorEl: event.currentTarget,
      tempData: temp,
      openMenu: true,
    }));
  };

  const handleEditStage = (data, type) => {
    openDrawerById(id);
    dispatch(handleEditCard(data, type));
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      anchorEl: null,
      openMenu: false,
    }));
  };

  const handleCloseDialogBox = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      openDailog: false,
      tempData: null,
    }));
  };

  const handelOpenDailogBox = () => {
    handleCloseMenu();
    setOpen((prevOpen) => ({
      ...prevOpen,
      openDailog: true,
    }));
  };

  const handleDelete = () => {
    handleCloseMenu();
    dispatch(handleDeleteCard(tempData.id));
    handleCloseDialogBox();
  };

  return (
    <Card elevation={0} className="taskHubCard size">
      <CardActions disableSpacing className="taskHubAction">
        <BasicButton
          variant="contained"
          className="taskHubButton"
          startIcon={<AddIcon />}
          onClick={() => openDrawerById(id)}
          name="Add card"
        />
      </CardActions>
      <Droppable droppableId={id} key={id} type="card">
        {(provided) => (
          <CardContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="taskHubCardContent"
          >
            {cardCount > 0 ? (
              cards().map((card, index) => {
                return id === card.stageId && !card.isDelete ? (
                  <Draggable draggableId={card.id} key={card.id} index={index}>
                    {(provided) => (
                      <CardComponent
                        index={index}
                        provided={provided}
                        card={card}
                        handleOpenMenu={handleOpenMenu}
                        handleEditStage={handleEditStage}
                      />
                    )}
                  </Draggable>
                ) : null;
              })
            ) : filter ? (
              <Typography textAlign={"center"}>No Card Found</Typography>
            ) : (
              <Typography textAlign={"center"}>No card exists!</Typography>
            )}
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>
      <Dialog
        open={openDailog}
        onClose={handleCloseDialogBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this card"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you want to delete this card click on Agree button else on
            Disagree
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BasicButton
            className="taskHubStageButton"
            onClick={handleCloseDialogBox}
            name="Disagree"
          />

          <BasicButton
            className="taskHubStageButton"
            name="Agree"
            onClick={handleDelete}
            autoFocus
          />
        </DialogActions>
      </Dialog>

      <Menu
        id={`basic-menu`}
        anchorEl={anchorEl}
        open={openMenu}
        disableScrollLock={true}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleEditStage(tempData, "editMode")}>
          Edit
        </MenuItem>
        <MenuItem onClick={handelOpenDailogBox}>Delete</MenuItem>
      </Menu>
    </Card>
  );
}

export default StageList;
