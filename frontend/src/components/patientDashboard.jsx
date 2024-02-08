import React, { Component } from "react";

class patientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <body style={{ backgroundColor: "#26394e", minHeight: "100" }}>
        <header>
          <div className="container p-4">
            <div className="row-cols-auto">
              <div>
                <h3>Courses</h3>
              </div>
            </div>
          </div>
        </header>
      </body>
    );
  }
}

export default patientDashboard;
