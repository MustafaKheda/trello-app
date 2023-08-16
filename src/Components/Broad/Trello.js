import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React from "react";

import "../../assest/css/Trello.scss";
import Header from "../Header";
function Trello() {
  const stageName = ["Projects", "Inprogress", "Compeleted"];
  return (
    <>
      <div className="trelloBody">
        <Header />
        {stageName.map((name) => (
          <Card className="trelloCard">
            <CardHeader
              title={name}
              className="trelloHeader"
              variant="h4"
            ></CardHeader>
            <CardContent className="trelloCardContent">
              <div className="trelloBoxWrapper">
                <Card elevation={0.9} className="trelloBox">
                  <CardContent>
                    <Typography className="trelloHeading" variant="h6">
                      Hello
                    </Typography>
                    <Typography className="trelloHeading" variant="subtitle">
                      Hello
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardActions disableSpacing className="trelloAction">
              <Button variant="outlined" className="trelloButton">
                Add Card
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
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
