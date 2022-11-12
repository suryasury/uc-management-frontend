import { CloseOutlined } from "@mui/icons-material";
import { Autocomplete, Box, Modal, TextField } from "@mui/material";
import React from "react";
import "./userModal.css";

const UserDetailsModal = React.memo(
  ({
    firstName,
    lastName,
    email,
    dob,
    designation,
    companyObj,
    companyList = [],
    handleInputChange,
    mode,
    open,
    handleModalClose,
    handleAddUser,
    handleUpdateUser,
    showCompanySelector,
  }) => {
    return (
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="user-modal">
          <div className="header">
            <h3>{mode === "add" ? "Add User" : "Update User"}</h3>
            <CloseOutlined
              onClick={handleModalClose}
              style={{ cursor: "pointer" }}
            />
          </div>
          <hr />
          <Box component="form" noValidate autoComplete="off">
            <div className="form-fields">
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                required
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
                required
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />
              <TextField
                id="outlined-basic"
                // label="Email"
                variant="outlined"
                type="date"
                placeholder="Date of Birth"
                name="dob"
                value={dob}
                onChange={handleInputChange}
                required
              />
              <TextField
                id="outlined-basic"
                label="Designation"
                variant="outlined"
                type="text"
                placeholder="Designation"
                name="designation"
                value={designation}
                onChange={handleInputChange}
                required
              />
              {companyList.length > 0 && showCompanySelector ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={companyList}
                  value={companyObj}
                  name="company"
                  onChange={(e, value) => {
                    handleInputChange(e, value);
                  }}
                  getOptionLabel={(options) => options.companyName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="company"
                      sx={{ width: "330px" }}
                      label="Select Company"
                    />
                  )}
                />
              ) : null}
            </div>
            <hr />
            <div>
              <Box component="footer">
                <div className="add-button">
                  {mode === "add" ? (
                    <button type="submit" onClick={handleAddUser}>
                      Add
                    </button>
                  ) : (
                    <button type="submit" onClick={handleUpdateUser}>
                      Update
                    </button>
                  )}
                </div>
              </Box>
            </div>
          </Box>
        </Box>
      </Modal>
    );
  }
);

export default UserDetailsModal;
