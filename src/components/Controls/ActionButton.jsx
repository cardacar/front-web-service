import React from "react";
import { Button } from "@mui/material";
/* import { makeStyles } from "@mui/styles"; */

/* const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.6),
  },
  secondary: {
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
  },
  primary: {
    "& .MuiButton-label": {
      color: theme.palette.primary.main,
    },
  },
})); */

const ActionButton = (props) => {
  const {  children, onClick } = props;
  //const style = useStyle();
  return (
    <Button
      //className={`${style.root} ${style[color]}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
