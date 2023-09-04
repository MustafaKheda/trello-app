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
import { Chip } from "@mui/material";
function StageList(props) {
  const dispatch = useDispatch();
  const cards = useSelector((store) => store.trelloStage.card);
  const { id, openDrawerById } = props;
  const [open, setOpen] = useState({
    tempData: null,
    anchorEl: null,
    openDailog: false,
    openMenu: false,
  });
  const { tempData, anchorEl, openDailog, openMenu } = open;

  const handleClick = (event, cardId) => {
    const temp = cards.find((card) => card.id === cardId);
    setOpen((prevOpen) => ({
      ...prevOpen,
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
    setOpen((prevOpen) => ({
      ...prevOpen,
      anchorEl: null,
      openMenu: false,
    }));
  };

  const handleCloseDialogBox = () => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      openDailog: false,
      tempData: null,
    }));
  };
  const handelOpenDailogBox = () => {
    handleCloseMenu();
    setOpen((prevOpen) => ({
      ...prevOpen,
      openDailog: true,
    }));
  };
  const handleDelete = () => {
    handleCloseMenu();
    dispatch(handleDeleteCard(tempData.id));
    handleCloseDialogBox();
  };
  function cardComponent(provided, card) {
    const { title, description, assignTo, assignBy, dueDate, comments, id } =
      card;
    const date = new Date(dueDate);
    const dDate = date.getDate();
    const dueMonth = date.getMonth();
    const stringDate = date.toString().slice(0, 25);
    const undeletedCommetsCount = comments.filter(
      (comment) => !comment.isDelete
    ).length;
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
            <IconButton
              id={`setting`}
              onClick={(event) => handleClick(event, id)}
            >
              <MoreHoriz className="cardHeaderIconButton" />
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
          <MenuItem key={"edit"} onClick={() => handleEditStage(tempData)}>
            Edit
          </MenuItem>
          <MenuItem key={"delete"} onClick={handelOpenDailogBox}>
            Delete
          </MenuItem>
        </Menu>
        <Divider />
        <CardContent className="innerCardContent">
          <Typography variant="body2">{description}</Typography>
        </CardContent>

        <CardActions className="innerCardActions">
          <Stack direction={"row"} className="actionStack">
            <Tooltip title={assignBy?.toUpperCase()}>
              <Avatar className="innerCardAvatar">
                {assignBy?.slice(0, 1)?.toUpperCase()}
              </Avatar>
            </Tooltip>

            {assignTo ? (
              <>
                <ArrowForwardIosIcon />
                <Tooltip title={assignTo?.toUpperCase()}>
                  <Avatar className="innerCardAvatar">
                    {assignTo?.slice(0, 1)?.toUpperCase()}
                  </Avatar>
                </Tooltip>
              </>
            ) : null}
          </Stack>

          <Stack className="actionIconStack">
            {dueDate ? (
              <Tooltip title={stringDate}>
                <Typography component={"div"} className="actionStackDueDate">
                  <AccessTimeIcon />
                  {monthNames[dueMonth]} {dDate}
                </Typography>
              </Tooltip>
            ) : null}

            <IconButton
              aria-label="cart"
              className="innerActionIconButton"
              onClick={() => handleEditStage(card)}
            >
              <Badge
                className="innerActionBadge"
                badgeContent={undeletedCommetsCount}
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
  }
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
                return id === card.stageId && !card.isDelete ? (
                  <Draggable draggableId={card.id} key={card.id} index={index}>
                    {(provided) => cardComponent(provided, card)}
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
