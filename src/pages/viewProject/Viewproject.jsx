import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { dummyProjectList } from "../../dummyprojectlist";

function Viewproject() {
  const { projectId } = useParams();
  console.log(projectId);
  const projectIdNumber = parseInt(projectId);
  const project = dummyProjectList.find(
    (project) => project.id === projectIdNumber
  );
  // console.log(project);

  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          {/* main code  */}
          <div className="font-bold text-2xl ml-10 mt-6">Project View</div>
          <div className="m-10 flex gap-4  flex-col   rounded-lg border border-dashed border-gray-900/25 p-6">
            <div className="   sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project name :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {project.projectName}
              </div>
            </div>

            <div className=" sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project Id :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {project.id}
              </div>
            </div>

            {/* 3 cards */}
            <div className=" flex flex-row ">
              <div>
                <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <h1>For web</h1>
                </div>
                <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <h1>For api</h1>
                </div>
                <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <h1>For mobile</h1>
                </div>
              </div>
            </div>

            <div className="   sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project Assigned Date :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {project.createdAt.split("T")[0]}
              </div>
            </div>

            <div className="   sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project Submission Date :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {project.submissionDate}
              </div>
            </div>

            <div className="   sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project Assigned To :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {project.clientName}
              </div>
            </div>

            <div className="   sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project Status :
              </div>
              <ProgressBar completed={60} />
                
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewproject;
