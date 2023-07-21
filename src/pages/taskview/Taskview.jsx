import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";

function Taskview() {
  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          {/* main code  */}
          <div className="font-bold text-2xl ml-10 mt-6">Task Name</div>
          <div className="m-10 flex gap-4  flex-col   rounded-lg border border-dashed border-gray-900/25 p-6">
            hey task
          </div>
        </div>
      </div>
    </div>
  );
}

export default Taskview;
