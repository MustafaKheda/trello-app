import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";
import "../../assest/css/Trello.scss";
import Header from "../Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleChangeStage } from "../../store/action";
import StageList from "./StageList";
import CardDrawer from "./CardDrawer";
import Model from "./Model";
import { Button, Grid } from "@mui/material";
const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    isDeleted: false,
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    isDeleted: false,
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    isDeleted: false,
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];
function Trello() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userStore.currentUser);
  const data = useSelector((state) => state.trelloStage.stages);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openModel, setOpenModel] = React.useState(false);
  const [drawerStageId, setDrawerStageId] = React.useState(null);

  const handleClickOpen = () => {
    setOpenModel(true);
  };
  const handleClose = () => {
    setOpenModel(false);
  };

  // useEffect(() => {
  //   console.log("in DATA");
  //   dispatch(handleChangeStage(DATA));
  // }, []);

  // useEffect(() => {
  //   let timeout;
  //   if (data.length > 0) {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       console.log("in data", data);
  //       dispatch(handleChangeStage(data));
  //     }, 2000);
  //   }

  //   // Clean up the timeout when the component unmounts or when data changes
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [data, dispatch]);

  const handleDrawerOpen = (stageId) => {
    setDrawerStageId(stageId);
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const handleDragDrop = (event) => {
    const { source, destination, type } = event;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      console.log("in type", data, event);
      const reorderedStores = [...data];
      const sourceIndex = source.index;
      console.log(sourceIndex);
      const destinationIndex = destination.index;
      console.log(destinationIndex);
      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      console.log(removedStore);
      reorderedStores.splice(destinationIndex, 0, removedStore);

      return dispatch(handleChangeStage(reorderedStores));
    }
    const newStores = [...data];
    const dataSourceIndex = data.findIndex(
      (data) => data.id === source.droppableId
    );
    const dataDestinationIndex = data.findIndex(
      (data) => data.id === destination.droppableId
    );
    const newSourceItems = [...data[dataSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...data[dataDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(source.index, 1);
    newDestinationItems.splice(destination.index, 0, deletedItem);

    newStores[dataSourceIndex] = {
      ...data[dataSourceIndex],
      items: newSourceItems,
    };

    newStores[dataDestinationIndex] = {
      ...data[dataDestinationIndex],
      items: newDestinationItems,
    };
    dispatch(handleChangeStage(newStores));
  };

  return (
    <>
      <div className="trelloBody">
        <Header />
        <Grid container justifyContent={"flex-end"} rowSpacing={3}>
          <Grid item md={2}>
            <Button variant="outlined" onClick={handleClickOpen}>
              Create Stage's
            </Button>
            <Model
              handleClose={handleClose}
              open={openModel}
              userID={currentUser.id}
            />
          </Grid>
          <DragDropContext onDragEnd={handleDragDrop}>
            <Droppable droppableId="ROOT" type="group" direction="horizontal">
              {(provided) => (
                <Grid
                  item
                  className="cardContainer"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data &&
                    data?.map((data, index) => {
                      return !data.isDeleted ? (
                        <Draggable
                          draggableId={data.id}
                          key={data.id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              className="trelloCard"
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <StageList
                                {...data}
                                openDrawerById={handleDrawerOpen}
                              />
                            </Card>
                          )}
                        </Draggable>
                      ) : null;
                    })}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </div>
      <CardDrawer
        cardId={drawerStageId}
        userId={currentUser.id}
        open={openDrawer}
        close={handleDrawerClose}
      />
    </>
  );
}
{
  /* <Card elevation={0.9} className="trelloBox">
  <CardContent>
  <Typography className="trelloHeading" variant="h6">
    Hello
    </Typography>
  <Typography className="trelloHeading" variant="subtitle">
    Hello
  </Typography>
</CardContent>
</Card> */
}

export default Trello;
