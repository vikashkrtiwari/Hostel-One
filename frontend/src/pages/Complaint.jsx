
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Complaint() {
  const [complaint, setComplaint] = useState({
    category: "",
    subject: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const API_URL = "http://localhost:5000/api/complaints";

  // Load saved complaints from the backend
  const fetchComplaints = async () => {
    try {
      setLoadError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error("Could not load complaints.");
      }

      setComplaints(data.complaints || []);
    } catch (error) {
      console.error("Fetch complaints error:", error);
      setLoadError(
        "Could not load complaints. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load complaints when the page opens
  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: "STU001",
          title: complaint.subject,
          description: `Category: ${complaint.category}\n${complaint.description}`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Complaint submission failed.");
        return;
      }

      setSubmitted(true);

      setComplaint({
        category: "",
        subject: "",
        description: "",
      });

      // Refresh the list after successful submission
      await fetchComplaints();
    } catch (error) {
      console.error("Complaint error:", error);
      alert(
        "Backend connection failed. Check that the backend is running."
      );
    }
  };

  return (
    <div className="complaint-page">
      <header className="complaint-header">
        <div>
          <h1>🛠️ Complaint</h1>
          <p>Report hostel maintenance issues</p>
        </div>

        <Link to="/dashboard" className="back-btn">
          ← Dashboard
        </Link>
      </header>

      <main className="complaint-content">
        <div className="complaint-card">
          <h2>Submit a Complaint</h2>
          <p>Tell us what problem you are facing.</p>

          <form onSubmit={handleSubmit} className="complaint-form">
            <div className="input-group">
              <label>Complaint Category</label>

              <select
                name="category"
                value={complaint.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Room">Room</option>
                <option value="Furniture">Furniture</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Subject</label>

              <input
                type="text"
                name="subject"
                value={complaint.subject}
                onChange={handleChange}
                placeholder="Example: Fan is not working"
                required
              />
            </div>

            <div className="input-group">
              <label>Description</label>

              <textarea
                name="description"
                value={complaint.description}
                onChange={handleChange}
                placeholder="Describe your problem..."
                rows="5"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Submit Complaint
            </button>
          </form>

          {submitted && (
            <div className="success-message">
              ✅ Complaint submitted successfully!
              <br />
              Status: <strong>Pending</strong>
            </div>
          )}
        </div>

        {/* Saved complaints */}
        <section className="complaint-card complaints-list">
          <h2>My Complaints</h2>
          <p>View the complaints submitted by you.</p>

          {loading && <p>Loading complaints...</p>}

          {!loading && loadError && (
            <div>
              <p>{loadError}</p>
              <button type="button" onClick={() => {
                setLoading(true);
                fetchComplaints();
              }}>
                Try Again
              </button>
            </div>
          )}

          {!loading && !loadError && complaints.length === 0 && (
            <p>No complaints found. Submit your first complaint above.</p>
          )}

          {!loading && !loadError && complaints.map((item) => {
            const description = item.description || "";
            const categoryMatch = description.match(
              /^Category:\s*([^\n]+)\n?/
            );

            const category = categoryMatch
              ? categoryMatch[1]
              : "Not specified";

            const cleanDescription = categoryMatch
              ? description.replace(/^Category:\s*[^\n]+\n?/, "")
              : description;

            return (
              <article
                className="complaint-item"
                key={item._id}
              >
                <h3>{item.title}</h3>

                <p>
                  <strong>Category:</strong> {category}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {cleanDescription || "No description provided."}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="complaint-status">
                    {item.status || "Pending"}
                  </span>
                </p>

                <small>
                  Submitted:{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "Date unavailable"}
                </small>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default Complaint;
