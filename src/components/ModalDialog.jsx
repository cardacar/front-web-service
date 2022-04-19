import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import Controls from "./Controls/Control";
import { Close } from "@mui/icons-material";

const ModalDialog = (props) => {
  const { title, children, openModal, setOpenModal } = props;
  return (
    <Dialog
      open={openModal}
      maxWidth="md"
      classes={{ paper: { padding: 2, position: "absolute" } }}
    >
      <DialogTitle sx={{ paddingRight: "0px" }}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <Close />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
