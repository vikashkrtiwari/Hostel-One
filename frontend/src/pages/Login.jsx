
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Student");

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo login: abhi real authentication nahi hai.
    if (role === "Student") {
      navigate("/dashboard");
    } else {
      navigate("/warden-dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo-section">
          <div className="hostel-icon">🏠</div>

          <h1>
            Hostel <span>One</span>
          </h1>

          <p>Your Hostel, One App.</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Login As</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Student">Student</option>
              <option value="Warden">Warden / Admin</option>
            </select>
          </div>

          <div className="input-group">
            <label>
              {role === "Student"
                ? "Student ID"
                : "Warden Username"}
            </label>

            <input
              type="text"
              placeholder={
                role === "Student"
                  ? "Enter your Student ID"
                  : "Enter your Warden username"
              }
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your Password"
              required
            />
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <button type="button" className="forgot-btn">
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="login-btn">
            Login →
          </button>

          <div className="or-section">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <button type="button" className="google-btn">
            <span>G</span>
            Continue with Google
          </button>

          <p className="contact-text">
            Don't have an account?
            <button type="button">
              Contact your warden
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
