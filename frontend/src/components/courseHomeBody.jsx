import React, { Component } from "react";
import logo from "../img/SER340img.png";
import logo2 from "../img/CSC215img.jpeg";
import { Link } from "react-router-dom";

class CourseHomeBody extends Component {
  render() {
    const { courses } = this.props;
   
    return (
        
      <tbody>

        {courses.map((course, index) => (
          <td key={index}>
            <div
              className="card shadow-lg border-0" id="courseCard"
              style={{ marginLeft: "35px", width: "25rem" }}
              onClick={() => { window.location ='/student/assignmentList'  }}
            >
              <img
                src={logo2}
                alt="Logo"
                className="bd-placeholder-img card-img-top"
                style={{ borderRadius: 0,height: 225 }}
              />
              <div className="card-body" id="courseCardBody">
                <p className="card-text fw-bold fs-6">
                  <strong>{course.course}</strong>
                </p>
                <p className="card-text fw-bold fs-6">{course.name}</p>
                <text style={{ fontSize: 15 }}>{course.instructor}</text>
                
              </div>
            </div>
          </td>
        ))}
      </tbody>
    );
  }
}

export default CourseHomeBody;
