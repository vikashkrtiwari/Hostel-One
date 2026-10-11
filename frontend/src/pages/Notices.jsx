
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Notices() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // Notices MongoDB se load honge
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend se notices fetch karna
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/notices"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Failed to load notices");
        }

        setNotices(data.notices);
      } catch (err) {
        console.error("Error fetching notices:", err);
        setError("Unable to load notices. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Search aur category filter
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.message.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      selectedType === "All" ||
      notice.category === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="notices-page">
      <header className="notices-header">
        <div>
          <h1>📢 Notices</h1>
          <p>Latest hostel announcements</p>
        </div>

        <Link to="/dashboard" className="back-btn">
          ← Dashboard
        </Link>
      </header>

      <main className="notices-content">
        <div className="notices-title">
          <h2>Hostel Notices</h2>
          <p>Stay updated with important announcements.</p>
        </div>

        <div className="notice-filters">
          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search notices"
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            aria-label="Filter notices by category"
          >
            <option value="All">All Notices</option>
            <option value="Important">Important</option>
            <option value="General">General</option>
          </select>
        </div>

        <div className="notice-list">
          {loading ? (
            <p>Loading notices...</p>
          ) : error ? (
            <p className="no-notices">{error}</p>
          ) : filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <div className="notice-card" key={notice._id}>
                <div className="notice-top">
                  <h3>{notice.title}</h3>

                  <span
                    className={`notice-type ${
                      notice.category === "Important"
                        ? "important"
                        : "general"
                    }`}
                  >
                    {notice.category}
                  </span>
                </div>

                <p className="notice-date">
                  📅{" "}
                  {new Date(notice.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>

                <p className="notice-message">
                  {notice.message}
                </p>
              </div>
            ))
          ) : (
            <p className="no-notices">
              No notices found. Try another search.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Notices;
