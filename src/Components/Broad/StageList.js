import React, { useState } from "react";
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
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import CardHeader from "@mui/material/CardHeader";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { monthNames } from "../../Common/Constant";
import { handleDeleteCard, handleEditCard } from "../../Store/Action";
import BasicButton from "../../Common/BasicButton";
function StageList(props) {
  const dispatch = useDispatch();
  const cards = useSelector((store) => store.trelloStage.card);
  const { name, item, index, id, openDrawerById, color } = props;
  const [open, setOpen] = useState({
    tempData: "",
    anchorEl: null,
    openDailog: false,
    openMenu: false,
  });
  const { tempData, anchorEl, openDailog, openMenu } = open;

  const handleClick = (event, id) => {
    const [temp] = cards.filter((card) => card.id === id);
    setOpen((prv) => ({
      ...prv,
      anchorEl: event.currentTarget,
      tempData: temp,
      openMenu: true,
    }));
  };
  const handleEditStage = (data) => {
    openDrawerById();
    dispatch(handleEditCard(data));
    handleCloseMenu();
  };
  const handleCloseMenu = () => {
    setOpen((prv) => ({
      ...prv,
      anchorEl: null,
      tempData: "",
      openMenu: false,
    }));
  };
  const handleCloseDialogBox = () => {
    setOpen((prv) => ({
      ...prv,
      openDailog: false,
      tempData: "",
    }));
  };
  const handelOpenDeleteDailogBox = () => {
    setOpen((prv) => ({
      ...prv,
      openDailog: true,
    }));
  };
  const handleDelete = () => {
    handleCloseMenu();
    dispatch(handleDeleteCard(tempData.id));
    handleCloseDialogBox();
  };
  return (
    <>
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
                return id === card.stageId && !card.isDelete ? (
                  <Draggable draggableId={card.id} key={card.id} index={index}>
                    {(provided) => {
                      console.log(provided);
                      return (
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
                                <MoreHoriz
                                  id={`setting`}
                                  className="cardHeaderIconButton"
                                  onClick={(event) =>
                                    handleClick(event, card.id)
                                  }
                                />
                              </IconButton>
                            }
                          />
                          <Menu
                            id={`basic-menu-${card.id}`}
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleCloseMenu}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem
                              key={"edit"}
                              onClick={() => handleEditStage(tempData)}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              key={"delete"}
                              onClick={handelOpenDeleteDailogBox}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                          <Divider />
                          <CardContent className="innerCardContent">
                            <Typography variant="body2">
                              {description}
                            </Typography>
                          </CardContent>

                          <CardActions className="innerCardActions">
                            <Stack direction={"row"} className="actionStack">
                              <Tooltip title={assignBy?.toUpperCase()}>
                                <Avatar className="innerCardAvatar">
                                  {assignBy?.slice(0, 1)?.toUpperCase()}
                                </Avatar>
                              </Tooltip>
                              <ArrowForwardIosIcon />
                              <Tooltip title={assignTo?.toUpperCase()}>
                                <Avatar className="innerCardAvatar">
                                  {assignTo?.slice(0, 1)?.toUpperCase()}
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
                                onClick={() => handleEditStage(card)}
                              >
                                <Badge
                                  className="innerActionBadge"
                                  badgeContent={
                                    card?.comments?.length || comment.length
                                  }
                                  color="secondary"
                                  showZero
                                >
                                  <CommentIcon />
                                </Badge>
                              </IconButton>
                            </Stack>
                          </CardActions>
                        </Card>
                      );
                    }}
                  </Draggable>
                ) : null;
              })}
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
            className="trelloStageButton"
            onClick={handleCloseDialogBox}
            name="Disagree"
          />
          {console.log(tempData)}
          <BasicButton
            className="trelloStageButton"
            name="Agree"
            onClick={handleDelete}
            autoFocus
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StageList;
