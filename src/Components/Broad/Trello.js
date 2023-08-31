import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router";
function Trello() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cards = useSelector((store) => store.trelloStage.card);
  const currentUser = useSelector((state) => state.userStore.currentUser);
  const data = useSelector((state) => state.trelloStage.stages);

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
  const handleClickOpen = () => {
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
    const temp = data.find((stage) => stage.id === id);
    setOpen((prevOpen) => ({
      ...prevOpen,
      anchorEl: event.currentTarget,
      tempStage: temp,
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
  function renderStage(provided, data, index) {
    const cardCount = cards?.filter((card) => card?.stageId === data?.id);
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
          <Typography textTransform={"uppercase"} fontWeight={600}>
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
            <MenuItem onClick={() => handleEditStage(tempStage)}>Edit</MenuItem>
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
  return Object.keys(currentUser).length > 0 ? (
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
  ) : null;
}
export default Trello;
