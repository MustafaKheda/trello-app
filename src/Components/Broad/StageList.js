import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

import "../../assest/css/Trello.scss";
function StageList({ title, name, items, id, onOpen }) {
  return (
    <>
      <CardHeader title={name} className="trelloHeader" variant="h4" />
      <Droppable droppableId={id} key={id}>
        {(provided) => (
          <CardContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="trelloCardContent"
          >
            {items &&
              items?.map((item, index) => (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided) => (
                    <Card
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      elevation={0}
                      className="trelloBox"
                    >
                      <CardContent>
                        <Typography className="trelloHeading" variant="h6">
                          {item.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>
      <CardActions disableSpacing className="trelloAction">
        <Button variant="outlined" className="trelloButton" onClick={onOpen}>
          Add Card
        </Button>
      </CardActions>
    </>
  );
}

export default StageList;
