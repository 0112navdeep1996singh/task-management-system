import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { login as loginApi } from "../../api/authApi";
import styles from "../../css/Login.module.css";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginApi(form);
      login(res.data); 
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        placeholder="Email"
        className={styles.inputField}
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
        placeholder="Password"
        className={styles.inputField}
      />
      <button type="submit" className={styles.button}>
        Login
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default Login;