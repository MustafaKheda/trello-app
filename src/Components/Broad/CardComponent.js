import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import "../../assest/Css/TaskHub.scss";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CardHeader from "@mui/material/CardHeader";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { monthNames } from "../../Common/Constant";

const CardComponent = ({ provided, card, handleOpenMenu, handleEditStage }) => {
  const { title, description, assignTo, assignBy, dueDate, comments, id } =
    card;

  const date = new Date(dueDate);
  const dueDay = date.getDate();
  const dueMonth = date.getMonth();
  const stringDate = date.toString().slice(0, 25);

  const undeletedCommetsCount = comments?.filter(
    (comment) => !comment.isDelete
  ).length;

  const handleCheckDueDate = () => {
    const currentDate = new Date();
    return (
      Date.parse(date.toString().slice(0, 16)) <
      Date.parse(currentDate.toString().slice(0, 16))
    );
  };

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
            id="setting"
            onClick={(event) => handleOpenMenu(event, id)}
          >
            <MoreHoriz className="cardHeaderIconButton" />
          </IconButton>
        }
      />

      <Divider />
      <CardContent className="innerCardContent">
        <Typography variant="body2" textAlign={"left"}>
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
              <Typography
                component={"div"}
                className={
                  handleCheckDueDate()
                    ? `due actionStackDueDate`
                    : "notdue actionStackDueDate"
                }
              >
                <AccessTimeIcon />
                {monthNames[dueMonth]} {dueDay}
              </Typography>
            </Tooltip>
          ) : null}

          <IconButton
            aria-label="cart"
            className="innerActionIconButton"
            onClick={() => handleEditStage(card, "commentMode")}
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
};
export default CardComponent;
