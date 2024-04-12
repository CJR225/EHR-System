import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { FaHome, FaPaperPlane, FaBook, FaFlask, FaMedkit, FaPencilAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

class MainNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeOpen: false,
            PCOpen: false
        };
    }

    handleToggleHomeOpen = () => {
        this.setState({ homeOpen: !this.state.homeOpen });
    }

    handleTogglePCOpen = () => {
        this.setState({ PCOpen: !this.state.PCOpen });
    }

    render() {
        const menuItem = [
            { name: "Dashboard", icon: <FaHome /> },
            { name: "Orders", icon: <FaPaperPlane /> },
            { name: "MAR", icon: <FaBook /> },
            { name: "Labs", icon: <FaFlask /> },
            { name: "Patient Care", icon: <FaMedkit /> },
            { name: "Notes", icon: <FaPencilAlt /> },
            { name: "Logout", path: "/", icon: <TbLogout2 /> }
        ];

        return (
            <div className="sidebarContainer">
                <div className="sidebar">
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path || "#"} key={index} className="sidebarLink">
                            <div onClick={item.name === "Dashboard" ? this.handleToggleHomeOpen : this.handleTogglePCOpen} className="sidebarIcon active">{item.icon}</div>
                        </NavLink>
                    ))}
                </div>
                <div className="sidebarMain">
                    {/* Render children here */}
                </div>
            </div>
        );
    }
}

export default MainNavBar;
