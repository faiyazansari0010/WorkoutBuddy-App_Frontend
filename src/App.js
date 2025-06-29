import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import "./App.css";
import NavBar from "./Components/NavBar";
import Login from "./Pages/LoginPage";
import Signup from "./Pages/SignupPage";
import { useAuthContext } from "./Hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/user/login" />}
          />
          <Route
            path="/user/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/user/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
