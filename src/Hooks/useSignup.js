import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    console.log("Inside signup function")
    setError(null);
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
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
  return {signup, error}
};
