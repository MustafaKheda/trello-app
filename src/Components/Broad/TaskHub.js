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
  handleEditUser,
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
import Grid from "@mui/material/Grid";
import BasicTextField from "../../Common/BasicTextField";
import { TextField } from "@mui/material";
function TaskHub() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cards = useSelector((store) => store.taskhubStage.card);
  const currentUser = useSelector((state) => state.userStore.currentUser);
  const stages = useSelector((state) => state.taskhubStage.stages);

  const [open, setOpen] = useState({
    openDrawer: false,
    openModel: false,
    openDailog: false,
    drawerStageId: null,
    tempStage: null,
    anchorEl: null,
    openMenu: false,
    anchorProfile: null,
    openProfile: false,
    title: "",
    name: "",
    date: "",
    filter: false,
  });
  const {
    drawerStageId,
    openModel,
    openDrawer,
    tempStage,
    openDailog,
    anchorEl,
    openMenu,
    anchorProfile,
    openProfile,
    title,
    name,
    date,
    filter,
  } = open;

  useEffect(() => {
    if (Object.keys(currentUser).length <= 0) {
      navigate("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (title !== "" || name !== "" || date !== "") {
      setOpen((prevOpen) => ({
        ...prevOpen,
        filter: true,
      }));
    }
    if (title === "" && name === "" && date === "") {
      setOpen((prevOpen) => ({
        ...prevOpen,
        filter: false,
      }));
    }
  }, [title, name, date]);

  const handleChange = (e) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [e.target.name]: e.target.value,
    }));
  };

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
    const { source, destination, type, draggableId } = result;
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
      const sourceIndex = newCards.findIndex((card) => card.id === draggableId);
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
      anchorProfile: null,
      openProfile: false,
    }));
  };

  const handleOpenProfileMenu = (event) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      anchorProfile: event.currentTarget,
      openProfile: true,
    }));
  };

  // const handleOpenProfilePage = () => {
  //   dispatch(handleEditUser(currentUser.id));
  //   navigate("/profile");
  // };

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

  const handleClear = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      title: "",
      date: "",
      name: "",
    }));
  };

  const handleFilter = () => {
    let stateCards = [...cards];
    if (title !== "") {
      const filterCards = stateCards.filter((card) =>
        card.title.toLowerCase().includes(title.toLowerCase())
      );
      stateCards = [...filterCards];
    }
    if (name !== "") {
      const filterCards = stateCards.filter((card) =>
        card.assignTo.toLowerCase().includes(name.toLowerCase())
      );
      stateCards = [...filterCards];
    }
    if (date !== "") {
      const filterCards = stateCards.filter(
        (card) => card.dueDate.slice(0, 10) === date
      );
      stateCards = [...filterCards];
    }
    return stateCards;
  };

  return Object.keys(currentUser).length > 0 ? (
    <>
      <div id="taskHubBody" className="taskHubBody">
        <Header handleOpenProfileMenu={handleOpenProfileMenu} />
        <Grid container gap={2} className="taskHubContainerAction">
          <Grid item>
            <BasicButton
              className="taskHubStageButton"
              variant="outlined"
              onClick={handleClickOpenModel}
              name="Create Stage"
            />
          </Grid>
          <Grid item className="taskHubContainerItem">
            <BasicTextField
              inputProps={{
                autoComplete: "off",
              }}
              value={date}
              name="date"
              type="date"
              label="Due Date"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <BasicTextField
              inputProps={{
                autocomplete: "off",
              }}
              value={name}
              name="name"
              label="Assignee Name"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <BasicTextField
              inputProps={{
                autocomplete: "off",
              }}
              value={title}
              name="title"
              label="Card Title"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <BasicButton
              className="taskHubStageButton"
              onClick={handleClear}
              name="Clear"
            />
          </Grid>
        </Grid>

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
                              open={open}
                              cards={handleFilter}
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
            className="taskHubStageButton"
            onClick={handleCloseDialogBox}
            name="Disagree"
          />
          <BasicButton
            className="taskHubStageButton"
            onClick={handleDelete}
            autoFocus
            name="Agree"
          />
        </DialogActions>
      </Dialog>
      {/* <Menu
        id={`profile-menu`}
        anchorEl={anchorProfile}
        open={openProfile}
        disableScrollLock={true}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenProfilePage}>Profile</MenuItem>
        <MenuItem onClick={() => dispatch(unSetCurrentUser())}>
          Sign Out
        </MenuItem>
      </Menu> */}
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
        <MenuItem onClick={() => handleEditStage(tempStage)}>Edit</MenuItem>
        <MenuItem onClick={handelOpenDeleteDailogBox}>Delete</MenuItem>
      </Menu>
    </>
  ) : null;
}
export default TaskHub;
