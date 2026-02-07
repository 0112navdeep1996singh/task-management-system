import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Task Manager</h2>

      <div style={styles.links}>
        {user ? (
          <>
            {isAdmin ? (
              <Link to="/admin" style={styles.link}>
                Admin Dashboard
              </Link>
            ) : (
              <Link to="/dashboard" style={styles.link}>
                My Tasks
              </Link>
            )}

            <span style={styles.user}>👋 {user.username}</span>

            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#1f2937",
    color: "#fff",
  },
  logo: {
    margin: 0,
    fontSize: "20px",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
  },
  user: {
    fontSize: "14px",
  },
  logout: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Navbar;