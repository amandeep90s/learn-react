import { useNavigate, useLocation } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToUser = () => {
    navigate("/user/123");
  };

  const handleNavigateToAbout = () => {
    navigate("/about?tab=team&section=leadership");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>
      <p>
        Demonstrating <code>useNavigate</code> and <code>useLocation</code>{" "}
        hooks
      </p>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#f0f0f0",
          borderRadius: "5px",
        }}
      >
        <h3>Current Location Info:</h3>
        <p>
          <strong>Pathname:</strong> {location.pathname}
        </p>
        <p>
          <strong>Search:</strong> {location.search || "None"}
        </p>
        <p>
          <strong>Hash:</strong> {location.hash || "None"}
        </p>
        <p>
          <strong>State:</strong> {JSON.stringify(location.state) || "None"}
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Navigation Examples:</h3>
        <button
          onClick={handleNavigateToUser}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Go to User Profile (ID: 123)
        </button>
        <button
          onClick={handleNavigateToAbout}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Go to About with Query Params
        </button>
        <button
          onClick={() => navigate("/dashboard", { state: { from: "home" } })}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Go to Dashboard with State
        </button>
      </div>
    </div>
  );
}

export default Home;
