import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";

class HomeSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: null,
            demographics: null,
            medications: [],
            historyInfo: null
        };
    }

    componentDidMount() {
        // Fetch initial data when component mounts
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        // Check if selectedPatient or activeTab has changed
        if (
            prevProps.selectedPatient !== this.props.selectedPatient ||
            prevState.activeTab !== this.state.activeTab
        ) {
            // Refetch data when selectedPatient or activeTab changes
            this.fetchData();
        }
    }

    fetchData() {
        const { selectedPatient, activeTab } = this.props;
        if (selectedPatient && activeTab === 'Demographics') {
            axios
                .get(`http://localhost:3001/patients/${selectedPatient.id}/demographics`)
                .then((response) => {
                    this.setState({ demographics: response.data });
                })
                .catch((error) => {
                    console.error('Error fetching patient demographics:', error);
                });
        }

        if (selectedPatient && (activeTab === 'Med Rec' || activeTab === 'MAR')) {
            axios
                .get(`http://localhost:3001/patients/${selectedPatient.id}/medications`)
                .then((response) => {
                    this.setState({ medications: response.data });
                })
                .catch((error) => {
                    console.error('Error fetching patient medications:', error);
                });
        }

        if (activeTab === 'History') {
            // Fetch history data if needed
        }

        // Set activeTab in state
        this.setState({ activeTab });
    }

    handleTabClick = (name) => {
        // Your logic for handling tab click
        console.log(`Clicked on tab: ${name}`);
    }

    render() {
        const menuItem = [
            { name: 'Demographics' },
            { name: 'Med Rec' },
            { name: "History" }
        ];

        return (
            <div className="homeSidebarContainer">
                <div className="homeSidebar">
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="homeLink" activeClassName="active" onClick={() => this.handleTabClick(item.name)}>
                            <div className="homeLink_text">{item.name}</div>
                        </NavLink>
                    ))}
                </div>
                <div className="homeMain">
                    {/* Render content based on active tab */}
                    {this.state.activeTab === 'Demographics' && this.state.demographics && (
                        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ borderBottom: '2px solid #418FDE', color: '#333', paddingBottom: '10px', marginBottom: '20px' }}>Patient Demographics</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <p><strong>Name:</strong> {this.state.demographics.fname} {this.state.demographics.lname}</p>
                                <p><strong>Date of Birth:</strong> {this.state.demographics.dob}</p>
                                {/* Additional demographic information */}
                            </div>
                        </div>
                    )}

                    {this.state.activeTab === 'Med Rec' && (
                        <div style={{ margin: '4vh', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ borderBottom: '2px solid #418FDE', paddingBottom: '10px', marginBottom: '20px' }}>Medication Reconciliation</h3>
                            <div style={{ overflowX: 'auto' }}>
                                {/* Medication reconciliation table */}
                            </div>
                        </div>
                    )}

                    {this.state.activeTab === 'History' && this.state.historyInfo && (
                        <div style={{ margin: '4vh', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '20px' }}>Patient History</h3>
                            <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: 'white', borderRadius: '8px', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)' }}>
                                {/* Patient history content */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default HomeSideBar;

