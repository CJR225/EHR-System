import { useEffect } from "react";
import auth from "../services/authService";

function Logout() {
  useEffect(() => {
    auth.logout();
    window.location = "/login";
  });

  return null;
}

export default Logout;
