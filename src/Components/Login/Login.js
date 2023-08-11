import {
  Box,
  Button,
  Card,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Person2Icon from "@mui/icons-material/Person2";
import KeyIcon from "@mui/icons-material/Key";
import DialpadIcon from "@mui/icons-material/Dialpad";
import BadgeIcon from "@mui/icons-material/Badge";
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../../assest/css/Login.scss";
import logo from "../../assest/Image/card.jpg";
import img3 from "../../assest/Image/rafay-ansari-qKoEIBZ4lLM-unsplash.jpg";
import img2 from "../../assest/Image/reinhart-julian-d4ZYpoGjUXo-unsplash.jpg";
import img1 from "../../assest/Image/larissa-cardoso-zHUHeNT_UtE-unsplash.jpg";
function Login() {
  const [show, setShow] = useState(false);
  
  const toggleView = () => {
    setShow((currShow) => !currShow);
  };

  return (
    <div className="container">
      <Card
        elevation={7}
        className={`loginCard ${show ? "login " : "signup"} `}
      >
        {show ? (
          <>
            <Box className={`cardBox ${show ? "login" : "signup"} `}>
              <Typography className="cardHeading">Trello</Typography>
              <Box className="cardInputs">
                <TextField
                  fullWidth
                  placeholder="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="inputIcon" position="start">
                        <Person2Icon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <TextField
                  fullWidth
                  placeholder="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="inputIcon" position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <Button
                  elevation={3}
                  className="cardButton"
                  onClick={toggleView}
                >
                  Login
                </Button>
              </Box>
            </Box>
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              interval={2000}
              showStatus={false}
              showThumbs={false}
              className={`cardMedia ${show ? "login" : "signup"}`}
            >
              <div>
                <img src={img2} />
                <p className="legend">Legend 1</p>
              </div>
              <div>
                <img src={img1} />
                <p className="legend">Legend 2</p>
              </div>
              <div>
                <img src={img3} />
                <p className="legend">Legend 3</p>
              </div>
            </Carousel>
            {/* <CardMedia
              component={"img"}
              className={`cardMedia ${show ? "login" : "signup"}`}
            /> */}
          </>
        ) : (
          <>
            <Box className={`cardBox ${show ? "login" : "signup"}`}>
              <Typography className="cardHeading">Trello</Typography>
              <Box className="cardInputs">
                <TextField
                  fullWidth
                  placeholder="Username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="inputIcon" position="start">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <TextField
                  fullWidth
                  placeholder="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="inputIcon" position="start">
                        <Person2Icon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>

                <TextField
                  fullWidth
                  placeholder="Mobile Number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="inputIcon" position="start">
                        <DialpadIcon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <TextField
                  fullWidth
                  placeholder="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="inputIcon" position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <Button
                  elevation={3}
                  className="cardButton"
                  onClick={toggleView}
                >
                  Sign up
                </Button>
              </Box>
            </Box>
            {/* <CardMedia
              component={"img"}
              className={`cardMedia ${show ? "login" : "signup"}`}
            /> */}
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              interval={2000}
              showStatus={false}
              showThumbs={false}
              className={`cardMedia ${show ? "login" : "signup"}`}
            >
              <div>
                <img src={img2} />
                <p className="legend">Legend 1</p>
              </div>
              <div>
                <img src={img1} />
                <p className="legend">Legend 2</p>
              </div>
              <div>
                <img src={img3} />
                <p className="legend">Legend 3</p>
              </div>
            </Carousel>
          </>
        )}
      </Card>
    </div>
  );
}

export default Login;
