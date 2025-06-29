import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    const response = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data.token)
    dispatch({type:"SET_TOKEN", payload:data.token})
    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      //Storing data in localstorage
      localStorage.setItem("user", JSON.stringify(data));
      //update user context
      dispatch({ type: "LOGIN", payload: data });
    }
  };
  return {login, error}
};
