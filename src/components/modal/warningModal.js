import { CloseOutlined } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import React from "react";
import "./warningModal.css";

const WarningModal = React.memo(
  ({ open, handleModalHandler, header, body, handleConfirmHandler }) => {
    return (
      <Modal
        open={open}
        onClose={handleModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="warning-modal">
          <div className="header">
            <h3>{header}</h3>
            <CloseOutlined
              onClick={handleModalHandler}
              style={{ cursor: "pointer" }}
            />
          </div>
          <hr />
          {body()}
          <hr />
          <Box component="footer">
            <div className="add-button">
              <button onClick={handleConfirmHandler}>Confirm</button>
            </div>
          </Box>
        </Box>
      </Modal>
    );
  }
);

export default WarningModal;
