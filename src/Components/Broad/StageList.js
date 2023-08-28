import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import "../../assest/Css/Trello.scss";
import {
  Avatar,
  Badge,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import { monthNames } from "../../Common/Constant";
function StageList(props) {
  const cards = useSelector((store) => store.trelloStage.card);
  const { name, item, index, id, openDrawerById, color } = props;

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
      <Droppable droppableId={id} key={id} type="card">
        {(provided) => (
          <CardContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="trelloCardContent"
          >
            {cards &&
              cards?.map((card, index) => {
                const {
                  title,
                  description,
                  assignTo,
                  assignBy,
                  dueDate,
                  comment,
                } = card;
                const date = new Date(dueDate);
                const dDate = date.getDate();
                const dueMonth = date.getMonth();
                const stringDate = date.toString().slice(0, 25);
                return id === card.stageId ? (
                  <Draggable draggableId={card.id} key={card.id} index={index}>
                    {(provided) => (
                      <Card
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="trelloInnerCard"
                      >
                        <CardHeader
                          title={title}
                          className="innerCardTitle"
                          action={
                            <IconButton>
                              <MoreHoriz className="cardHeaderIconButton"></MoreHoriz>
                            </IconButton>
                          }
                        />
                        <Divider />
                        <CardContent className="innerCardContent">
                          <Typography variant="body2">{description}</Typography>
                        </CardContent>

                        <CardActions className="innerCardActions">
                          <Stack direction={"row"} className="actionStack">
                            <Tooltip title={assignBy.toUpperCase()}>
                              <Avatar className="innerCardAvatar">
                                {assignBy.slice(0, 1).toUpperCase()}
                              </Avatar>
                            </Tooltip>
                            <ArrowForwardIosIcon />
                            <Tooltip title={assignTo.toUpperCase()}>
                              <Avatar className="innerCardAvatar">
                                {assignTo.slice(0, 1).toUpperCase()}
                              </Avatar>
                            </Tooltip>
                          </Stack>

                          <Stack className="actionIconStack">
                            <Tooltip title={stringDate}>
                              <Typography
                                component={"div"}
                                className="actionStackDueDate"
                              >
                                <AccessTimeIcon />
                                {monthNames[dueMonth]} {dDate}
                              </Typography>
                            </Tooltip>

                            <IconButton
                              aria-label="cart"
                              className="innerActionIconButton"
                            >
                              <Badge
                                badgeContent={comment.length}
                                color="secondary"
                                showZero
                                max={160}
                              >
                                <CommentIcon />
                              </Badge>
                            </IconButton>
                          </Stack>
                        </CardActions>
                      </Card>
                    )}
                  </Draggable>
                ) : null;
              })}
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>
    </>
  );
}

export default StageList;
