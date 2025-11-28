import { useNavigate, useLocation } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "72px", margin: "20px 0" }}>404</h1>
      <h2>Page Not Found</h2>
      <p>
        The page <code>{location.pathname}</code> does not exist.
      </p>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginLeft: "10px",
            padding: "12px 24px",
            fontSize: "16px",
            background: "#757575",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
