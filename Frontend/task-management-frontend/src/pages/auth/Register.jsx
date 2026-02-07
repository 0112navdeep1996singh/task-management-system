import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROLES } from "../../utils/constants";
import { register as registerApi } from "../../api/authApi";
import styles from "../../css/Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", role: ROLES.USER });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerApi(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "User already exists or invalid data");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card} autoComplete="off">
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}

        <input
          className={styles.inputField}
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <input
          className={styles.inputField}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <input
          className={styles.inputField}
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <select
          className={styles.selectField}
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value={ROLES.USER}>User</option>
          <option value={ROLES.ADMIN}>Admin</option>
        </select>

        <button type="submit" className={styles.button}>
          Create Account
        </button>

        <p className={styles.text}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;