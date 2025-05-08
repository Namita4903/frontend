import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const donutData = {
    labels: ['Doctors', 'Patients'],
    datasets: [{
      data: [200, 1300],
      backgroundColor: ['#3b82f6', '#facc15'],
    }]
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Registrations',
        backgroundColor: '#34d399',
        data: [200, 350, 280, 400, 500]
      },
      {
        label: 'Appointments',
        backgroundColor: '#60a5fa',
        data: [150, 300, 260, 370, 420]
      }
    ]
  };

  const users = [
    { name: 'Amit Sharma', email: 'amit@example.com', role: 'Doctor', joined: '2025-04-10' },
    { name: 'Neha Verma', email: 'neha@example.com', role: 'Patient', joined: '2025-04-11' },
    { name: 'Raj Patel', email: 'raj@example.com', role: 'Patient', joined: '2025-04-12' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-5 space-y-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <a href="#">Dashboard</a>
          <a href="#">Users</a>
          <a href="#">Doctors</a>
          <a href="#">Appointments</a>
          <a href="#">Reports</a>
          <a href="#">Settings</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <div className="bg-white p-4 shadow flex justify-between items-center">
          <h1 className="text-xl font-semibold">Medical History Dashboard</h1>
          <div className="flex items-center gap-2">
            <span>Admin</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="p-6 overflow-y-auto space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Total Users', value: '1500', color: 'blue' },
              { title: 'Total Doctors', value: '200', color: 'green' },
              { title: 'Total Patients', value: '1300', color: 'yellow' },
              { title: 'Appointments Booked', value: '820', color: 'purple' },
              { title: 'Reports Uploaded', value: '460', color: 'red' },
              { title: 'Active Consultations', value: '40', color: 'indigo' },
            ].map((card, index) => (
              <div key={index} className="bg-white p-4 rounded shadow text-center">
                <h4 className="text-gray-600">{card.title}</h4>
                <p className={`text-${card.color}-600 text-2xl font-bold`}>{card.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="mb-4 font-semibold">User Distribution</h3>
              <Doughnut data={donutData} />
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="mb-4 font-semibold">Monthly Activity</h3>
              <Bar data={barData} />
            </div>
          </div>

          {/* Recent Users Table */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="mb-4 font-semibold">Recent Users</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">Name</th>
                  <th className="border-b p-2">Email</th>
                  <th className="border-b p-2">Role</th>
                  <th className="border-b p-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i}>
                    <td className="border-b p-2">{u.name}</td>
                    <td className="border-b p-2">{u.email}</td>
                    <td className="border-b p-2">{u.role}</td>
                    <td className="border-b p-2">{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
