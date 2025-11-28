import { useSearchParams, useNavigate } from "react-router-dom";

function About() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tab = searchParams.get("tab") || "overview";
  const section = searchParams.get("section") || "main";

  const handleTabChange = (newTab) => {
    setSearchParams({ tab: newTab, section });
  };

  const handleSectionChange = (newSection) => {
    setSearchParams({ tab, section: newSection });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>About Page</h1>
      <p>
        Demonstrating <code>useSearchParams</code> hook
      </p>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#fff3e0",
          borderRadius: "5px",
        }}
      >
        <h3>Current Search Parameters:</h3>
        <p>
          <strong>Tab:</strong> {tab}
        </p>
        <p>
          <strong>Section:</strong> {section}
        </p>
        <p>
          <strong>All Params:</strong> {searchParams.toString()}
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Change Tab:</h3>
        <button
          onClick={() => handleTabChange("overview")}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            background: tab === "overview" ? "#1976d2" : "#e0e0e0",
            color: tab === "overview" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Overview
        </button>
        <button
          onClick={() => handleTabChange("team")}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            background: tab === "team" ? "#1976d2" : "#e0e0e0",
            color: tab === "team" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Team
        </button>
        <button
          onClick={() => handleTabChange("contact")}
          style={{
            padding: "8px 16px",
            background: tab === "contact" ? "#1976d2" : "#e0e0e0",
            color: tab === "contact" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Contact
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Change Section:</h3>
        <button
          onClick={() => handleSectionChange("main")}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            background: section === "main" ? "#388e3c" : "#e0e0e0",
            color: section === "main" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Main
        </button>
        <button
          onClick={() => handleSectionChange("leadership")}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            background: section === "leadership" ? "#388e3c" : "#e0e0e0",
            color: section === "leadership" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Leadership
        </button>
        <button
          onClick={() => handleSectionChange("history")}
          style={{
            padding: "8px 16px",
            background: section === "history" ? "#388e3c" : "#e0e0e0",
            color: section === "history" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          History
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/about")}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Clear All Params
        </button>
      </div>
    </div>
  );
}

export default About;
