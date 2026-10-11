import { useState } from "react";
import { Link } from "react-router-dom";

function LeaveRequest() {
  const [leave, setLeave] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setLeave({
      ...leave,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check that To Date is not before From Date
    if (leave.toDate < leave.fromDate) {
      alert("To Date cannot be before From Date.");
      return;
    }

    setSubmitted(true);

    setLeave({
      type: "",
      fromDate: "",
      toDate: "",
      reason: "",
    });
  };

  return (
    <div className="leave-page">

      <header className="leave-header">
        <div>
          <h1>📅 Leave Request</h1>
          <p>Apply for hostel leave</p>
        </div>

        <Link to="/dashboard" className="back-btn">
          ← Dashboard
        </Link>
      </header>

      <main className="leave-content">

        <div className="leave-card">

          <h2>Apply for Leave</h2>

          <p className="leave-subtitle">
            Fill in the details for your leave request.
          </p>

          <form
            className="leave-form"
            onSubmit={handleSubmit}
          >

            <div className="input-group">
              <label>Leave Type</label>

              <select
                name="type"
                value={leave.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Home Visit">Home Visit</option>
                <option value="Medical">Medical</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="date-grid">

              <div className="input-group">
                <label>From Date</label>

                <input
                  type="date"
                  name="fromDate"
                  value={leave.fromDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>To Date</label>

                <input
                  type="date"
                  name="toDate"
                  value={leave.toDate}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="input-group">
              <label>Reason</label>

              <textarea
                name="reason"
                value={leave.reason}
                onChange={handleChange}
                placeholder="Enter reason for leave..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="login-btn">
              Submit Leave Request
            </button>

          </form>

          {submitted && (
            <div className="success-message">
              ✅ Leave request submitted successfully!
              <br />
              Status: <strong>Pending</strong>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}

export default LeaveRequest;