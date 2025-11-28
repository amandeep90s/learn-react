import { NavLink } from "react-router-dom";

function Navigation() {
  const navLinkStyle = ({ isActive }) => ({
    padding: "10px 20px",
    textDecoration: "none",
    color: isActive ? "#1976d2" : "#333",
    fontWeight: isActive ? "bold" : "normal",
    borderBottom: isActive ? "3px solid #1976d2" : "3px solid transparent",
    display: "inline-block",
    transition: "all 0.3s ease",
  });

  return (
    <nav
      style={{
        background: "#f5f5f5",
        padding: "15px 20px",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <NavLink to="/" style={navLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/about" style={navLinkStyle}>
          About
        </NavLink>
        <NavLink to="/user/123" style={navLinkStyle}>
          User Profile
        </NavLink>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/date-form"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Date Form
          </NavLink>
        </li>
      </div>
    </nav>
  );
}

export default Navigation;
