import { useOutletContext } from "react-router-dom";

function DashboardStats() {
  const context = useOutletContext();

  return (
    <div>
      <h3>Dashboard Stats</h3>
      <p>This nested route receives context from parent Dashboard component</p>

      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          background: "#e1f5fe",
          borderRadius: "4px",
        }}
      >
        <h4>Context from Parent:</h4>
        <p>
          <strong>User:</strong> {context.user}
        </p>
        <p>
          <strong>Permissions:</strong> {context.permissions.join(", ")}
        </p>
        <p>
          <strong>Theme:</strong> {context.theme}
        </p>
      </div>

      <div style={{ marginTop: "15px" }}>
        <h4>Mock Statistics:</h4>
        <ul>
          <li>Total Users: 1,234</li>
          <li>Active Sessions: 567</li>
          <li>Revenue: $12,345</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardStats;
