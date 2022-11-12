import { CloseOutlined } from "@mui/icons-material";
import { Autocomplete, Box, Modal, TextField } from "@mui/material";
import "./migrateUserModal.css";

const MigrateUserModal = ({
  open,
  firstName,
  lastName,
  id,
  companyList = [],
  handleCompanyChange,
  handleMigrateUser,
  handleMigrateUserModal,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleMigrateUserModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="migrate-user-modal">
        <div className="header">
          <h3>
            Migrate User{" "}
            <span>
              {firstName} {lastName} (ID: {id})
            </span>
          </h3>
          <CloseOutlined
            onClick={handleMigrateUserModal}
            style={{ cursor: "pointer" }}
          />
        </div>
        <hr />

        <Box component="form">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={companyList}
            sx={{ width: 400 }}
            onChange={(e, value) => {
              handleCompanyChange(value.id);
            }}
            fullWidth
            getOptionLabel={(options) => options.companyName}
            renderInput={(params) => (
              <TextField {...params} label="Select Company" />
            )}
          />
        </Box>
        <hr />
        <Box component="footer">
          <div className="add-button">
            <button onClick={handleMigrateUser}>Migrate</button>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default MigrateUserModal;
