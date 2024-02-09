import React, { Component } from "react";
import { getCourses } from "../services/courseService";
import CourseHomeBodyProfessor from "./courseHomeBodyProfessor";

//make sidebar separate component

class CourseHomeProfessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: getCourses(),
      query: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = (event) => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <body id="courseBody">
        <div id="menu">
          <div className="hamburger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="menu-inner">
            <ul className="menu-list">
              <li className="menu-item" id="sidebarlistItem">
                <a onClick={() => (window.location = "/")} id="sidebarItem">
                  Logout
                </a>
              </li>
              <li class="menu-item" id="sidebarlistItem">
                <a
                  onClick={() =>
                    (window.location = "/professor/addCourse")
                  }
                  id="sidebarItem"
                >
                  Add Course
                </a>
              </li>
            </ul>
          </div>
        </div>

        <header id="courseHeader">
          <div className="container p-4">
            <div className="row-cols-auto">
              <div>
                <h3 id="courseTitle">Courses</h3>
              </div>
            </div>
          </div>
        </header>

        <React.Fragment>
          <table className="container mt-5">
            <CourseHomeBodyProfessor courses={this.state.courses} />
          </table>
        </React.Fragment>
      </body>
    );
  }
}

export default CourseHomeProfessor;
