import React from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarUser.css'
import {Link} from 'react-router-dom'
const SidebarUser = ({ name, uid, imageUrl, email }) => {
    return (
      <Link to={`/room/${uid}`}>
        <div className="sidebarUser">
          <div className="sidebarUser__imageContainer">
            <Avatar src={imageUrl} />
          </div>
          <div className="sidebar__mainContainer">
            <div>{name}</div>
          </div>
        </div>
      </Link>
    );
}

export default SidebarUser
