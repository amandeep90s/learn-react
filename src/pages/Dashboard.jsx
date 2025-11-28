import {
  useLocation,
  useMatch,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const match = useMatch("/dashboard");
  const isExactMatch = match !== null;

  // Context to share with nested routes
  const outletContext = {
    user: "Admin User",
    permissions: ["read", "write", "delete"],
    theme: "dark",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>
        Demonstrating <code>useMatch</code>, <code>useLocation</code>, and{" "}
        <code>useOutletContext</code> hooks
      </p>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#e8f5e9",
          borderRadius: "5px",
        }}
      >
        <h3>useMatch Information:</h3>
        <p>
          <strong>Exact Match for /dashboard:</strong>{" "}
          {isExactMatch ? "Yes" : "No"}
        </p>
        {match && (
          <>
            <p>
              <strong>Matched Path:</strong> {match.pathname}
            </p>
            <p>
              <strong>Pattern:</strong> {match.pattern.path}
            </p>
          </>
        )}
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#fce4ec",
          borderRadius: "5px",
        }}
      >
        <h3>Location State:</h3>
        <p>
          <strong>Came from:</strong>{" "}
          {location.state?.from || "Direct navigation"}
        </p>
        <p>
          <strong>Full State:</strong>{" "}
          {JSON.stringify(location.state) || "None"}
        </p>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#f3e5f5",
          borderRadius: "5px",
        }}
      >
        <h3>Outlet Context (shared with nested routes):</h3>
        <p>
          <strong>User:</strong> {outletContext.user}
        </p>
        <p>
          <strong>Permissions:</strong> {outletContext.permissions.join(", ")}
        </p>
        <p>
          <strong>Theme:</strong> {outletContext.theme}
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Nested Routes:</h3>
        <nav style={{ marginBottom: "20px" }}>
          <Link
            to="/dashboard/stats"
            style={{
              marginRight: "15px",
              padding: "8px 16px",
              background: "#2196f3",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            Stats
          </Link>
          <Link
            to="/dashboard/settings"
            style={{
              padding: "8px 16px",
              background: "#2196f3",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            Settings
          </Link>
        </nav>

        <div
          style={{
            padding: "15px",
            background: "#f5f5f5",
            borderRadius: "5px",
            minHeight: "100px",
          }}
        >
          <Outlet context={outletContext} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
