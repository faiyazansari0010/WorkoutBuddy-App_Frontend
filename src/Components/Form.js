import { useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context/WorkoutContext";
import { useAuthContext } from "../Hooks/useAuthContext";

const Form = () => {
  const { user } = useAuthContext();
  const token = user?.token;
  console.log("TOKEN IN FORM:", token);

  const { form, setForm, edittingInfo, setEdittingInfo, getWorkouts } =
    useContext(AppContext);

  //POST Request
  const updateFormField = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const createWorkout = async (e) => {
    e.preventDefault();
    if (!user || !token) {
      alert("You must be logged in to create a workout.");
      return;
    }

    if (!form.title || !form.reps || !form.load) {
      alert("Please fill all fields");
      return;
    }

    if (edittingInfo.isEditting) {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/${edittingInfo.editWorkoutId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEdittingInfo({ isEditting: false, editWorkoutId: null });
    } else {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/workouts`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    setForm({
      title: "",
      reps: "",
      load: "",
    });

    getWorkouts();
  };
  return (
    <>
      <form
        onSubmit={(e) => createWorkout(e)}
        style={{
          width: "450px",
          margin: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#f9f9f9",
          height: "400px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Record
        </h1>

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={(e) => updateFormField(e)}
          style={{
            width: "100%",
            padding: "8px",
            margin: "6px 0 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <label>Reps</label>
        <input
          type="number"
          name="reps"
          value={form.reps}
          onChange={(e) => updateFormField(e)}
          style={{
            width: "100%",
            padding: "8px",
            margin: "6px 0 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <label>Load</label>
        <input
          type="number"
          name="load"
          value={form.load}
          onChange={(e) => updateFormField(e)}
          style={{
            width: "100%",
            padding: "8px",
            margin: "6px 0 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {edittingInfo.isEditting ? "Update" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default Form;
