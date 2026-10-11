import { useState } from "react";
import { Link } from "react-router-dom";

function Outpass() {
  const [outpass, setOutpass] = useState({
    date: "",
    leavingTime: "",
    returnTime: "",
    destination: "",
    reason: "",
    emergencyContact: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setOutpass({
      ...outpass,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (outpass.returnTime <= outpass.leavingTime) {
      alert("Return time must be later than leaving time.");
      return;
    }

    setSubmitted(true);

    setOutpass({
      date: "",
      leavingTime: "",
      returnTime: "",
      destination: "",
      reason: "",
      emergencyContact: "",
    });
  };

  return (
    <div className="outpass-page">

      <header className="outpass-header">
        <div>
          <h1>🚪 Outpass</h1>
          <p>Request permission to go outside the hostel</p>
        </div>

        <Link to="/dashboard" className="back-btn">
          ← Dashboard
        </Link>
      </header>

      <main className="outpass-content">

        <div className="outpass-card">

          <h2>Apply for Outpass</h2>

          <p className="outpass-subtitle">
            Fill in the details before leaving the hostel.
          </p>

          <form
            className="outpass-form"
            onSubmit={handleSubmit}
          >

            <div className="input-group">
              <label>Outpass Date</label>

              <input
                type="date"
                name="date"
                value={outpass.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="time-grid">

              <div className="input-group">
                <label>Leaving Time</label>

                <input
                  type="time"
                  name="leavingTime"
                  value={outpass.leavingTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Expected Return Time</label>

                <input
                  type="time"
                  name="returnTime"
                  value={outpass.returnTime}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="input-group">
              <label>Destination</label>

              <input
                type="text"
                name="destination"
                value={outpass.destination}
                onChange={handleChange}
                placeholder="Example: City Market"
                required
              />
            </div>

            <div className="input-group">
              <label>Reason</label>

              <textarea
                name="reason"
                value={outpass.reason}
                onChange={handleChange}
                placeholder="Enter reason for going outside..."
                rows="4"
                required
              ></textarea>
            </div>

            <div className="input-group">
              <label>Emergency Contact</label>

              <input
                type="tel"
                name="emergencyContact"
                value={outpass.emergencyContact}
                onChange={handleChange}
                placeholder="Enter emergency contact number"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Submit Outpass Request
            </button>

          </form>

          {submitted && (
            <div className="success-message">
              ✅ Outpass request submitted successfully!
              <br />
              Status: <strong>Pending</strong>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}

export default Outpass;