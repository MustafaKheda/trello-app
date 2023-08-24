import Button from "@mui/material/Button";
import React from "react";

function BasicButton(props) {
  return <Button {...props}>{props.name}</Button>;
}

export default BasicButton;
