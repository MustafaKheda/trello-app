import React from "react";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import "../../assest/Css/TaskHub.scss";
import StageList from "./StageList";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
const RenderStage = ({
  provided,
  stage,
  index,
  cards,
  handleDrawerOpen,
  handleOpenMenu,
  open,
}) => {
  const cardCount = cards().filter(
    (card) => card?.stageId === stage?.id && !card.isDelete
  ).length;

  return (
    <div
      className="taskHubStages"
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
    >
      <div
        className={`taskHubCardHeading`}
        style={{ backgroundColor: `${stage?.color}` }}
      >
        <Typography textTransform={"uppercase"} fontWeight={600}>
          {stage?.name} ({cardCount})
        </Typography>
        <IconButton
          key={index}
          id={`setting-${stage?.id}`}
          onClick={(event) => handleOpenMenu(event, stage.id)}
        >
          <MoreHoriz />
        </IconButton>
      </div>
      <StageList
        cards={cards}
        state={open}
        {...stage}
        index={index}
        cardCount={cardCount}
        openDrawerById={handleDrawerOpen}
      />
    </div>
  );
};

export default RenderStage;
