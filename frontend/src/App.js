import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import patientDashboard from "./components/patientDashboard";
import login from "./components/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<patientDashboard/>}/>
        <Route path="/login" element={<login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
