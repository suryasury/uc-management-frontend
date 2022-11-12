import {
  AccountCircleOutlined,
  DeleteForever,
  EditOutlined,
  Person,
  PersonOff,
} from "@mui/icons-material";
import { ListItemIcon, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addUser,
  changeUserActiveStatus,
  deleteUser,
  getCompanyList,
  getUsersList,
  updateUser,
} from "../../api/restApi";
import MaterialReactTable from "material-react-table";
import Layout from "../layout";
import "./user.css";
import WarningModal from "../modal/warningModal";
import UserDetailsModal from "../modal/userModal";
import { Badge } from "react-bootstrap";

const User = () => {
  const [companyList, setCompanyList] = useState([]);
  const [userModal, setUserModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [designation, setDesignation] = useState("");
  const [mode, setMode] = useState("add");
  const [id, setId] = useState("");
  const [companyObj, setCompanyObj] = useState(null);
  const [userList, setUserList] = useState([]);
  const [warningModal, setWarningModal] = useState(false);

  const handleInputChange = (e, value = null) => {
    if (e.target.name === "firstName") return setFirstName(e.target.value);
    if (e.target.name === "lastName") return setLastName(e.target.value);
    if (e.target.name === "email") return setEmail(e.target.value);
    if (e.target.name === "dob") return setDob(e.target.value);
    if (e.target.name === "designation") return setDesignation(e.target.value);
    setCompanyObj(value);
  };

  const toDefault = () => {
    setFirstName("");
    setLastName("");
    setDesignation("");
    setDob("");
    setEmail("");
    setId("");
    setCompanyObj(null);
  };

  const getAllUsers = async () => {
    try {
      var res = await getUsersList();
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("Error", res);
        return;
      }
      setUserList(res.data.users);
    } catch (err) {}
  };

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      var res = await addUser({
        firstName,
        lastName,
        email,
        designation,
        dob,
        companyId: companyObj && companyObj.id,
      });
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("Error", res);
        return;
      }
      getAllUsers();
      setUserModal(false);
    } catch (err) {}
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      var res = await updateUser({
        id,
        firstName,
        lastName,
        email,
        dob,
        designation,
        companyId: companyObj && companyObj.id,
      });
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("err", res);
        return;
      }
      getAllUsers();
      toDefault();
      setUserModal(!userModal);
    } catch (err) {
      console.log("ERR", err);
    }
  };

  const handleAddUser = () => {
    setMode("add");
    setUserModal(!userModal);
  };

  const getAllCompanies = async () => {
    try {
      var res = await getCompanyList();
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("Err", res);
        return;
      }
      setCompanyList(res.data.companyList);
    } catch (err) {
      console.log("Err", err);
    }
  };

  useEffect(() => {
    getAllCompanies();
    getAllUsers();
  }, []);

  const handleEditUserMenuClick = (row) => {
    setId(row.id);
    setCompanyObj(row?.company);
    setFirstName(row.firstName);
    setLastName(row.lastName);
    setDesignation(row.designation);
    setDob(row.dob.substring(0, 10));
    setEmail(row.email);
    setMode("edit");
    setUserModal(true);
  };

  const handleDeleteUserMenuClick = (row) => {
    setFirstName(row.firstName);
    setLastName(row.lastName);
    setId(row.id);
    setWarningModal(true);
  };

  const deleteUserHandler = async () => {
    try {
      var res = await deleteUser(id);
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("Err", res);
        return;
      }
      toDefault();
      getAllUsers();
      setWarningModal(false);
    } catch (err) {
      console.log("Err", err);
    }
  };

  const handleModalHandler = () => {
    setWarningModal(!warningModal);
    toDefault();
  };

  const warningModalBody = () => (
    <p>
      Please confirm that you wish to delete user{" "}
      <span>
        {firstName} {lastName} (ID: {id})
      </span>
    </p>
  );

  const handleUserStatus = async (row) => {
    try {
      var res = await changeUserActiveStatus({
        id: row.id,
        status: !row.is_active,
      });
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("Err", res);
        return;
      }
      getAllUsers();
    } catch (err) {
      console.log("Err", err);
    }
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="header">
          <h4>Users</h4>
          <div className="add-user-button">
            <button onClick={handleAddUser}>Add User</button>
          </div>
        </div>
        {userList.length === 0 ? (
          <div className="no-users">
            <div>
              <AccountCircleOutlined className="logo" />
              <p style={{ color: "white", opacity: 0.7 }}>No users to show</p>
            </div>
          </div>
        ) : (
          <div className="table-container">
            <div className="table">
              <MaterialReactTable
                enableRowActions
                positionToolbarAlertBanner="bottom"
                columns={[
                  {
                    accessorKey: "id",
                    header: "User ID",
                    Cell: ({ cell, row }) => {
                      return (
                        <div>
                          <div>
                            {cell.getValue()}
                            <br />
                            {row.original.is_active ? (
                              <Badge pill bg="success">
                                Active
                              </Badge>
                            ) : (
                              <Badge pill bg="danger">
                                Deactivated
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    },
                  },
                  {
                    accessorKey: "firstName",
                    header: "First Name",
                  },
                  {
                    accessorKey: "lastName",
                    header: "Last Name",
                  },
                  {
                    accessorKey: "email",
                    header: "Email",
                  },
                  {
                    accessorKey: "designation",
                    header: "Designation",
                  },
                  {
                    accessorKey: "dob",
                    header: "Date of Birth",
                    Cell: ({ cell }) => {
                      return <p>{new Date(cell.getValue()).toDateString()}</p>;
                    },
                  },
                ]}
                data={userList}
                renderRowActionMenuItems={({ closeMenu, row }) => [
                  <MenuItem
                    key={0}
                    onClick={() => {
                      handleEditUserMenuClick(row.original);
                      closeMenu();
                    }}
                    sx={{ m: 0 }}
                  >
                    <ListItemIcon>
                      <EditOutlined />
                    </ListItemIcon>
                    Edit user
                  </MenuItem>,
                  <MenuItem
                    key={1}
                    onClick={() => {
                      console.log("dmjskkmdsd", row);
                      handleUserStatus(row.original);
                      closeMenu();
                    }}
                    sx={{ m: 0 }}
                  >
                    {row.original.is_active ? (
                      <>
                        <ListItemIcon>
                          <PersonOff />
                        </ListItemIcon>
                        Deactivate User
                      </>
                    ) : (
                      <>
                        <ListItemIcon>
                          <Person />
                        </ListItemIcon>
                        Activate User
                      </>
                    )}
                  </MenuItem>,
                  <MenuItem
                    key={1}
                    onClick={() => {
                      handleDeleteUserMenuClick(row.original);
                      closeMenu();
                    }}
                    sx={{ m: 0 }}
                  >
                    <ListItemIcon>
                      <DeleteForever />
                    </ListItemIcon>
                    Delete user
                  </MenuItem>,
                ]}
              />
            </div>
          </div>
        )}

        {userModal ? (
          <UserDetailsModal
            firstName={firstName}
            lastName={lastName}
            email={email}
            dob={dob}
            designation={designation}
            companyObj={companyObj}
            companyList={companyList}
            handleInputChange={handleInputChange}
            mode={mode}
            open={userModal}
            handleModalClose={handleAddUser}
            handleAddUser={addNewUser}
            handleUpdateUser={updateUserDetails}
            showCompanySelector={true}
          />
        ) : null}
        {warningModal ? (
          <WarningModal
            open={warningModal}
            handleModalHandler={handleModalHandler}
            header="Delete User"
            body={warningModalBody}
            handleConfirmHandler={deleteUserHandler}
          />
        ) : null}
      </div>
    </Layout>
  );
};

export default User;
