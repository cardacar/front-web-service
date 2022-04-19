import React from 'react'
import {Button as MuiButton} from '@mui/material'
/* import { makeStyles } from '@mui/styles'; */

/* const useStyles = makeStyles((theme) => ({
    root:{
        margin: theme.spacing(0.5)
    },
    label:{
        textTransform:'none'
    }
})) */


const Button = (props) => {
    const {text, size, color, variant, onClick, ...others} = props;
    //const styles = useStyles();
  return (
    <MuiButton
            variant={variant || 'contained'}
            size={size || 'large'}
            color={color || 'primary'}
            onClick={onClick}
            {...others}
            //classes={{root:styles.root, label:styles.label}}
        >
            {text}
        </MuiButton>
  )
}

export default Button