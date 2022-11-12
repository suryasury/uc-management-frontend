import "./userCard.css";
import { Dropdown } from "antd";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserCard = ({ data, handleMenuClick }) => {
  const items = [
    {
      key: "1",
      label: "Update",
      onClick: () => handleMenuClick("update", data),
    },
    {
      key: "2",
      label: "Migrate",
      onClick: () => handleMenuClick("migrate", data),
    },
    {
      key: "3",
      label: "Remove",
      onClick: () => handleMenuClick("remove", data),
    },
  ];
  return (
    <div className="user-card-container">
      <div className="user-card-header">
        <h2>
          {data.firstName} {data.lastName} (ID:{data.id})
        </h2>
        <div>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <div style={{ color: "black" }}>
              <MoreVertIcon />
            </div>
          </Dropdown>
        </div>
      </div>
      <hr style={{ color: "black" }} />
      <div className="user-card-content">
        <div>
          <h4>Email:</h4>
          <h4>Designation:</h4>
          <h4>DOB:</h4>
        </div>
        <div>
          <p>{data.email}</p>
          <p>{data.designation}</p>
          <p>{new Date(data.dob).toISOString().substring(0, 10)}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
