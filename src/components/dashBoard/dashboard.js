import { useEffect, useState } from "react";
import Layout from "../layout";
import "./dashboard.css";
import {
  Business,
  BusinessCenter,
  CloseOutlined,
  DeleteForever,
  EditOutlined,
} from "@mui/icons-material";
import { Modal, Box, TextField, ListItemIcon, MenuItem } from "@mui/material";
import {
  addCompany,
  deleteCompany,
  getCompanyList,
  updateCompanyDetails,
} from "../../api/restApi";
import MaterialReactTable from "material-react-table";
import { useNavigate } from "react-router-dom";
import WarningModal from "../modal/warningModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [companyList, setCompanyList] = useState([]);
  const [addCompanyModal, setAddCompanyModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const [mode, setMode] = useState("add");
  const [warningModal, setWarningModal] = useState(false);
  const handleAddCompany = () => {
    toDefault();
    setAddCompanyModal(!addCompanyModal);
  };

  const handleCompanyNameInput = (e) => {
    setCompanyName(e.target.value);
  };

  const addNewCompany = async (e) => {
    e.preventDefault();
    try {
      var res = await addCompany({
        companyName: companyName,
        companyAddress: companyAddress,
        latitude: latitude,
        longitude: longitude,
      });
      if (res.status === "ERROR") {
        console.log("Err", res);
        return;
      }
      getAllCompanies();
      toDefault();
    } catch (err) {
      console.log("Err", err);
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
    if (document.readyState === "complete" && companyList.length > 0) {
      initMap();
    }
  }, [document.readyState, companyList]);

  const initMap = () => {
    if (!document.getElementById("map")) return;
    var mapArray = companyList.map((data) => {
      return [
        `${data.companyName} <a href="/company/${data.id}">View</a><br>${data.companyAddress}`,
        data.latitude,
        data.longitude,
      ];
    });
    var center = { lat: mapArray[0][1], lng: mapArray[0][2] };
    var map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: center,
    });
    var infowindow = new window.google.maps.InfoWindow({});
    var marker, count;
    for (count = 0; count < mapArray.length; count++) {
      marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          mapArray[count][1],
          mapArray[count][2]
        ),
        map: map,
        title: mapArray[count][0],
      });
      window.google.maps.event.addListener(
        marker,
        "click",
        (function (marker, count) {
          return function () {
            infowindow.setContent(mapArray[count][0]);
            infowindow.open(map, marker);
          };
        })(marker, count)
      );
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  const toDefault = () => {
    setAddCompanyModal(false);
    setCompanyName("");
    setCompanyAddress("");
    setLatitude(null);
    setLongitude(null);
    setCompanyId("");
  };

  const handleCompanyAddressInput = (e) => {
    setCompanyAddress(e.target.value);
    const options = {
      componentRestrictions: { country: "in" },
      fields: ["formatted_address", "geometry", "icon", "name"],
      strictBounds: false,
      // types: ["establishment", "address"],
    };
    var input = document.getElementById("google-search-places");
    const autocomplete = new window.google.maps.places.Autocomplete(
      input,
      options
    );
    window.google.maps.event.addListener(
      autocomplete,
      "place_changed",
      function () {
        var place = autocomplete.getPlace();
        setCompanyAddress(place.formatted_address);
        setLatitude(place.geometry.location.lat());
        setLongitude(place.geometry.location.lng());
      }
    );
  };

  const handleEditCompanyMenuClick = (row) => {
    setCompanyName(row.companyName);
    setCompanyAddress(row.companyAddress);
    setLatitude(row.latitude);
    setLongitude(row.longitude);
    setCompanyId(row.id);
    setAddCompanyModal(true);
    setMode("edit");
  };

  const updateCompanyDetailsHandler = async (e) => {
    e.preventDefault();
    try {
      var res = await updateCompanyDetails({
        companyId,
        companyAddress,
        companyName,
        latitude,
        longitude,
      });
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("Err", res);
        return;
      }
      getAllCompanies();
      toDefault();
      setAddCompanyModal(false);
    } catch (err) {}
  };

  const handleDeleteCompanyMenuClick = (row) => {
    setWarningModal(!warningModal);
    setCompanyName(row.companyName);
    setCompanyId(row.id);
  };

  const handleRemoveCompany = async () => {
    try {
      var res = await deleteCompany(companyId);
      res = await res.json();
      if (res.status === "ERROR") {
        console.log("Err", res);
        return;
      }
      getAllCompanies();
      toDefault();
      setWarningModal(false);
    } catch (err) {}
  };

  const handleModalHandler = () => {
    setWarningModal(!warningModal);
    toDefault();
  };

  const warningModalBody = () => (
    <p>
      Please confirm that you wish to delete <span>{companyName}</span>
    </p>
  );
  return (
    <Layout>
      <div className="dashboard-container">
        <div className="header">
          <h4>Dashboard</h4>
          <button onClick={handleAddCompany}>Add company</button>
        </div>
        {companyList.length === 0 ? (
          <div className="no-company">
            <div>
              <Business className="logo" />
              <p>No companies to show</p>
            </div>
          </div>
        ) : (
          <div className="table-container">
            <div className="map-container">
              <div id="map"></div>
            </div>
            <div className="table">
              <MaterialReactTable
                enableRowActions
                positionToolbarAlertBanner="bottom"
                columns={[
                  {
                    accessorKey: "companyName",
                    header: "Company Name",
                  },
                  {
                    accessorKey: "companyAddress",
                    header: "Company Address",
                  },
                  {
                    accessorKey: "latitude",
                    header: "Company latitude",
                  },
                  {
                    accessorKey: "longitude",
                    header: "Company longitude",
                  },
                ]}
                data={companyList}
                renderRowActionMenuItems={({ closeMenu, row }) => [
                  <MenuItem
                    key={0}
                    onClick={() => {
                      navigate(`/company/${row.original.id}`);
                      closeMenu();
                    }}
                    sx={{ m: 0 }}
                  >
                    <ListItemIcon>
                      <BusinessCenter />
                    </ListItemIcon>
                    View Company
                  </MenuItem>,
                  <MenuItem
                    key={0}
                    onClick={() => {
                      handleEditCompanyMenuClick(row.original);
                      closeMenu();
                    }}
                    sx={{ m: 0 }}
                  >
                    <ListItemIcon>
                      <EditOutlined />
                    </ListItemIcon>
                    Edit Company
                  </MenuItem>,
                  <MenuItem
                    key={1}
                    onClick={() => {
                      handleDeleteCompanyMenuClick(row.original);
                      closeMenu();
                    }}
                    sx={{ m: 0 }}
                  >
                    <ListItemIcon>
                      <DeleteForever />
                    </ListItemIcon>
                    Delete Company
                  </MenuItem>,
                ]}
              />
            </div>
          </div>
        )}
        <Modal
          open={addCompanyModal}
          onClose={handleAddCompany}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="company-modal">
            <div className="header">
              <h3>
                {mode === "add" ? "Add Company" : "Update Company Details"}
              </h3>
              <CloseOutlined
                onClick={handleAddCompany}
                style={{ cursor: "pointer" }}
              />
            </div>
            <hr />

            <Box component="form" autoComplete="off">
              <div className="company-form-fields">
                <div className="child">
                  <TextField
                    id="outlined-basic"
                    label="Company Name"
                    variant="outlined"
                    type="text"
                    fullWidth
                    placeholder="Company Name"
                    sx={{ width: 400 }}
                    onChange={handleCompanyNameInput}
                    value={companyName}
                    required
                  />
                </div>
                <div className="child">
                  <TextField
                    fullWidth
                    onChange={handleCompanyAddressInput}
                    label="Company Address"
                    id="google-search-places"
                    type="text"
                    sx={{ width: 400 }}
                    value={companyAddress}
                    required
                  />
                </div>
              </div>
              <hr />
              <Box component="footer">
                <div className="add-button">
                  {mode === "add" ? (
                    <button type="submit" onClick={addNewCompany}>
                      Add
                    </button>
                  ) : (
                    <button type="submit" onClick={updateCompanyDetailsHandler}>
                      Update
                    </button>
                  )}
                </div>
              </Box>
            </Box>
          </Box>
        </Modal>
        {warningModal ? (
          <WarningModal
            open={warningModal}
            handleModalHandler={handleModalHandler}
            header="Delete Company"
            body={warningModalBody}
            handleConfirmHandler={handleRemoveCompany}
          />
        ) : null}
      </div>
    </Layout>
  );
};

export default Dashboard;
