import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { dummyProjectList } from "../../dummyprojectlist";
import { viewProject, viewTask } from "../../actions/projectlistAction";
import { useDispatch, useSelector } from "react-redux";
import { PaperClipIcon } from "@heroicons/react/20/solid";
function Viewproject() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const projectView = useSelector((state) => state.projectView);
  const { loading, error, project } = projectView;
  const { data } = project;

  const TaskView = useSelector((state) => state.tasksView);
  const { task } = TaskView;
  const { data1 } = task;
  let android = "";
  let ios = "";
  if (Array.isArray(data1) && data1[0].mobileData) {
    const mobileData = data1[0].mobileData;
    android = mobileData.android !== "";
    ios = mobileData.ios !== "";
  }

  const handleDownloadClicks = () => {
    // Code to prepare the URL of the Excel file
    const excelFileURL = `/uploads/${
      data1[0].networkData && data1[0].networkData.networkfileUpload
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
      data1[0].apiData && data1[0].apiData.apifile
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
    dispatch(viewProject(projectId));
    dispatch(viewTask(projectId));
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
            <Link
              type="submit"
              to={`/viewproject/${projectId}/c`}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              add Task
            </Link>
            {/* 3 cards */}
            <div>
              <div className=" flex flex-row overflow-hidden flex-wrap ">
                {Array.isArray(data1) && data1[0].webData ? (
                  <div className="block w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <h1>For web</h1>
                    {data1[0].webData.webtargetUrls &&
                      data1[0].webData.webtargetUrls.map((url) => (
                        <div className="mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <div className="text-md font-medium leading-6 text-gray-900">
                            {url.lable}:
                          </div>
                          <div
                            key={url._id}
                            className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
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
                        {data1[0].webData && data1[0].webData.webotherRemarks}
                      </div>
                    </div>

                    <div className=" mt-2 flex justify-end gap-x-6">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ) : null}

                {Array.isArray(data1) && data1[0].apiData ? (
                  <div className="block w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <h1>For Api</h1>
                    <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <span
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={handleDownloadClick}
                      >
                        {" "}
                        FILE
                      </span>
                    </div>

                    <div className=" mt-4 flex flex-col">
                      <div className="text-md font-medium leading-6 text-gray-900">
                        Remarks :
                      </div>
                      <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {data1[0].apiData && data1[0].apiData.apiotherRemarks}
                      </div>
                    </div>

                    <div className=" mt-2 flex justify-end gap-x-6">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ) : null}
                {Array.isArray(data1) && data1[0].mobileData ? (
                  <div className="block w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <h1>For Mobile</h1>
                    {android && (
                      <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div className="text-md font-medium leading-6 text-gray-900">
                          Android
                        </div>
                        <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <a
                            href={
                              data1[0].mobileData && data1[0].mobileData.android
                            }
                          >
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
                          <a
                            href={
                              data1[0].mobileData && data1[0].mobileData.ios
                            }
                          >
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
                        {data1[0].mobileData &&
                          data1[0].mobileData.mobileotherRemarks}
                      </div>
                    </div>

                    <div className=" mt-2 flex justify-end gap-x-6">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ) : null}
                {Array.isArray(data1) && data1[0].networkData ? (
                  <div className="block w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <h1>For Network</h1>
                    <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <span
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={handleDownloadClicks}
                      >
                        {" "}
                        FILE
                      </span>
                    </div>

                    <div className=" mt-4 flex flex-col">
                      <div className="text-md font-medium leading-6 text-gray-900">
                        Remarks :
                      </div>
                      <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {data1[0].networkData &&
                          data1[0].networkData.networkotherRemarks}
                      </div>
                    </div>

                    <div className=" mt-2 flex justify-end gap-x-6">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ) : null}
                {Array.isArray(data1) && data1[0].grcData ? (
                  <div className="block w-[300px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <h1>For GRC</h1>

                    <div className=" mt-4 flex flex-col">
                      <div className="text-md font-medium leading-6 text-gray-900">
                        Remarks :
                      </div>
                      <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {data1[0].grcData && data1[0].grcData.grcotherRemarks}
                      </div>
                    </div>

                    <div className=" mt-2 flex justify-end gap-x-6">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
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
            <div className=" flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewproject;
