import Layout from "../layout";
import "./companyDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addUser,
  getCompanyDetails,
  getCompanyList,
  migrateUser,
  removeUser,
  updateUser,
} from "../../api/restApi";
import { AccountCircleOutlined } from "@mui/icons-material";
import UserCard from "../cards/userCard";
import UserDetailsModal from "../modal/userModal";
import MigrateUserModal from "../modal/migrateUserModal";
import WarningModal from "../modal/warningModal";

const CompanyDetails = () => {
  const { companyId } = useParams();
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [users, setUsers] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [userModal, setUserModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [designation, setDesignation] = useState("");
  const [mode, setMode] = useState("add");
  const [id, setId] = useState("");
  const [migrateModal, setMigrateModal] = useState(false);
  const [newCompanyId, setNewCompanyId] = useState("");
  const [warningModal, setWarningModal] = useState(false);

  const handleMenuClick = (event, user) => {
    console.log("menuclicked", event, user);
    if (event === "update") {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setDob(user.dob.substring(0, 10));
      setDesignation(user.designation);
      setId(user.id);
      setMode("edit");
      setUserModal(true);
    } else if (event === "remove") {
      setWarningModal(true);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setId(user.id);
    } else if (event === "migrate") {
      setId(user.id);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setMigrateModal(true);
    }
  };

  const getCompanyDetailsById = async () => {
    try {
      var res = await getCompanyDetails(companyId);
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("Err", res.data);
        return;
      }
      setCompanyName(res.data.companyName);
      setCompanyAddress(res.data.companyAddress);
      setLatitude(res.data.latitude);
      setLongitude(res.data.longitude);
      setUsers(res.data.users);
    } catch (err) {
      console.log("err", err);
    }
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
    if (companyId) {
      getCompanyDetailsById();
      getAllCompanies();
    }
  }, [companyId]);

  const handleAddUser = () => {
    toDefault();
    setMode("add");
    setUserModal(!userModal);
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
        companyId,
      });
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("Error", res);
        return;
      }
      await getCompanyDetailsById();
      setUserModal(false);
    } catch (err) {}
  };

  const handleInputChange = (e) => {
    if (e.target.name === "firstName") return setFirstName(e.target.value);
    if (e.target.name === "lastName") return setLastName(e.target.value);
    if (e.target.name === "email") return setEmail(e.target.value);
    if (e.target.name === "dob") return setDob(e.target.value);
    if (e.target.name === "designation") return setDesignation(e.target.value);
  };

  const toDefault = () => {
    setFirstName("");
    setLastName("");
    setDesignation("");
    setDob("");
    setEmail("");
    setId("");
    setNewCompanyId("");
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
        companyId,
      });
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("err", res);
        return;
      }
      toDefault();
      getCompanyDetailsById();
      setUserModal(!userModal);
    } catch (err) {
      console.log("ERR", err);
    }
  };

  const handleMigrateModal = () => {
    setMigrateModal(!migrateModal);
  };

  const handleMigrateUser = async () => {
    try {
      var res = await migrateUser({ id, companyId, newCompanyId });
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("ERR", res);
        return;
      }
      toDefault();
      handleMigrateModal();
      getCompanyDetailsById();
    } catch (err) {}
  };

  const handleRemoveUser = async () => {
    try {
      var res = await removeUser({
        userId: id,
        companyId,
      });
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("Err", res);
        return;
      }
      setWarningModal(false);
      getCompanyDetailsById();
      toDefault();
    } catch (err) {}
  };

  const handleCompanyChange = (id) => {
    setNewCompanyId(id);
  };

  const handleMigrateUserModal = () => {
    setMigrateModal(!migrateModal);
  };

  const handleModalHandler = () => {
    setWarningModal(!warningModal);
    toDefault();
  };

  const warningModalBody = () => (
    <p>
      Please confirm that you wish to remove user{" "}
      <span>
        {firstName} {lastName} (ID: {id})
      </span>{" "}
      from <span>{companyName}</span>
    </p>
  );

  useEffect(() => {
    console.log("initmap", latitude, document.readyState);
    if (latitude && longitude) {
      console.log("initmap", latitude);
      initMap();
    }
  }, [latitude, longitude, document.readyState]);

  const initMap = () => {
    if (!document.getElementById("map")) return;
    var mapPoint = [`${companyName}<br>${companyAddress}`, latitude, longitude];

    var center = { lat: latitude, lng: longitude };
    var map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: center,
    });
    var infowindow = new window.google.maps.InfoWindow({});
    var marker;
    marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(mapPoint[1], mapPoint[2]),
      map: map,
      title: mapPoint[0],
    });
    window.google.maps.event.addListener(
      marker,
      "click",
      (function (marker) {
        return function () {
          infowindow.setContent(mapPoint[0]);
          infowindow.open(map, marker);
        };
      })(marker)
    );
  };
  return (
    <Layout>
      <div className="company-details-container">
        <div style={{ padding: "20px" }}>
          <div className="detail-header">
            <div>
              <h1>{companyName}</h1>
              <p>{companyAddress}</p>
            </div>
            <div className="add-user-button">
              <button onClick={handleAddUser}>Add User</button>
            </div>
          </div>
          <div id="map" style={{ height: "300px" }}></div>
          {users.length === 0 ? (
            <div className="no-users" style={{ height: "300px" }}>
              <div>
                <AccountCircleOutlined className="logo" />
                <p>No users to show</p>
              </div>
            </div>
          ) : (
            <div className="user-cards">
              {users.map((data) => {
                return (
                  <UserCard data={data} handleMenuClick={handleMenuClick} />
                );
              })}
            </div>
          )}
        </div>
        {userModal ? (
          <UserDetailsModal
            firstName={firstName}
            lastName={lastName}
            email={email}
            dob={dob}
            designation={designation}
            companyList={companyList}
            handleInputChange={handleInputChange}
            mode={mode}
            open={userModal}
            handleModalClose={handleAddUser}
            handleAddUser={addNewUser}
            handleUpdateUser={updateUserDetails}
            showCompanySelector={false}
          />
        ) : null}
        {migrateModal ? (
          <MigrateUserModal
            open={migrateModal}
            firstName={firstName}
            lastName={lastName}
            id={id}
            companyList={companyList}
            handleCompanyChange={handleCompanyChange}
            handleMigrateUser={handleMigrateUser}
            handleMigrateUserModal={handleMigrateUserModal}
          />
        ) : null}
        {warningModal ? (
          <WarningModal
            open={warningModal}
            handleModalHandler={handleModalHandler}
            header="Remove User"
            body={warningModalBody}
            handleConfirmHandler={handleRemoveUser}
          />
        ) : null}
      </div>
    </Layout>
  );
};

export default CompanyDetails;
