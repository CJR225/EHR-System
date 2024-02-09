import React, { useState } from "react";

function FileUploadForm() {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the file data
    console.log(file);
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
            <li class="menu-item" id="sidebarlistItem">
              <a
                onClick={() => (window.location = "/student/assignmentList")}
                id="sidebarItem"
              >
                Home
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

      <main>
      <div className="container pt-5">
      <h4>Assignment #1: Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
      <div className="row mt-4" style={{marginLeft: 1}}>
        <div className="col p-3" id="assignments">
          <div>
            <text className="fw-bold">Assignment 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.</text>
            <text className="fw-semibold" style={{color: "red"}}>(Due 12/20/22 By 11:59 pm)</text>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur necessitatibus nostrum laboriosam
            tenetur nihil similique maxime eligendi, dolore animi fugiat incidunt veniam quaerat hic sint maiores nobis
            rem sunt consequuntur!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam voluptas aspernatur omnis similique.
            Hic totam illo amet cum velit odio illum commodi nostrum exercitationem quae. Excepturi dolore quis in esse.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsam, similique commodi aperiam quos odio
            ipsum blanditiis nihil distinctio veritatis quo error enim necessitatibus cum laboriosam labore sequi
            cumque? Cumque?
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis pariatur iusto tempore quae consequatur
            saepe dolorem libero quia repellendus? Id mollitia sunt repellendus veniam quas perferendis totam provident
            sapiente nam.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem soluta quasi illum pariatur culpa fuga
            perspiciatis temporibus blanditiis doloremque reiciendis dignissimos laboriosam, quis rem qui fugiat enim,
            officiis harum corrupti.
          </p>
        </div>
      </div>
      
      <div className="row mt-4">
        <form onSubmit={handleSubmit} className="file-upload-form">
          <div className="form-group mb-3">
            <input id="file" type="file" onChange={handleFileChange} />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>


      </div>
      </main>

      
    </body>
  );
}

export default FileUploadForm;
