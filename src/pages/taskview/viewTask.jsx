import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { viewTasks } from "../../actions/projectlistAction";
import { useDispatch, useSelector } from "react-redux";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { toast } from "react-hot-toast";
function Viewtask() {
  const { projectId, taskID } = useParams();

  const dispatch = useDispatch();
  const TaskView = useSelector((state) => state.tasksView);
  const { tasks } = TaskView;
  const { data } = tasks;
  //   console.log(data);
  let android = "";
  let ios = "";
  if (data && data.mobileData) {
    const mobileData = data.mobileData;
    android = mobileData.android !== "";
    ios = mobileData.ios !== "";
    //console.log(mobileData);
  }
  

  const handleDownloadClicks = () => {
    // Code to prepare the URL of the Excel file
    const excelFileURL = `/uploads/${
      data[0].networkData && data[0].networkData.networkfileUpload
    }`;

    const link = document.createElement("a");
    link.href = excelFileURL;
    link.target = "_blank"; // Open the link in a new tab
    link.download = "your-excel-file.xlsx"; // The default file name for download

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up the temporary anchor element
    document.body.removeChild(link);
  };
  const handleDownloadClick = () => {
    // Code to prepare the URL of the Excel file
    const excelFileURL = `/uploads/${
      data[0].apiData && data[0].apiData.apifile
    }`;

    const link = document.createElement("a");
    link.href = excelFileURL;
    link.target = "_blank"; // Open the link in a new tab
    link.download = "your-excel-file.xlsx"; // The default file name for download

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up the temporary anchor element
    document.body.removeChild(link);
  };

  useEffect(() => {
    dispatch(viewTasks(taskID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, taskID]);

  //completed Tasks
  const [isCompleted, setIsCompleted] = useState(false);

  const handleButtonClick = async (type) => {
    // Call a function to update the status in the database
    try {
      await updateTaskStatus(taskID, type);
      setIsCompleted(true);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;

  const updateTaskStatus = async (taskID, type) => {
    try {
      const response = await fetch(
        `http://localhost:5000/project/taskcomplete`,
        {
          method: "POST",
          headers: {
            // Authorization: `Bearer ${token}`, // Pass token in the "Authorization" header
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskId: taskID, type }),
        }
      );

      if (response.ok) {
        toast.success("Task completed..");
      }

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  const [webIsCompleted, setWebIsCompleted] = useState(false);
  const [mobileIsCompleted, setMobileIsCompleted] = useState(false);
  const [apiIsCompleted, setApiIsCompleted] = useState(false);
  const [networkIsCompleted, setNetworkIsCompleted] = useState(false);
  const [grcIsCompleted, setGrcIsCompleted] = useState(false);
  const handleWebButtonClick = async () => {
    try {
      await updateTaskStatus(taskID, "web");
      setWebIsCompleted(true);
    } catch (error) {
      console.error("Error updating web task status:", error);
    }
  };

  const handleMobileButtonClick = async () => {
    try {
      await updateTaskStatus(taskID, "mobile");
      setMobileIsCompleted(true);
    } catch (error) {
      console.error("Error updating mobile task status:", error);
    }
  };

  const handleApiButtonClick = async () => {
    try {
      await updateTaskStatus(taskID, "api");
      setApiIsCompleted(true);
    } catch (error) {
      console.error("Error updating API task status:", error);
    }
  };

  const handleNetworkButtonClick = async () => {
    try {
      await updateTaskStatus(taskID, "network");
      setNetworkIsCompleted(true);
    } catch (error) {
      console.error("Error updating network task status:", error);
    }
  };

  const [btn, hidebtn] = useState(false);

  const handleGrcButtonClick = async () => {
    try {
      await updateTaskStatus(taskID, "grc");
      setGrcIsCompleted(true);

      //
    } catch (error) {
      console.error("Error updating GRC task status:", error);
    }
  };

  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          {/* main code  */}
          <div className="font-bold text-2xl ml-10 mt-6">
            {data && data.taskName}
          </div>
          <div className="m-10 flex gap-4  flex-col   rounded-lg border border-dashed border-gray-900/25 p-6">
            {/* 3 cards */}
            <div>
              <div className=" flex flex-row overflow-hidden flex-wrap ">
                {data && data.webData && data.webData.webotherRemarks ? (
                  <div className="block w-[300px] rounded-lg  bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className=" flex  justify-between">
                      <h1>For web</h1>
                      <p>
                        {data.webData.isCompleted === false && (
                          <button
                            type="button"
                            className="inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto"
                          >
                            ongoing
                          </button>
                        )}

                        {data.webData.isCompleted === true && (
                          <button
                            type="button"
                            className="inline-block rounded-full bg-success px-2 text-xs uppercase leading-normal text-white cursor-auto"
                          >
                            completed
                          </button>
                        )}
                      </p>
                    </div>
                    {data.webData.webtargetUrls &&
                      data.webData.webtargetUrls.map((url) => (
                        <div className="mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <div className="text-md font-medium leading-6 text-gray-900">
                            {url.lable}:
                          </div>
                          <div
                            key={url._id}
                            className=" flex  mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                          >
                            <a
                              href={url.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <PaperClipIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                            </a>
                          </div>
                        </div>
                      ))}

                    <div className=" mt-4 flex flex-col">
                      <div className="text-md font-medium leading-6 text-gray-900">
                        Remarks :
                      </div>
                      <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {data.webData && data.webData.webotherRemarks}
                      </div>
                    </div>

                    <div className=" mt-2 flex justify-between gap-x-6">
                      {!data.webData.isCompleted && (
                        <button
                          onClick={handleWebButtonClick}
                          className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                          disabled={isCompleted}
                        >
                          {webIsCompleted ? "Completed" : "Mark as Completed"}
                        </button>
                      )}
                      <Link
                        type="submit"
                        to={`/viewproject/${projectId}/viewtask/${taskID}/detailedtask/web`}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ) : null}

                {data &&
                data.mobileData &&
                data.mobileData.mobileotherRemarks ? (
                  <div className="block w-[300px]   rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className=" flex  justify-between">
                      <h1>For Mobile</h1>
                      <p>
                        {data.mobileData.isCompleted === false && (
                          <button
                            type="button"
                            className="inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto"
                          >
                            ongoing
                          </button>
                        )}

                        {data.mobileData.isCompleted === true && (
                          <button
                            type="button"
                            className="inline-block rounded-full bg-success px-2 text-xs uppercase leading-normal text-white cursor-auto"
                          >
                            completed
                          </button>
                        )}
                      </p>
                    </div>
                    {android && (
                      <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div className="text-md font-medium leading-6 text-gray-900">
                          Android
                        </div>
                        <div className="mt-1  flex text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <a href={data.mobileData && data.mobileData.android}>
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </div>
                    )}
                    {ios && (
                      <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div className="text-md font-medium leading-6 text-gray-900">
                          IOS
                        </div>
                        <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <a href={data.mobileData && data.mobileData.ios}>
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </div>
                    )}

                    <div className=" mt-4 flex flex-col">
                      <div className="text-md font-medium leading-6 text-gray-900">
                        Remarks :
                      </div>
                      <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {data.mobileData && data.mobileData.mobileotherRemarks}
                      </div>
                    </div>

                    <div className=" mt-2 flex  justify-between gap-x-6">
                      {!data.mobileData.isCompleted && (
                        <button
                          onClick={handleMobileButtonClick}
                          className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                          disabled={mobileIsCompleted}
                        >
                          {mobileIsCompleted
                            ? "Completed"
                            : "Mark as Completed"}
                        </button>
                      )}
                      <Link
                        type="submit"
                        to={`/viewproject/${projectId}/viewtask/${taskID}/detailedtask/mobile`}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ) : null}
                {data && data.apiData && data.apiData.apiotherRemarks ? (
                  <div className="block w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className=" flex  justify-between">
                      <h1>For API</h1>
                      <p>
                        {data.apiData.isCompleted === false && (
                          <button
                            type="button"
                            className="inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto"
                          >
                            ongoing
                          </button>
                        )}

                        {data.apiData.isCompleted === true && (
                          <button
                            type="button"
                            className="inline-block rounded-full bg-success px-2 text-xs uppercase leading-normal text-white cursor-auto"
                          >
                            completed
                          </button>
                        )}
                      </p>
                    </div>
                    <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <span className=" flex font-medium text-indigo-600 hover:text-indigo-500">
                        <a
                          href={`http://localhost:5000/files/${data.apiData.apifile}`}
                          download
                          className="flex font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          FILE
                        </a>
                      </span>
                    </div>

                    <div className=" mt-4 flex flex-col">
                      <div className="text-md font-medium leading-6 text-gray-900">
                        Remarks :
                      </div>
                      <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {data.apiData && data.apiData.apiotherRemarks}
                      </div>
                    </div>

                    <div className=" mt-2 flex  justify-between gap-x-6">
                      {!data.apiData.isCompleted && (
                        <button
                          onClick={handleApiButtonClick}
                          className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                          disabled={apiIsCompleted}
                        >
                          {apiIsCompleted ? "Completed" : "Mark as Completed"}
                        </button>
                      )}
                      <Link
                        type="submit"
                        to={`/viewproject/${projectId}/viewtask/${taskID}/detailedtask/api`}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ) : null}
                {data &&
                data.networkData &&
                data.networkData.networkotherRemarks ? (
                  <div className="block w-[300px]  rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className=" flex  justify-between">
                      <h1>For Network</h1>
                      <p>
                        {data.networkData.isCompleted === false && (
                          <button
                            type="button"
                            className="inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto"
                          >
                            ongoing
                          </button>
                        )}

                        {data.networkData.isCompleted === true && (
                          <button
                            type="button"
                            className="inline-block rounded-full bg-success px-2 text-xs uppercase leading-normal text-white cursor-auto"
                          >
                            completed
                          </button>
                        )}
                      </p>
                    </div>
                    <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <span className=" flex font-medium text-indigo-600 hover:text-indigo-500">
                        <a
                          href={`http://localhost:5000/files/${data.networkData.networkfileUpload}`}
                          download
                          className="flex font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          FILE
                        </a>
                      </span>
                    </div>

                    <div className=" mt-4 flex flex-col">
                      <div className="text-md font-medium leading-6 text-gray-900">
                        Remarks :
                      </div>
                      <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {data.networkData &&
                          data.networkData.networkotherRemarks}
                      </div>
                    </div>

                    <div className=" mt-2 flex  justify-between gap-x-6">
                      {!data.networkData.isCompleted && (
                        <button
                          onClick={handleNetworkButtonClick}
                          className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                          disabled={networkIsCompleted}
                        >
                          {networkIsCompleted
                            ? "Completed"
                            : "Mark as Completed"}
                        </button>
                      )}
                      <Link
                        type="submit"
                        to={`/viewproject/${projectId}/viewtask/${taskID}/detailedtask/network`}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ) : null}
                {data && data.grcData && data.grcData.grcotherRemarks ? (
                  <div className="block w-[300px]   rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className=" flex  justify-between">
                      <h1>For GRC</h1>
                      <p>
                        {data.grcData.isCompleted === false && (
                          <button
                            type="button"
                            className="inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto"
                          >
                            ongoing
                          </button>
                        )}

                        {data.grcData.isCompleted === true && (
                          <button
                            type="button"
                            className="inline-block rounded-full bg-success px-2 text-xs uppercase leading-normal text-white cursor-auto"
                          >
                            completed
                          </button>
                        )}
                      </p>
                    </div>

                    <div className=" mt-4 flex flex-col">
                      <div className="text-md font-medium leading-6 text-gray-900">
                        Remarks :
                      </div>
                      <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {data.grcData && data.grcData.grcotherRemarks}
                      </div>
                    </div>

                    <div className=" mt-2 flex justify-between gap-x-6">
                      {!data.grcData.isCompleted && (
                        <button
                          onClick={handleGrcButtonClick}
                          className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                          disabled={grcIsCompleted}
                        >
                          {grcIsCompleted ? "completed" : "Mark as Completed"}
                        </button>
                      )}
                      <Link
                        type="submit"
                        to={`/viewproject/${projectId}/viewtask/${taskID}/detailedtask/grc`}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewtask;
