import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, Typography, IconButton } from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";
import { useStateValue } from "../StateProvider";
import SidebarUser from "../SidebarUser/SidebarUser";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
const Sidebar = () => {
  const [{ users, currentUser }, dispatch] = useStateValue();

  const [userfilter, setUserFilter] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();


  useEffect(() => {
    const result = users.filter((user) => {
      const lowercaseUser = user?.name?.toLowerCase();
      const searchValueUser = searchValue.toLowerCase();
      if (
        lowercaseUser.includes(searchValueUser) &&
        user.uid !== currentUser.uid
      )
        return lowercaseUser;
      return false;
    });
    setUserFilter(result);
  }, [searchValue]);

  const handlePowerOffClick = (e) => {
    auth.signOut().then(() => {
      history.push("/");
      dispatch({
        type: "SET_LOGGED_USER",
        payload: {
          user: {},
        },
      });
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__upperPart">
        <div className="sidebar__imageContainer">
          <Avatar src={currentUser?.imageUrl} />
          <Typography variant="h5">Chats</Typography>
        </div>
        <IconButton
          className="sidebar__iconContainer"
          onClick={handlePowerOffClick}
        >
          <PowerSettingsNewIcon />
        </IconButton>
      </div>
      <div className="sidebar__inputContainer">
        <SearchIcon />
        <input
          placeholder="Search Messenger"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="sidebar__lowerPart">
        {userfilter?.map(({ uid, name, email, imageUrl }) => (
          <SidebarUser
            key={uid}
            name={name}
            email={email}
            imageUrl={imageUrl}
            uid={uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
