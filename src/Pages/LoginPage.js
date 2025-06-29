import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";

const LoginPage = () => {
  const{login, error} = useLogin()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    await login(email, password)
    setEmail("");
    setPassword("")
  }

  return (
    <div
      style={{ width: "280px", margin: "50px auto", fontFamily: "sans-serif" }}
    >
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email :
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            style={{ width: "100%", padding: "6px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Password :
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            style={{ width: "100%", padding: "6px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "8px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
