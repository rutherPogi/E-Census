import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        password,
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error Registering User");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
    
  );
};

export default Register;
