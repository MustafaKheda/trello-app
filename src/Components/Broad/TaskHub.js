import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../assest/Css/TaskHub.scss";
import Header from "../Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  editStage,
  handleChangeCard,
  handleChangeStage,
  handleDeleteStage,
} from "../../Store/Action";
import CardDrawer from "./CardDrawer";
import Model from "./Model";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import BasicButton from "../../Common/BasicButton";
import { useNavigate } from "react-router";
import RenderStage from "./RenderStage";
function TaskHub() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cards = useSelector((store) => store.trelloStage.card);
  const currentUser = useSelector((state) => state.userStore.currentUser);
  const stages = useSelector((state) => state.trelloStage.stages);

  const [open, setOpen] = useState({
    openDrawer: false,
    openModel: false,
    openDailog: false,
    drawerStageId: null,
    tempStage: null,
    anchorEl: null,
    openMenu: false,
  });

  const {
    drawerStageId,
    openModel,
    openDrawer,
    tempStage,
    openDailog,
    anchorEl,
    openMenu,
  } = open;

  useEffect(() => {
    if (Object.keys(currentUser).length <= 0) {
      navigate("/");
    }
  }, [currentUser]);

  // useEffect(() => {
  //   const scrollBarExists =
  //     window.getComputedStyle(document.documentElement).scrollbarWidth !==
  //     "none";
  //   // Get the .trelloBody element
  //   const trelloBody = document.querySelector("#trelloBody");
  //   // Add or remove the 'scrollbar-exists' class based on scrollbar existence
  //   if (scrollBarExists) {
  //     trelloBody?.classList.add("scrollbar-exists");
  //   } else {
  //     trelloBody?.classList.remove("scrollbar-exists");
  //   }
  // }, [stages]);

  const handleClickOpenModel = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      openModel: true,
    }));
  };

  const handleClose = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      openModel: false,
    }));
  };

  const handleDrawerOpen = (stageId) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      openDrawer: true,
      drawerStageId: stageId,
    }));
  };

  const handleDrawerClose = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      openDrawer: false,
    }));
  };

  const handleDragDrop = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    if (type === "group") {
      // Handle Stage drag-and-drop
      const newStages = [...stages];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedStage] = newStages.splice(sourceIndex, 1);
      newStages.splice(destinationIndex, 0, removedStage);
      return dispatch(handleChangeStage(newStages));
    }

    if (type === "card") {
      const newCards = [...cards];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      // Remove the dragged card from its source position
      const [draggedCard] = newCards.splice(sourceIndex, 1);

      // Set the new stageId for the dragged card
      draggedCard.stageId = destination.droppableId;

      if (source.droppableId === destination.droppableId) {
        newCards.splice(destinationIndex, 0, draggedCard);
        return dispatch(handleChangeCard(newCards));
      }

      // Calculate the insertion index
      let insertionIndex =
        sourceIndex >= destinationIndex
          ? destinationIndex
          : destinationIndex - 1;

      // Insert the dragged card at the calculated index
      newCards.splice(insertionIndex, 0, draggedCard);
      // Dispatch the updated card list
      dispatch(handleChangeCard(newCards));
    }
  };

  const handleEditStage = (stage) => {
    handleClickOpenModel();
    dispatch(editStage(stage));
    handleCloseMenu();
  };

  const handleOpenMenu = (event, stageId) => {
    const tempData = stages.find((stage) => stage.id === stageId);
    setOpen((prevOpen) => ({
      ...prevOpen,
      anchorEl: event.currentTarget,
      tempStage: tempData,
      openMenu: true,
    }));
  };

  const handleCloseMenu = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      anchorEl: null,
      openMenu: false,
    }));
  };

  const handelOpenDeleteDailogBox = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      openDailog: true,
    }));
    handleCloseMenu();
  };

  const handleCloseDialogBox = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      openDailog: false,
      tempStage: null,
    }));
  };

  const handleDelete = () => {
    handleCloseMenu();
    dispatch(handleDeleteStage(tempStage.id));
    handleCloseDialogBox();
  };

  return Object.keys(currentUser).length > 0 ? (
    <>
      <div id="trelloBody" className="trelloBody">
        <Header />
        <BasicButton
          className="trelloStageButton"
          variant="outlined"
          onClick={handleClickOpenModel}
          name="Create Stage"
        />

        <Model close={handleClose} open={openModel} currentUser={currentUser} />

        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="ROOT" type="group" direction="horizontal">
            {(provided) => (
              <div
                className="cardContainer"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {stages &&
                  stages?.map((stage, index) => {
                    return !stage.isDelete &&
                      stage.userId === currentUser.id ? (
                      <Draggable
                        draggableId={stage.id}
                        key={stage.id}
                        index={index}
                      >
                        {(provided) => {
                          return (
                            <RenderStage
                              provided={provided}
                              stage={stage}
                              index={index}
                              cards={cards}
                              handleOpenMenu={handleOpenMenu}
                              handleDrawerOpen={handleDrawerOpen}
                            />
                          );
                        }}
                      </Draggable>
                    ) : null;
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <CardDrawer
        stageId={drawerStageId}
        currentUser={currentUser}
        open={openDrawer}
        close={handleDrawerClose}
      />

      <Dialog
        open={openDailog}
        onClose={handleCloseDialogBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you Want to delete the Stage"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you want to delete this stage click on Agree button else on
            Disagree
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BasicButton
            className="trelloStageButton"
            onClick={handleCloseDialogBox}
            name="Disagree"
          />
          <BasicButton
            className="trelloStageButton"
            onClick={handleDelete}
            autoFocus
            name="Agree"
          />
        </DialogActions>
      </Dialog>
      <Menu
        id={`basic-menu`}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleEditStage(tempStage)}>Edit</MenuItem>
        <MenuItem onClick={handelOpenDeleteDailogBox}>Delete</MenuItem>
      </Menu>
    </>
  ) : null;
}
export default TaskHub;
