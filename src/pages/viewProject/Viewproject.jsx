import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { dummyProjectList } from "../../dummyprojectlist";
import { viewProject, viewTask } from "../../actions/projectlistAction";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
function Viewproject() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const projectView = useSelector((state) => state.projectView);
  const { loading, error, project } = projectView;
  const { data } = project;

  useEffect(() => {
    dispatch(viewProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, projectId]);

  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          {/* main code  */}
          <div className="font-bold text-2xl ml-10 mt-6">Project View</div>
          <div className="m-10 flex gap-4  flex-col   rounded-lg border border-dashed border-gray-900/25 p-6">
            <div className="flex  justify-end">
              <Link
                type="submit"
                to={`/viewproject/${projectId}/c`}
                className=" flex rounded-md w-1/8 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="w-5" />
                Add Task
              </Link>
            </div>
            <div className="   sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project name :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.projectName}
              </div>
            </div>

            <div className=" sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project Id :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data._id}
              </div>
            </div>

            <div className=" sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Client Name :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.clientName}
              </div>
            </div>

            <div className=" sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Client Email :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.clientEmail}
              </div>
            </div>

            <div className=" sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Company Name:
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.companyName}
              </div>
            </div>

            {/* 3 cards */}
            <h1 className="text-lg"> Task List:</h1>
            <div className="flex  flex-wrap ">
              {data &&
                data.task.map((taskId) => (
                  <div class=" flex m-5 space-x-1   shadow-2xloverflow-hidden">
                    <div class="px-4 py-4 bg-white  rounded">
                      <p class="text-lg mb-4 text-center text-gray-800">
                        Task Name
                      </p>
                      <div className="flex  gap-3">
                        <Link
                          to={`/viewproject/${projectId}/viewtask/${taskId}`}
                          class="  cursor-pointer text-center w-6/12 flex  justify-center m-auto p-[7px] pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 font-semibold leading-5 text-white hover:bg-indigo-500"
                        >
                          <EyeIcon className="w-5 mx-2" />
                        </Link>
                        <Link
                          to="#"
                          class=" flex cursor-pointer text-center w-6/12   justify-center m-auto p-[7px] pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 font-semibold leading-5 text-white hover:bg-indigo-500"
                        >
                          <TrashIcon className="w-5 mx-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="   sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project Assigned Date :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {/* {project.createdAt.split("T")[0]} */}
              </div>
            </div>

            <div className="   sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project Submission Date :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.submissionDate}
              </div>
            </div>

            <div className="   sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project Assigned To :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {/* {data && data.clientName} */}
              </div>
            </div>
            <div className="   sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project Type :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.projectPriority}
              </div>
            </div>

            <div className="   sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-md font-medium leading-6 text-gray-900">
                Project Status :
              </div>
              <ProgressBar completed={60} />
            </div>
            {/* buttons  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewproject;
