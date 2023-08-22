import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import LensIcon from "@mui/icons-material/Lens";
import "../../assest/css/Trello.scss";
import { IconButton } from "@mui/material";
function StageList({ name, items, index, id, openDrawerById }) {
  return (
    <>
      {/* <CardHeader
        title={name}
        className="trelloHeader"
        variant="h4"
        action={
          <IconButton aria-label="settings" id="setting">
            <MoreHoriz />
          </IconButton>
        }
      /> */}
      <div
        className={`trelloCardHeading ${index % 2 ? "primary" : "secondary"}`}
      >
        <Typography variant="h4" fontWeight={600}>
          <LensIcon /> {name} {index}
        </Typography>
        <IconButton id="setting">
          <MoreHoriz />
        </IconButton>
      </div>
      <CardActions disableSpacing className="trelloAction">
        <Button
          variant="contained"
          className="trelloButton"
          startIcon={<AddIcon />}
          onClick={() => openDrawerById(id)}
        >
          Add Card
        </Button>
      </CardActions>
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
    </>
  );
}

export default StageList;
