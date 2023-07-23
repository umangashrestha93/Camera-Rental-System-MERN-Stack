import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import App from "../../App";

export function AutoLogin(children) {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const token = cookies.get("adminToken");

  const autoLogin = () => {
    if (token) {
      return navigate("/");
    }
    else return navigate("/login"); 
  };

  useEffect(() => {
    autoLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <App />;
}
