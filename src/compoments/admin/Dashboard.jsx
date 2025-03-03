import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Dropdown } from "primereact/dropdown";
import {
  FaDollarSign,
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaBox,
} from "react-icons/fa";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState("day");

  const timePeriods = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ];

  // Dynamic stats based on time period
  const statsData = {
    day: {
      revenue: "$5K",
      createdAccounts: "100",
      totalAccounts: "15,000",
      activeAccounts: "12,000",
      blockedAccounts: "500",
      addedProducts: "50",
    },
    week: {
      revenue: "$35K",
      createdAccounts: "700",
      totalAccounts: "15,500",
      activeAccounts: "12,200",
      blockedAccounts: "520",
      addedProducts: "350",
    },
    month: {
      revenue: "$120K",
      createdAccounts: "3,000",
      totalAccounts: "16,000",
      activeAccounts: "12,500",
      blockedAccounts: "550",
      addedProducts: "1,500",
    },
    year: {
      revenue: "$1.5M",
      createdAccounts: "30,000",
      totalAccounts: "45,000",
      activeAccounts: "35,000",
      blockedAccounts: "1,200",
      addedProducts: "20,000",
    },
  };

  const stats = statsData[timePeriod];

  // Dynamic chart data based on time period
  const chartLabels = {
    day: ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM"],
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    month: ["Week 1", "Week 2", "Week 3", "Week 4"],
    year: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  const chartDataPoints = {
    day: [1, 5, 20, 50, 80, 100],
    week: [20, 40, 60, 80, 100, 120, 140],
    month: [200, 400, 600, 800],
    year: [
      5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
      55000, 60000,
    ],
  };

  const chartData = {
    labels: chartLabels[timePeriod],
    datasets: [
      {
        label: "Revenue (in $K)",
        data: chartDataPoints[timePeriod],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        fill: true,
      },
      {
        label: "Active Accounts",
        data: chartDataPoints[timePeriod].map((value) => value * 5),
        borderColor: "green",
        backgroundColor: "#10B981",
      },
    ],
  };

  return (
    <div className="min-h-screen p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-4 flex items-center">
          <i className="pi pi-chart-bar mr-2 text-2xl"></i> Dashboard
        </h1>

        {/* Time Period Dropdown */}
        <div className="flex justify-end mb-6">
          <Dropdown
            value={timePeriod}
            options={timePeriods}
            onChange={(e) => setTimePeriod(e.value)}
            placeholder="Select Time Period"
            className="w-44  bg-white text-gray-800 border-2 border-gray-200"
          />
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              key: "revenue",
              label: "Revenue",
              icon: <FaDollarSign className="text-indigo-600 text-3xl" />,
            },
            {
              key: "createdAccounts",
              label: "New Accounts",
              icon: <FaUsers className="text-green-600 text-3xl" />,
            },
            {
              key: "totalAccounts",
              label: "Total Accounts",
              icon: <FaUsers className="text-blue-600 text-3xl" />,
            },
            {
              key: "activeAccounts",
              label: "Active Accounts",
              icon: <FaUserCheck className="text-teal-600 text-3xl" />,
            },
            {
              key: "blockedAccounts",
              label: "Blocked Accounts",
              icon: <FaUserSlash className="text-red-600 text-3xl" />,
            },
            {
              key: "addedProducts",
              label: "Added Products",
              icon: <FaBox className="text-purple-600 text-3xl" />,
            },
          ].map(({ key, label, icon }) => (
            <div
              key={key}
              className="p-4 rounded-lg flex flex-col items-center justify-center hover:bg-indigo-200 border-2 border-gray-200"
            >
              {icon}
              <h2 className="text-lg font-semibold text-indigo-600 capitalize mt-2">
                {label}
              </h2>
              <p className="text-2xl font-bold text-gray-900">{stats[key]}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className=" p-6  rounded-lg border-2 border-gray-200">
            <h2 className="text-lg font-semibold text-indigo-600 mb-4">
              Revenue & Active Accounts Over Time
            </h2>
            <div className="h-64">
              <Line data={chartData} />
            </div>
          </div>

          <div className="p-6 rounded-lg border-2 border-gray-200">
            <h2 className="text-lg font-semibold text-indigo-600 mb-4">
              Active Accounts Growth
            </h2>
            <div className="h-64">
              <Bar data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;