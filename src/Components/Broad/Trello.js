import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Card from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";
import "../../assest/Css/Trello.scss";
import Header from "../Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleChangeCard, handleChangeStage } from "../../Store/Action";
import StageList from "./StageList";
import CardDrawer from "./CardDrawer";
import Model from "./Model";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { DATA } from "../../Common/Constant";
function Trello() {
  const buttonRef = useRef(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const cards = useSelector((store) => store.trelloStage.card);
  const currentUser = useSelector((state) => state.userStore.currentUser);
  const data = useSelector((state) => state.trelloStage.stages);
  const [open, setOpen] = useState({
    openDrawer: false,
    openModel: false,
    drawerStageId: null,
  });
  const { drawerStageId, openModel, openDrawer } = open;

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

  useEffect(() => {
    dispatch(handleChangeStage(DATA));
  }, []);

  // useEffect(() => {
  //   let timeout;
  //   if (data.length > 0) {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       dispatch(handleChangeStage(data));
  //     }, 2000);
  //   }

  //   // Clean up the timeout when the component unmounts or when data changes
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [data, dispatch]);

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

    // const newStores = [...data];
    // const dataSourceIndex = data.findIndex(
    //   (data) => data.id === source.droppableId
    // );
    // const dataDestinationIndex = data.findIndex(
    //   (data) => data.id === destination.droppableId
    // );
    // const newSourceItems = [...data[dataSourceIndex].items];
    // const newDestinationItems =
    //   source.droppableId !== destination.droppableId
    //     ? [...data[dataDestinationIndex].items]
    //     : newSourceItems;

    // const [deletedItem] = newSourceItems.splice(source.index, 1);
    // newDestinationItems.splice(destination.index, 0, deletedItem);

    // newStores[dataSourceIndex] = {
    //   ...data[dataSourceIndex],
    //   items: newSourceItems,
    // };

    // newStores[dataDestinationIndex] = {
    //   ...data[dataDestinationIndex],
    //   items: newDestinationItems,
    // };
    // dispatch(handleChangeStage(newStores));
  };

  return (
    <>
      <div className="trelloBody">
        <Header />
        <div className="trelloGridItem">
          <Button
            ref={buttonRef}
            className="trelloStageButton"
            variant="outlined"
            onClick={handleClickOpen}
          >
            Create Stage
          </Button>
        </div>
        <Model
          buttonRef={buttonRef}
          close={handleClose}
          open={openModel}
          currentUser={currentUser}
        />

        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="ROOT" type="group" direction="horizontal">
            {(provided) => (
              <div
                className="cardContainer"
                disableScrollOverlapDetection={true}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data &&
                  data?.map((data, index) => {
                    const cardCount = cards.filter(
                      (card) => card.stageId === data.id
                    );
                    return !data.isDeleted ? (
                      <Draggable
                        draggableId={data.id}
                        key={data.id}
                        index={index}
                      >
                        {(provided) => (
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
                                {data.name} ({cardCount.length})
                              </Typography>
                              <IconButton id="setting">
                                <MoreHoriz />
                              </IconButton>
                            </div>
                            <Card elevation={0} className="trelloCard size">
                              <StageList
                                {...data}
                                index={index}
                                openDrawerById={handleDrawerOpen}
                              />
                            </Card>
                          </div>
                        )}
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
    </>
  );
}

export default Trello;
// // <>
// <div className="trelloBody">
// <Header />
// <Grid container className="trelloContainer">
//   <Grid item md={12} xs={12} sm={12} className="trelloGridItem">
//     <Button
//       ref={Ref}
//       variant="contained"
//       className="trelloStageButton size"
//       onClick={handleClickOpen}
//     >
//       Create Stage
//     </Button>
//   </Grid>
//   <StageContainer />
// </Grid>
// </div>
// <Model
// buttonRef={Ref}
// close={handleClose}
// open={openModel}
// userID={currentUser.id}
// />
// </>

// const newCards = [...cards];

// const card = newCards.filter((card) => card.id === draggableId);
// console.log(cards);
// const dataSourceIndex = cards.findIndex(
//   (data) => data.id === draggableId && data.stageId === source.droppableId
// );
// console.log(dataSourceIndex);
// const dataDestinationIndex = cards.findIndex(
//   (data) =>
//     data.id === draggableId && data.stageId === destination.droppableId
// );
// console.log(dataDestinationIndex);
