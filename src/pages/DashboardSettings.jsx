import { useOutletContext } from "react-router-dom";

function DashboardSettings() {
  const context = useOutletContext();

  return (
    <div>
      <h3>Dashboard Settings</h3>
      <p>Another nested route using the same outlet context</p>

      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          background: "#fff9c4",
          borderRadius: "4px",
        }}
      >
        <h4>Current User Settings:</h4>
        <p>
          <strong>Logged in as:</strong> {context.user}
        </p>
        <p>
          <strong>Your permissions:</strong> {context.permissions.join(", ")}
        </p>
        <p>
          <strong>Theme preference:</strong> {context.theme}
        </p>
      </div>

      <div style={{ marginTop: "15px" }}>
        <h4>Settings Options:</h4>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <input type="checkbox" defaultChecked /> Email notifications
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <input type="checkbox" /> SMS alerts
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <input type="checkbox" defaultChecked /> Dark mode
        </label>
      </div>
    </div>
  );
}

export default DashboardSettings;
