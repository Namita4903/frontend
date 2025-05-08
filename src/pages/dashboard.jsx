import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from '../../src/components/navbar';
import Footer from '../../src/components/footer';

import "../dashboard.css";
import Profile from "../assets/images/profile.png";

const Dashboard = () => {
  const [enter, setEnter] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const enterValue = localStorage.getItem("Username");
    setEnter(enterValue);
  }, []);

  // Dummy cart item for subscription checkout
  const cart = [
    {
      id: "premium-plan",
      name: "Premium Subscription",
      price: 5,
      quantity: 1,
    }
  ];

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/auth/getPaymentStatus", {
        cartItems: cart,
      });
  
      const clientSecret = response.data.clientSecret;
  
      if (clientSecret) {
        localStorage.setItem("clientSecret", clientSecret);  // or pass via state
        navigate("/payment");
      } else {
        console.error("No client secret received");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };
  

  const handleMedicalRecordsClick = () => {
    navigate("/report");
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <aside className="sidebar">
          <h2>User Dashboard</h2>
          <ul>
            {/* Add navigation links here if needed */}
          </ul>

          <div className="subscription-box">
            <h2>Subscription Plans</h2>
            <div className="subscription-plan">
              <h3>Basic</h3>
              <p>Free | Limited Access</p>
              <button>Select</button>
            </div>
            <div className="subscription-plan">
              <h3>Premium</h3>
              <p>$5/month | Advanced Features</p>
              <button onClick={handleCheckout}>Select</button>
            </div>
          </div>
        </aside>

        <main className="dashboard-content">
          <div className="welcome-section">
            <img src={Profile} alt="User Icon" className="user-icon" />
            <h1>Welcome, {enter}!</h1>
          </div>
          <p>
            Track your medical history, appointments, and prescriptions with ease.
          </p>

          <div className="dashboard-cards">
            <div className="card" onClick={handleMedicalRecordsClick} style={{ cursor: "pointer" }}>
              <h3>📂 Medical Records</h3>
              <p>View and manage all your medical documents.</p>
            </div>
            <div className="card">
              <h3>🩺 Doctors</h3>
              <p>Find and connect with healthcare professionals.</p>
            </div>
            <div className="card">
              <h3>📅 Appointments</h3>
              <p>Check your upcoming doctor visits.</p>
            </div>
            <div className="card">
              <h3>💊 Prescriptions</h3>
              <p>View and track your prescribed medicines.</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
