import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((response) => response.json())
      .then((data) => {
        setBackendMessage(data.message);
      })
      .catch((error) => {
        console.error("Backend connection failed:", error);
        setBackendMessage("Backend connection failed");
      });
  }, []);

  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1>Hostel One</h1>
          <p>Student Dashboard</p>
        </div>

        <div className="student-profile">
          <div className="profile-icon">👤</div>

          <div>
            <strong>Student</strong>
            <small>Student ID: STU001</small>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">

        {/* Welcome Section */}
        <section className="welcome-box">
          <h2>Welcome to Hostel One 👋</h2>

          <p>
            Manage your hostel services from one place.
          </p>

          {/* Backend Connection Status */}
          <p className="backend-status">
            Backend Status:{" "}
            {backendMessage || "Connecting..."}
          </p>
        </section>

        {/* Room Details */}
        <section className="room-card">

          <div>
            <span>Room Number</span>
            <h2>A-204</h2>
          </div>

          <div>
            <span>Bed</span>
            <h2>B-2</h2>
          </div>

          <div>
            <span>Hostel</span>
            <h2>Block A</h2>
          </div>

        </section>

        {/* Feature Cards */}
        <section className="feature-grid">

          {/* Mess Menu */}
          <Link
            to="/mess-menu"
            className="feature-card"
          >
            <div className="feature-icon">🍴</div>

            <h3>Mess Menu</h3>

            <p>
              Check today's meals
            </p>
          </Link>

          {/* Complaint */}
          <Link
            to="/complaint"
            className="feature-card"
          >
            <div className="feature-icon">🛠️</div>

            <h3>Complaint</h3>

            <p>
              Report maintenance issues
            </p>
          </Link>

          {/* Leave Request */}
          <Link
            to="/leave-request"
            className="feature-card"
          >
            <div className="feature-icon">📅</div>

            <h3>Leave Request</h3>

            <p>
              Apply for hostel leave
            </p>
          </Link>

          {/* Outpass */}
          <Link
            to="/outpass"
            className="feature-card"
          >
            <div className="feature-icon">🚪</div>

            <h3>Outpass</h3>

            <p>
              Request permission to go outside
            </p>
          </Link>

          {/* Notices */}
          <Link
            to="/notices"
            className="feature-card"
          >
            <div className="feature-icon">📢</div>

            <h3>Notices</h3>

            <p>
              View hostel notices
            </p>
          </Link>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;