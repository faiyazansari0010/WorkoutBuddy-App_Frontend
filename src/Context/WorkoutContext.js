import { createContext, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";

export const AppContext = createContext();

const WorkoutContext = ({ children }) => {
  const { token } = useAuthContext();
  console.log("Token before getWorkouts - ", token);
  const [form, setForm] = useState({
    title: "",
    reps: "",
    load: "",
  });

  const [workouts, setWorkouts] = useState(null);

  const [edittingInfo, setEdittingInfo] = useState({
    isEditting: false,
    editWorkoutId: null,
  });

  const getWorkouts = async () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    if (!token) {
      console.log("User is not logged in.");
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/workouts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  return (
    <>
      <AppContext.Provider
        value={{
          form,
          setForm,
          workouts,
          setWorkouts,
          edittingInfo,
          setEdittingInfo,
          getWorkouts,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export default WorkoutContext;
