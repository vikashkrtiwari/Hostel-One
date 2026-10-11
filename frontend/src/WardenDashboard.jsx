
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WardenDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [totalNotices, setTotalNotices] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/notices")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load notices");
        return response.json();
      })
      .then((data) => {
        if (data.success) setTotalNotices(data.notices.length);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/notices",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            message,
            category,
            postedBy: "Warden",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to add notice");
      }

      setTotalNotices((count) => count + 1);
      setFeedback("Notice successfully published!");
      setFeedbackType("success");
      setTitle("");
      setMessage("");
      setCategory("General");
      setShowForm(false);
    } catch (error) {
      setFeedback(error.message || "Backend connection failed.");
      setFeedbackType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="warden-page">
      <header className="warden-navbar">
        <Link to="/dashboard" className="warden-brand">
          <span className="warden-brand-icon">⌂</span>
          <span>
            <strong>Hostel One</strong>
            <small>Your Hostel, One App</small>
          </span>
        </Link>

        <div className="warden-nav-label">
          🛡️ Warden Panel
        </div>
      </header>

      <main className="warden-content">
        <section className="warden-welcome">
          <div className="warden-welcome-text">
            <span className="warden-eyebrow">
              HOSTEL MANAGEMENT
            </span>
            <h1>Warden Dashboard</h1>
            <p>Welcome to your Hostel One Admin Panel.</p>
            <p>
              Manage notices, keep students updated and
              help make hostel life better.
            </p>
          </div>

          <div className="warden-welcome-art" aria-hidden="true">
            🏫
          </div>
        </section>

        <section className="warden-stats">
          <div className="warden-stat-card">
            <span className="warden-stat-icon">📢</span>
            <div>
              <p>Total Notices</p>
              <h2>{totalNotices}</h2>
              <small>Published announcements</small>
            </div>
          </div>

          <div className="warden-stat-card">
            <span className="warden-stat-icon green">📋</span>
            <div>
              <p>Notice Management</p>
              <h2>Active</h2>
              <small>Ready to publish updates</small>
            </div>
          </div>

          <div className="warden-stat-card">
            <span className="warden-stat-icon orange">🏠</span>
            <div>
              <p>Hostel One</p>
              <h2>Admin</h2>
              <small>Warden workspace</small>
            </div>
          </div>
        </section>

        {feedback && (
          <div
            className={`warden-feedback ${feedbackType}`}
            role="status"
          >
            {feedback}
          </div>
        )}

        <section className="warden-main-grid">
          <div className="warden-panel">
            <div className="warden-panel-heading">
              <div>
                <h2>📢 Manage Notices</h2>
                <p>Keep students informed with announcements.</p>
              </div>

              <Link to="/notices" className="warden-outline-btn">
                View All Notices →
              </Link>
            </div>

            <div className="warden-notice-summary">
              <span className="warden-summary-icon">📄</span>
              <div>
                <p>Total Published Notices</p>
                <h3>{totalNotices}</h3>
              </div>
              <span className="warden-live">● Live</span>
            </div>

            <button
              type="button"
              className="warden-primary-btn warden-add-btn"
              onClick={() => {
                setFeedback("");
                setShowForm(!showForm);
              }}
            >
              {showForm ? "✕ Close Form" : "＋ Add New Notice"}
            </button>

            <div className="warden-tips">
              <h3>💡 Quick Tips</h3>
              <ul>
                <li>Keep notice titles short and clear.</li>
                <li>Use Important for urgent announcements.</li>
                <li>Published notices appear on the student page.</li>
              </ul>
            </div>
          </div>

          <div className="warden-panel warden-form-panel">
            <div className="warden-panel-heading">
              <div>
                <h2>✍️ Add New Notice</h2>
                <p>Fill in the details to publish a notice.</p>
              </div>
            </div>

            <form className="warden-form" onSubmit={handleSubmit}>
              <label htmlFor="notice-title">Notice Title *</label>
              <input
                id="notice-title"
                type="text"
                placeholder="Enter notice title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label htmlFor="notice-message">Notice Message *</label>
              <textarea
                id="notice-message"
                placeholder="Write the notice details..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
              />

              <label htmlFor="notice-category">Category *</label>
              <select
                id="notice-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="General">General</option>
                <option value="Important">Important</option>
              </select>

              <button
                type="submit"
                className="warden-primary-btn"
                disabled={loading}
              >
                {loading ? "Publishing..." : "➤ Publish Notice"}
              </button>
            </form>
          </div>
        </section>

        <footer className="warden-footer">
          <span>💙 Hostel One · Safe Stay · Better Tomorrow</span>
          <Link to="/dashboard">Back to Student Dashboard</Link>
        </footer>
      </main>
    </div>
  );
}

export default WardenDashboard;
