import React from "react";

const assignments = [
  {
    id: 1,
    title: "Assignment 1",
    name: "lorem lorem lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur necessitatibus nostrum laboriosam tenetur nihil similique maxime eligendi, dolore animi fugiat incidunt veniam quaerat hic sint maiores nobis rem sunt consequuntur!",
    date: "3/30/23",
  },
  {
    id: 2,
    title: "Assignment 2",
    name: "lorem lorem lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur necessitatibus nostrum laboriosam tenetur nihil similique maxime eligendi, dolore animi fugiat incidunt veniam quaerat hic sint maiores nobis rem sunt consequuntur!",
    date: "3/30/23",
  },
  {
    id: 3,
    title: "Assignment 3",
    name: "lorem lorem lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur necessitatibus nostrum laboriosam tenetur nihil similique maxime eligendi, dolore animi fugiat incidunt veniam quaerat hic sint maiores nobis rem sunt consequuntur!",
    date: "3/30/23",
  },
  {
    id: 4,
    title: "Assignment 4",
    name: "lorem lorem lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur necessitatibus nostrum laboriosam tenetur nihil similique maxime eligendi, dolore animi fugiat incidunt veniam quaerat hic sint maiores nobis rem sunt consequuntur!",
    date: "3/30/23",
  },
  
];

function AssignmentList() {
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
            <li className="menu-item" id="sidebarlistItem">
              <a
                onClick={() => (window.location = "/student/courseHome")}
                id="sidebarItem"
              >
                Courses
              </a>
            </li>
          </ul>
        </div>
      </div>

      <header id="courseHeader">
        <div className="container p-4">
          <div className="row-cols-auto">
            <div>
              <h3 id="courseTitle">CSC 215 - Algorthim Design and Analysis</h3>
            </div>
          </div>
        </div>
      </header>
      <div className="container mt-4" style={{ marginRight: 40 }}>
        <h4>Assignments</h4>
      </div>

      <div className="container mt-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="assignment-item"
            onClick={() => {
              window.location = "/student/assignment";
            }}
          >
            <h2>{assignment.title}</h2>
            <p>{assignment.name}</p>
            <p>{assignment.description}</p>
            <p className="due-date" style={{ color: "red" }}>
              Due Date: {assignment.date}
            </p>
          </div>
        ))}
      </div>
    </body>
  );
}

export default AssignmentList;
