import { useParams, useNavigate } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Mock user data
  const users = {
    123: { name: "John Doe", email: "john@example.com", role: "Developer" },
    456: { name: "Jane Smith", email: "jane@example.com", role: "Designer" },
    789: { name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
  };

  const user = users[userId];

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Profile</h1>
      <p>
        Demonstrating <code>useParams</code> hook
      </p>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#e3f2fd",
          borderRadius: "5px",
        }}
      >
        <h3>URL Parameter:</h3>
        <p>
          <strong>User ID from URL:</strong> {userId}
        </p>
      </div>

      {user ? (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f5f5f5",
            borderRadius: "5px",
          }}
        >
          <h3>User Details:</h3>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      ) : (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#ffebee",
            borderRadius: "5px",
          }}
        >
          <p>User not found!</p>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Try Other Users:</h3>
        <button
          onClick={() => navigate("/user/123")}
          style={{ marginRight: "10px", padding: "8px 16px" }}
        >
          User 123
        </button>
        <button
          onClick={() => navigate("/user/456")}
          style={{ marginRight: "10px", padding: "8px 16px" }}
        >
          User 456
        </button>
        <button
          onClick={() => navigate("/user/789")}
          style={{ padding: "8px 16px" }}
        >
          User 789
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
