import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { dummyProjectList } from "../../../dummyprojectlist";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function ClientProjectView() {
  const data = {
    labels: ["High", "modurate", "low", "Urgent"],
    datasets: [
      {
        data: [12, 19, 3, 5],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#2ECC71",
          "#9B59B6",
          "#FFA500",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#2ECC71",
          "#9B59B6",
          "#FFA500",
        ],
      },
    ],
  };

  const [showOptions, setShowOptions] = useState(false);

  const handleButtonClick = () => {
    setShowOptions(true);
  };

  const handleOptionSelect = (option) => {
    // Do something with the selected option
    console.log("Selected option:", option);
    setShowOptions(false); // Hide the options after selection (you can change this behavior as needed)
  };
  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="font-bold text-2xl ml-10 mt-6">Projects Name</div>
          <div className="m-10 flex items-center justify-around flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
            <div>
              <Pie width={300} height={200} data={data} />
              <span>Vernablity Status</span>
            </div>
            <div>
              <button
                onClick={handleButtonClick}
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Generate Report
              </button>
              {showOptions && (
                <div className="w-64 mt-5">
                  <label
                    htmlFor="dropdown"
                    className="block font-medium text-gray-700"
                  >
                    Select an option:
                  </label>
                  <select
                    id="dropdown"
                    name="dropdown"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="webapp">Web App</option>
                    <option value="mobile">Mobile</option>
                    <option value="option3">API</option>
                    <option value="option3">Network</option>
                    <option value="option3">GRC</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProjectView;
