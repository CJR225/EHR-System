import React, { Component } from "react";
import { FaHome, FaPaperPlane, FaBook, FaFlask, FaMedkit, FaPencilAlt } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import HomeSideBar from "./homeSideBar";

class MainNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMenuItem: "Dashboard",
            isDashboardExpanded: false
        };
    }

    handleMenuItemClick = (name) => {
        this.setState({ activeMenuItem: name });
        if (name === "Dashboard") {
            this.setState({ isDashboardExpanded: !this.state.isDashboardExpanded });
        } else {
            this.setState({ isDashboardExpanded: false });
        }
    }

    render() {
        const menuItem = [
            { name: "Dashboard", icon: <FaHome />, component: <HomeSideBar /> },
            { name: "Orders", icon: <FaPaperPlane /> },
            { name: "MAR", icon: <FaBook /> },
            { name: "Labs", icon: <FaFlask /> },
            { name: "Patient Care", icon: <FaMedkit /> },
            { name: "Notes", icon: <FaPencilAlt /> },
            { name: "Logout", path: "/", icon: <TbLogout2 /> }
        ];

        const { activeMenuItem, isDashboardExpanded } = this.state;

        return (
            <div className="sidebarContainer">
                <div className="sidebar">
                    {menuItem.map((item, index) => (
                        <div key={index} className="sidebarLink" onClick={() => this.handleMenuItemClick(item.name)}>
                            <div className={`sidebarIcon ${activeMenuItem === item.name ? "active" : ""}`}>{item.icon}</div>
                        </div>
                    ))}
                </div>
                <div className="sidebarMain">
                    {activeMenuItem === "Dashboard" && isDashboardExpanded && <HomeSideBar />}
                </div>
            </div>
        );
    }
}

export default MainNavBar;
