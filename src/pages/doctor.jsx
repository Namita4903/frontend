// import React, { useState } from "react";
// import "../index.css";

// import Navbar from '../../src/components/navbar';
// import Footer from '../../src/components/footer';
// const Doctor = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const doctorId = localStorage.getItem('userId'); 
//     const role = localStorage.getItem('userRole'); 
  
//     try {
//       const response = await fetch("http://localhost:5001/api/doctor/request-access", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, doctorId,role }),
//       });
  
//       if (response.ok) {
//         setMessage("Confirmation email sent successfully!");
//         setEmail("");
//       } else {
//         setMessage("Failed to send email. Please try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("Server error. Try again later.");
//     }
//   };
  
//   return (
//     <div>
//       <Navbar/>
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1>Doctor Portal</h1>
//           <p>Send a confirmation email to your patient directly from here.</p>
//         </div>
//       </section>

//       <section className="container" style={{ marginTop: "40px" }}>
//         <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
//           <label className="block text-lg font-medium text-gray-700 mb-2">Patient Email:</label>
//           <input
//             type="email"
//             required
//             placeholder="Enter patient's email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded mb-4"
//           />
//           <button type="submit" className="btn-primary w-full text-center">
//             Send Confirmation
//           </button>
//           {message && <p className="mt-4 text-center text-green-700 font-semibold">{message}</p>}
//         </form>
//       </section>
//      <Footer/>
//     </div>
//   );
// };
// export default Doctor;




import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import { notification, Table, Modal, Button, Input, DatePicker } from "antd";
import moment from "moment";

import Navbar from '../../src/components/navbar';
import Footer from '../../src/components/footer';

const Doctor = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "David Johnson", email: "david@example.com" },
  ];

  const handleAddReport = () => {
    setIsModalVisible(true);
  };

  const handleViewReport = (userId) => {
    console.log("View Report for:", userId);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const doctorId = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');

    try {
      const response = await fetch("http://localhost:5001/api/doctor/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, doctorId, role }),
      });

      if (response.ok) {
        setMessage("Confirmation email sent successfully!");
        setEmail("");
      } else {
        setMessage("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Try again later.");
    }
  };

  // -------------- Report Modal Logic Starts Here -------------- //
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    uploadedBy: "",
    media: null,
  });
  const [loading, setLoading] = useState(false);
  const [api] = notification.useNotification();
  const [reports, setReports] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await toBase64(file);
    const fullBase64 = `data:${file.type};base64,${base64.split(",")[1]}`;
    setFormData((prev) => ({ ...prev, media: fullBase64 }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prev) => ({ ...prev, date: dateString }));
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        uploadedBy: formData.uploadedBy,
        image: formData.media,
      };

      const response = await axios.post("http://localhost:5001/api/auth/report", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        api.success({ message: "Success", description: response.data.message });
        setFormData({ title: "", description: "", date: "", uploadedBy: "", media: null });
        fetchReports();
        setIsModalVisible(false);
      } else {
        api.error({ message: "Failed", description: response.data.message });
      }
    } catch (err) {
      console.error(err);
      api.error({ message: "Error", description: "An error occurred while submitting the report." });
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/auth/getReportByDoctor/${userId}`);
      setReports(res.data.reports || []);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);
  // -------------- Report Modal Logic Ends Here -------------- //

  return (
    <div>
      <Navbar />
      <section className="hero-section">
        <div className="hero-content">
          <h1>Doctor Portal</h1>
          <p>Send a confirmation email to your patient directly from here.</p>
        </div>
      </section>

      {/* Dashboard Table */}
      <section className="container my-10 px-4">
        <h2 className="text-2xl font-bold mb-4">Patient List</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border shadow-md rounded-xl">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 border">Patient Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    <button
                      onClick={() => handleAddReport(user.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Add Report
                    </button>
                    <button
                      onClick={() => handleViewReport(user.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Email Confirmation Form */}
      <section className="container my-10 px-4">
        <form
          onSubmit={handleSubmitEmail}
          className="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto"
        >
          <label className="block text-lg font-medium text-gray-700 mb-2">
            <h1 className="text-lg font-bold underline text-black">
              Send a confirmation email to your patient
            </h1>
            <br />
            Patient Email:
          </label>
          <input
            type="email"
            required
            placeholder="Enter patient's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <button type="submit" className="btn-primary w-full text-center">
            Send Confirmation
          </button>
          {message && (
            <p className="mt-4 text-center text-green-700 font-semibold">{message}</p>
          )}
        </form>
      </section>

      {/* Modal for Report Upload */}
      <Modal
        title="Upload Medical Report (PDF)"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        <form onSubmit={handleSubmitReport} style={{ marginBottom: "2rem" }}>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Report Title"
            required
            style={{ marginBottom: "1rem" }}
          />
          <Input.TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            rows={4}
            style={{ marginBottom: "1rem" }}
          />
          <DatePicker
            onChange={handleDateChange}
            style={{ marginBottom: "1rem", width: "100%" }}
            placeholder="Select Date"
          />
          <Input
            type="text"
            name="uploadedBy"
            value={userEmail}
            disabled
            onChange={handleChange}
            placeholder="Uploaded By (email)"
            required
            style={{ marginBottom: "1rem" }}
          />
          <Input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            required
            style={{ marginBottom: "1rem" }}
          />
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? "Uploading..." : "Submit Report"}
          </Button>
        </form>
      </Modal>

      <Footer />
    </div>
  );
};

export default Doctor;
