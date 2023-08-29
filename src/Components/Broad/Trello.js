import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Card from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";
import "../../assest/Css/Trello.scss";
import Header from "../Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import {
  editStage,
  handleChangeCard,
  handleChangeStage,
  handleDeleteStage,
} from "../../Store/Action";
import StageList from "./StageList";
import CardDrawer from "./CardDrawer";
import Model from "./Model";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import BasicButton from "../../Common/BasicButton";
function Trello() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const cards = useSelector((store) => store.trelloStage.card);
  const currentUser = useSelector((state) => state.userStore.currentUser);
  const data = useSelector((state) => state.trelloStage.stages);
  console.log();
  const [open, setOpen] = useState({
    openDrawer: false,
    openModel: false,
    openDailog: false,
    drawerStageId: null,
    tempData: "",
    anchorEl: null,
    openMenu: false,
  });

  const {
    drawerStageId,
    openModel,
    openDrawer,
    tempData,
    openDailog,
    anchorEl,
    openMenu,
  } = open;

  const handleClickOpen = () => {
    setOpen((prvState) => ({
      ...prvState,
      openModel: true,
    }));
  };
  const handleClose = () => {
    setOpen((prvState) => ({
      ...prvState,
      openModel: false,
    }));
  };

  const handleDrawerOpen = (stageId) => {
    setOpen((prvState) => ({
      ...prvState,
      openDrawer: true,
      drawerStageId: stageId,
    }));
  };

  const handleDrawerClose = () => {
    setOpen((prvState) => ({
      ...prvState,
      openDrawer: false,
    }));
  };
  const handleDragDrop = (result) => {
    const { source, destination, type, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      // Handle Stage drag-and-drop
      const reorderedStores = [...data];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);

      return dispatch(handleChangeStage(reorderedStores));
    }

    if (type === "card") {
      // Handle card drag-and-drop
      const newCards = [...cards];
      const [draggedCard] = newCards.splice(source.index, 1);
      draggedCard.stageId = destination.droppableId;
      newCards.splice(destination.index, 0, draggedCard);
      return dispatch(handleChangeCard(newCards));
    }
  };

  const handleEditStage = (data) => {
    handleClickOpen();
    dispatch(editStage(data));
    handleCloseMenu();
  };
  const handleClick = (event, id) => {
    const [temp] = data.filter((stage) => stage.id === id);
    setOpen((prv) => ({
      ...prv,
      anchorEl: event.currentTarget,
      tempData: temp,
      openMenu: true,
    }));
  };
  const handleCloseMenu = () => {
    setOpen((prv) => ({
      ...prv,
      anchorEl: null,
      tempData: "",
      openMenu: false,
    }));
  };
  const handelOpenDeleteDailogBox = () => {
    setOpen((prv) => ({
      ...prv,
      openDailog: true,
    }));
  };
  const handleCloseDialogBox = () => {
    setOpen((prv) => ({
      ...prv,
      openDailog: false,
      tempData: "",
    }));
  };
  const handleDelete = () => {
    handleCloseMenu();
    dispatch(handleDeleteStage(tempData.id));
    handleCloseDialogBox();
  };
  function renderStage(provided, data, index) {
    const cardCount = cards?.filter((card) => card?.stageId === data?.id);
    console.log(data.userId);
    return (
      <div
        className="trelloStages"
        {...provided.dragHandleProps}
        {...provided.draggableProps}
        ref={provided.innerRef}
      >
        <div
          className={`trelloCardHeading`}
          style={{ backgroundColor: `${data?.color}` }}
        >
          <Typography fontWeight={600}>
            {data.name} ({cardCount?.length})
          </Typography>
          <IconButton id={`setting`}>
            <MoreHoriz onClick={(event) => handleClick(event, data.id)} />
          </IconButton>
          <Menu
            id={`basic-menu`}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleEditStage(tempData)}>Edit</MenuItem>
            <MenuItem onClick={handelOpenDeleteDailogBox}>Delete</MenuItem>
          </Menu>
        </div>
        <Card elevation={0} className="trelloCard size">
          <StageList
            {...data}
            index={index}
            openDrawerById={handleDrawerOpen}
          />
        </Card>
      </div>
    );
  }
  return (
    <>
      <div className="trelloBody">
        <Header />
        <BasicButton
          className="trelloStageButton"
          variant="outlined"
          onClick={handleClickOpen}
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
                {data &&
                  data?.map((data, index) => {
                    console.log();
                    return !data.isDelete && data.userId === currentUser.id ? (
                      <Draggable
                        draggableId={data.id}
                        key={data.id}
                        index={index}
                      >
                        {(provided) => {
                          const cardCount = cards?.filter(
                            (card) => card?.stageId === data?.id
                          );

                          return renderStage(provided, data, index);
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
    </>
  );
}
export default Trello;
