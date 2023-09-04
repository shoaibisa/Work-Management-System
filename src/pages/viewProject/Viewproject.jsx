import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { dummyProjectList } from "../../dummyprojectlist";
import { viewProject } from "../../actions/projectlistAction";
import { viewTasks } from "../../actions/projectlistAction";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { toast } from "react-hot-toast";

function Viewproject() {
  const { projectId } = useParams();
  
  const dispatch = useDispatch();
  const projectView = useSelector((state) => state.projectView);
  const { loading, error, project } = projectView;
  const { data } = project;

  const TaskView = useSelector((state) => state.tasksView);
  const { tasks } = TaskView;
  useEffect(() => {
    dispatch(viewProject(projectId));
  }, [dispatch, projectId]);

  const [taskDetails, setTaskDetails] = useState([]);
  useEffect(() => {
    if (data && data.task) {
      data.task.forEach((taskId) => {
        if (!taskDetails[taskId]) {
          fetchTaskDetails(taskId);
        }
      });
    }
  }, [data, taskDetails]);

  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;

  const fetchTaskDetails = async (taskId) => {
    try {
      const response = await fetch("http://localhost:5000/project/getTask", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }),
      });

      const taskData = await response.json();
      setTaskDetails((prevTaskDetails) => ({
        ...prevTaskDetails,
        [taskId]: taskData,
      }));
      return taskData;
    } catch (error) {
      console.error("Error fetching task:", error);
      return null;
    }
  };

  const totalTasks = data?.task.length || 0;
  const completedTasks = data?.task.reduce((count, taskId) => {
    const taskData = taskDetails[taskId];
    if (taskData) {
      const selectedOptions = taskData.data.selectedOptions;
      const isAllCompleted = selectedOptions.every((option) => {
        // The same completion logic you have used before
        if (option === "web") {
          return taskData.data.webData.isCompleted;
        } else if (option === "network") {
          return taskData.data.networkData.isCompleted;
        } else if (option === "api") {
          return taskData.data.apiData.isCompleted;
        } else if (option === "mobile") {
          return taskData.data.mobileData.isCompleted;
        } else if (option === "grc") {
          return taskData.data.grcData.isCompleted;
        }
        return false;
      });
      if (isAllCompleted) {
        updateStatusInDatabase(true, taskId);
      } else {
        updateStatusInDatabase(false, taskId);
      }
      if (isAllCompleted) {
        return count + 1;
      }
    }

    return count;
  }, 0);

  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks).toFixed(2) * 100 : 0;
  if (completionPercentage === 100) {
    updateProjectStatus(true, projectId);
  } else {
    updateProjectStatus(false, projectId);
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }
  function updateStatusInDatabase(status, taskId) {
    const updateEndpoint = "http://localhost:5000/project/updateTask";
    fetch(updateEndpoint, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: taskId,
        status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Status updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  }

  function updateProjectStatus(status, projectId) {
    const updateEndpoint = "http://localhost:5000/project/projectcomplete";
    fetch(updateEndpoint, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Status updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  }
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
                data.task
                  .slice()
                  .reverse()
                  .map((taskId) => {
                    const taskData = taskDetails[taskId];
                    if (!taskData) {
                      return null;
                    }

                    const taskName = taskData.data.taskName;
                    const createdAt = taskData.data.createdAt;
                    const selectedOptions = taskData.data.selectedOptions;

                    const isAllCompleted = selectedOptions.every((option) => {
                      if (option === "web") {
                        return taskData.data.webData.isCompleted;
                      } else if (option === "network") {
                        return taskData.data.networkData.isCompleted;
                      } else if (option === "api") {
                        return taskData.data.apiData.isCompleted;
                      } else if (option === "mobile") {
                        return (
                          taskData.data.mobileData.isCompleted &&
                          taskData.data.mobileData.isCompleted
                        );
                      } else if (option === "grc") {
                        return taskData.data.grcData.isCompleted;
                      }
                      return false;
                    });

                    const buttonClassName = isAllCompleted
                      ? "inline-block rounded-full bg-success px-2 text-xs uppercase leading-normal text-white cursor-auto"
                      : "inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto";

                    return (
                      <>
                        <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                          <div className="flex my-2 justify-between">
                            <p className="font-semibold pr-4">
                              Task Name: {taskName}
                            </p>
                            <p>
                              <button className={buttonClassName}>
                                <p>
                                  {" "}
                                  {isAllCompleted ? "Completed" : "Ongoing"}
                                </p>
                              </button>
                            </p>
                          </div>
                          <div className="flex my-2">
                            <p className="font-semibold">Task createdAt -</p>
                            <p>{formatDate(createdAt)}</p>
                          </div>

                          <div className="flex">
                            <Link
                              to={`/viewproject/${projectId}/viewtask/${taskId}`}
                              className="cursor-pointer text-center w-6/12 flex justify-center m-auto p-[7px] pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 font-semibold leading-5 text-white hover:bg-indigo-500"
                            >
                              <EyeIcon className="w-5 mx-2" />
                              View
                            </Link>
                          </div>
                        </div>
                      </>
                    );
                  })}
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
              <ProgressBar completed={completionPercentage} />
              {completionPercentage}%
            </div>
            {/* buttons  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewproject;
