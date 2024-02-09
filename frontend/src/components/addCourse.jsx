import React, { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data
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
              <h3 id="courseTitle">Add Course</h3>
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
                  <h5>Course Title</h5>
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
                <h5>Course Name</h5>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group">
                <h5>Course Code</h5>
                <input
                  id="code"
                  type="number"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="submit-button mt-4">
              Submit
            </button>
          </form>
        </div>
      </main>
    </body>
  );
}

export default AddCourse;
