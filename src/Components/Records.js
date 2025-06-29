import React from "react";
import { useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context/WorkoutContext";
import { useAuthContext } from "../Hooks/useAuthContext";

const Records = () => {
  const { token } = useAuthContext();
  const { setForm, setEdittingInfo, getWorkouts, workouts } =
    useContext(AppContext);
  useEffect(() => {
    getWorkouts();
  }, [getWorkouts]);

  //DELETE Request
  const deleteWorkout = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/workouts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getWorkouts();
  };

  // UPDATE Request
  const updateWorkout = (item) => {
    setEdittingInfo({ isEditting: true, editWorkoutId: item._id });
    setForm({
      title: item.title,
      reps: item.reps,
      load: item.load,
    });
  };

  return (
    <div>
      {workouts &&
        workouts.map((item) => {
          return (
            <div key={item._id}>
              <div
                className="record"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "250px",
                  margin: "10px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#ffff",
                  boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div>
                  <h1 style={{ color: "green", margin: "0" }}>{item.title}</h1>
                  <p style={{ margin: "0" }}>Reps: {item.reps}</p>
                  <p style={{ margin: "0" }}>Load: {item.load} kg</p>
                </div>

                <div style={{ display: "flex", marginTop: "10px" }}>
                  <button
                    onClick={() => deleteWorkout(item._id)}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      height: "20px",
                      marginRight: "6px",
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => updateWorkout(item)}
                    style={{
                      backgroundColor: "#3498db",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      height: "20px",
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Records;
