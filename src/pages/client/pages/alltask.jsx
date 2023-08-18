import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
//import { project } from "../../../dummyprojectlist";
import { EyeIcon } from "@heroicons/react/20/solid";
import { singleTaskView } from "../../../actions/task";
import { useDispatch, useSelector } from "react-redux";
function ClientTasklist() {
  const dispatch = useDispatch();
  const singleTask = useSelector((state) => state.singleTask);
  const { loading, error, task } = singleTask;
  const { projectId } = useParams();
  const [project, setProject] = useState([]);
  const [managerDetails, setManagerDetails] = useState([]);
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;
  useEffect(() => {
    dispatch(singleTaskView(projectId));
  }, [dispatch]);
  // console.log(task);

  useEffect(() => {
    fetch(`http://localhost:5000/project/getbyid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: projectId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
      });
  }, [projectId]);
  const { data } = project;

  const fetchManagerDetailsById = async (managerID) => {
    const userData = JSON.parse(localStorage.getItem("employeeInfo"));
    const token = userData?.token;
    try {
      const response = await fetch(
        `http://localhost:5000/user/getManagerById`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            id: managerID,
          }),
        }
      );
      const data = await response.json();
      //  console.log(data);
      return data; // Return the fetched project data
    } catch (error) {
      console.error("Error fetching Manager details:", error);
      return null;
    }
  };
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }
  useEffect(() => {
    if (data) {
      const fetchManagerDetails = async () => {
        const details = await fetchManagerDetailsById(data.manager);
        setManagerDetails([details]); // Wrap details in an array since Promise.all is not needed
      };
      fetchManagerDetails();
    }
  }, [data]);
  //console.log(data);
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
              {task.task &&
                task.task.map((taskId) => (
                  <>
                    <div>
                      <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <div className="flex my-2 justify-between">
                          <p className="font-semibold pr-4">
                            {taskId.taskName}
                          </p>
                          <p>
                            {taskId.status === "ongoing" && (
                              <button
                                type="button"
                                className="inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto"
                              >
                                ongoing
                              </button>
                            )}

                            {taskId.status === "completed" && (
                              <button
                                type="button"
                                className="inline-block rounded-full bg-success px-2 text-xs uppercase leading-normal text-white cursor-auto"
                              >
                                completed
                              </button>
                            )}
                          </p>
                        </div>
                        <div className="flex my-2">
                          <p className="font-semibold">Task createdAt -</p>
                          <p>{formatDate(taskId.createdAt)}</p>
                        </div>
                        <div className="flex my-2">
                          <p className="font-semibold">Manager-</p>
                          <p>
                            {managerDetails.length > 0
                              ? managerDetails[0].employee.name
                              : null}
                          </p>
                        </div>
                        <div className="flex">
                          <Link
                            to={`/clientprojectview/${projectId}/${taskId._id}`}
                            class="  cursor-pointer text-center w-6/12 flex  justify-center m-auto p-[7px] pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 font-semibold leading-5 text-white hover:bg-indigo-500"
                          >
                            <EyeIcon className="w-5 mx-2" />
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
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
                Project Manager :
              </div>
              <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {/* {managerDetails && managerDetails.employee.name} */}
                {managerDetails.length > 0
                  ? managerDetails[0].employee.name
                  : null}
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

export default ClientTasklist;
