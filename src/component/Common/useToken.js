import { useState } from "react";
import { headers } from "./CommonModal";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = tokenString;
    headers.Authorization = "Bearer " + userToken;
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
    headers.Authorization = "Bearer " + userToken;
  };

  return {
    setToken: saveToken,
    token,
  };
}
