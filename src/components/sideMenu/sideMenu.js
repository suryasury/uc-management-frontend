import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Business, AccountCircle } from "@mui/icons-material";
import "./sideMenu.css";
import { Link } from "react-router-dom";
const AppSideBar = ({ toggled, rtl }) => {
  return (
    <div className="sidemenu-container">
      <Sidebar
        defaultCollapsed={false}
        collapsedWidth={"0px"}
        // style={{ backgroundColor: "#24263a" }}
      >
        <div className="sideMenu-header">
          <div>
            <h2>CMS</h2>
          </div>
        </div>
        <Menu>
          <MenuItem
            icon={<Business />}
            routerLink={<Link to={"/"} />}
            style={{ color: "white", fontSize: "20px" }}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<AccountCircle />}
            routerLink={<Link to={"/user"} />}
            style={{ color: "white", fontSize: "20px" }}
          >
            Users
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default AppSideBar;
