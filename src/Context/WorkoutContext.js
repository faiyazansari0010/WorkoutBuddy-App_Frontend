import { createContext, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";

export const AppContext = createContext();

const WorkoutContext = ({ children }) => {
  const { user } = useAuthContext();
  const token = user?.token;

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
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/workouts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const workoutData = response.data;
      setWorkouts(workoutData);
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
