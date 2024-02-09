import React, { useState } from "react";

function AssignmentForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
                onClick={() => (window.location = "/professor/assignmentList")}
                id="sidebarItem"
              >
                Home
              </a>
            </li>
            <li class="menu-item" id="sidebarlistItem">
              <a
                onClick={() => (window.location = "/professor/courseHome")}
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
              <h3 id="courseTitle">CSC 215 - Create Assignment</h3>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container pt-5">
          <form onSubmit={handleSubmit} className="assignment-form">
            <div className="row">
              <div className="col-4 p-3">
                <div className="form-group">
                  <h5>Assignment Title</h5>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group">
                <h5>Due Date</h5>
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group">
                <h5>Instruction</h5>
                <textarea
                style={{width: 330}}
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group">
                <input id="file" type="file" onChange={handleFileChange} />
              </div>
            </div>
            <button type="submit" className="submit-button mt-2">
          Submit
        </button>
          </form>
        </div>
      </main>
    </body>
  );
}

export default AssignmentForm;
