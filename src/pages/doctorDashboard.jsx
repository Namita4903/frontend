import React from "react";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "David Johnson", email: "david@example.com" },
];

const DoctorDashboard = () => {
  const handleAddReport = (userId) => {
    console.log("Add Report for user:", userId);
    
  };

  const handleViewReport = (userId) => {
    console.log("View Report for user:", userId);
    
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>
      <table className="w-full table-auto border shadow-lg">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-4 py-2 border">User Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border text-center space-x-2">
                <button
                  onClick={() => handleAddReport(user.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
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
  );
};

export default DoctorDashboard;
