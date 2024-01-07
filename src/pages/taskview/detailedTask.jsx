import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { viewTasks } from "../../actions/projectlistAction";
import { listEmployee } from "../../actions/employeeAction";
import { EmployeeTask } from "../../actions/employeeAction.js";
import { toast } from "react-hot-toast";

function DetailedViewtask() {
  const { projectId, taskID, type } = useParams();

  const dispatch = useDispatch();
  const TaskView = useSelector((state) => state.tasksView);
  const { tasks } = TaskView;
  const { data } = tasks;

  const employeeList = useSelector((state) => state.employeeList);
  const { loading, error, employees } = employeeList;

  const employeeTask = useSelector((state) => state.employeeTask);
  const { task } = employeeTask;
  const data1 = task?.datas;
  const employeelist = employees.employees && employees.employees;

  let android = "";
  let ios = "";
  if (data && data.mobileData) {
    const mobileData = data.mobileData;
    android = mobileData.android !== "";
    ios = mobileData.ios !== "";
    //  console.log(mobileData);
  }
  useEffect(() => {
    dispatch(viewTasks(taskID));
    dispatch(listEmployee());
    dispatch(EmployeeTask());
  }, [dispatch, taskID]);
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const role = userData?.userRole;
  const isProjectManager = role === "Project Manager";
  // const downloadPdf = (type, webtargetUrlsid) => {
  //   // Access the dynamic PDF endpoint from your Node.js server.
  //   const pdfUrl = `http://localhost:5000/project/downloadallreports/${projectId}/${taskID}/${type}/${webtargetUrlsid}`;
  //   // console.log(pdfUrl);
  //   fetch(pdfUrl)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.style.display = "none";
  //       a.href = url;
  //       a.download = "dynamic.pdf";
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     });
  // };

  const downloadPdf = (type, webtargetUrlsid) => {
    // Show loading toast
    const loadingToastId = toast.loading("Downloading PDF...");

    // Access the dynamic PDF endpoint from your Node.js server.
    const pdfUrl = `http://localhost:5000/project/downloadallreports/${projectId}/${taskID}/${type}/${webtargetUrlsid}`;

      fetch(pdfUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "dynamic.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);

          // Hide loading toast and show success toast
          toast.success("PDF downloaded successfully!", { id: loadingToastId });
        })
        .catch((error) => {
          // Hide loading toast and show error toast
          toast.error("Error downloading PDF", { id: loadingToastId });
        });
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
            {data &&
            data.webData &&
            data.webData.webotherRemarks &&
            type === "web" ? (
              <div className="block w-full rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h1>For web</h1>
                {data.webData.webtargetUrls &&
                  data.webData.webtargetUrls.map((url) => (
                    <div className=" border-b-2 my-5  py-5">
                      <div className="   pb-2 shadow-sm  flex   gap-9 sm:px-0">
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
                            {url.link}
                          </a>
                          {isProjectManager && (
                            <Link
                              to={`/viewproject/${projectId}/viewtask/${taskID}/assign/web/webtargetUrlsId/${url._id}`}
                              type="submit"
                              className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Assign
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className=" flex  justify-end">
                        <button
                          className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => {
                            downloadPdf("web", url._id);
                          }}
                        >
                          View Full Report
                        </button>
                      </div>

                      <div className="flex">
                        <h3> Assign To: </h3>

                        {url.assignEmployee.map((employee) => {
                          const matchedEmployee =
                            employeelist &&
                            employeelist.filter(
                              (emp) => emp._id === employee.employee
                            );

                          if (Array.isArray(matchedEmployee)) {
                            const employeeLinks = matchedEmployee.map((emp) => (
                              <Link
                                key={emp._id}
                                to={`/singlereportview/${taskID}/web/${url._id}/${employee.employee}`}
                                className="mx-2 list-none bg-green-500 py-1 px-2 rounded-full text-white inline-block no-underline font-[bold] bg-[linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.7372198879551821) 0%)] transition-[0.4s] hover:bg-[background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.9781162464985994) 0%);]"
                              >
                                {emp.name}
                              </Link>
                            ));
                            return (
                              <>
                                <div key={employee._id}>{employeeLinks}</div>
                              </>
                            );
                          }
                        })}
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
              </div>
            ) : null}

            {data &&
            data.mobileData &&
            data.mobileData.mobileotherRemarks &&
            type === "mobile" ? (
              <div className="block w-full rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h1>For Mobile</h1>
                {android && (
                  <>
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
                        {isProjectManager &&
                        data.mobileData &&
                        !data.mobileData.isCompleted ? (
                          <Link
                            type="submit"
                            to={`/viewproject/${projectId}/viewtask/${taskID}/android/assignsingle`}
                            className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Assign
                          </Link>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex">
                      <h3> Assign To: </h3>

                      {data.mobileData.forAndroid.assignEmployee.map(
                        (employee) => {
                          const matchedEmployee =
                            employeelist &&
                            employeelist.filter((emp) =>
                              employee.employee.includes(emp._id)
                            );
                          if (Array.isArray(matchedEmployee)) {
                            const employeeLinks = matchedEmployee.map((emp) => (
                              <Link
                                key={emp._id}
                                to={`/singlereportview/${taskID}/android/${emp._id}`}
                                className="mx-2 list-none bg-green-500 py-1 px-2 rounded-full text-white inline-block no-underline font-[bold] bg-[linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.7372198879551821) 0%)] transition-[0.4s] hover:bg-[background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.9781162464985994) 0%);]"
                              >
                                {emp.name}
                              </Link>
                            ));
                            //console.log(employeeLinks);
                            return (
                              <>
                                <div key={employee._id}>{employeeLinks}</div>
                              </>
                            );
                          }
                        }
                      )}
                    </div>
                    <div className=" flex  justify-end">
                      <button
                        className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                          downloadPdf("mobile", "android");
                        }}
                      >
                        View Full Report
                      </button>
                    </div>
                  </>
                )}

                {ios && (
                  <>
                    <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <div className="text-md font-medium leading-6 text-gray-900">
                        IOS
                      </div>
                      <div className="mt-1  flex text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <a href={data.mobileData && data.mobileData.ios}>
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                        </a>
                        {isProjectManager &&
                        data.mobileData &&
                        !data.mobileData.isCompleted ? (
                          <Link
                            type="submit"
                            to={`/viewproject/${projectId}/viewtask/${taskID}/ios/assignsingle`}
                            className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Assign
                          </Link>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex">
                      <h3> Assign To: </h3>

                      {data.mobileData.forIos.assignEmployee.map((employee) => {
                        const matchedEmployee =
                          employeelist &&
                          employeelist.filter((emp) =>
                            employee.employee.includes(emp._id)
                          );
                        if (Array.isArray(matchedEmployee)) {
                          const employeeLinks = matchedEmployee.map((emp) => (
                            <Link
                              key={emp._id}
                              to={`/singlereportview/${taskID}/ios/${emp._id}`}
                              className="mx-2 list-none bg-green-500 py-1 px-2 rounded-full text-white inline-block no-underline font-[bold] bg-[linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.7372198879551821) 0%)] transition-[0.4s] hover:bg-[background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.9781162464985994) 0%);]"
                            >
                              {emp.name}
                            </Link>
                          ));
                          return (
                            <>
                              <div key={employee._id}>{employeeLinks}</div>
                            </>
                          );
                        }
                      })}
                    </div>
                    <div className=" flex  justify-end">
                      <button
                        className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                          downloadPdf("mobile", "ios");
                        }}
                      >
                        View Full Report
                      </button>
                    </div>
                  </>
                )}

                <button
                  onClick={() => {
                    downloadPdf("mobile", data.mobileData._id);
                  }}
                >
                  View Full Report
                </button>
                <div className=" mt-4 flex flex-col">
                  <div className="text-md font-medium leading-6 text-gray-900">
                    Remarks :
                  </div>
                  <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.mobileData && data.mobileData.mobileotherRemarks}
                  </div>
                </div>
              </div>
            ) : null}

            {data &&
            data.apiData &&
            data.apiData.apiotherRemarks &&
            type === "api" ? (
              <div className="block w-full rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h1>For Api</h1>
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
                <div className="flex">
                  <h3> Assign To: </h3>

                  {data.apiData.assignEmployee.map((employee) => {
                    const matchedEmployee =
                      employeelist &&
                      employeelist.filter((emp) =>
                        employee.employee.includes(emp._id)
                      );
                    if (Array.isArray(matchedEmployee)) {
                      const employeeLinks = matchedEmployee.map((emp) => (
                        <Link
                          key={emp._id}
                          to={`/singlereportview/${taskID}/api/${emp._id}`}
                          className="mx-2 list-none bg-green-500 py-1 px-2 rounded-full text-white inline-block no-underline font-[bold] bg-[linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.7372198879551821) 0%)] transition-[0.4s] hover:bg-[background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.9781162464985994) 0%);]"
                        >
                          {emp.name}
                        </Link>
                      ));
                      return (
                        <>
                          <div key={employee._id}>{employeeLinks}</div>
                        </>
                      );
                    }
                  })}
                </div>

                <div className=" flex  justify-end">
                  <button
                    className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      downloadPdf("api", data.apiData._id);
                    }}
                  >
                    View Full Report
                  </button>
                </div>

                <div className=" mt-4 flex flex-col">
                  <div className="text-md font-medium leading-6 text-gray-900">
                    Remarks :
                  </div>
                  <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.apiData && data.apiData.apiotherRemarks}
                  </div>
                </div>
                {isProjectManager &&
                data.apiData &&
                !data.apiData.isCompleted ? (
                  <div className=" mt-2 flex justify-end gap-x-6">
                    <Link
                      type="submit"
                      to={`/viewproject/${projectId}/viewtask/${taskID}/api/assignsingle`}
                      className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Assign
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : null}
            {data &&
            data.networkData &&
            data.networkData.networkotherRemarks &&
            type === "network" ? (
              <div className="block w-full rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h1>For Network</h1>
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

                <div className="flex">
                  <h3> Assign To: </h3>

                  {data.networkData.assignEmployee.map((employee) => {
                    const matchedEmployee =
                      employeelist &&
                      employeelist.filter((emp) =>
                        employee.employee.includes(emp._id)
                      );
                    if (Array.isArray(matchedEmployee)) {
                      const employeeLinks = matchedEmployee.map((emp) => (
                        <Link
                          key={emp._id}
                          to={`/singlereportview/${taskID}/network/${emp._id}`}
                          className="mx-2 list-none bg-green-500 py-1 px-2 rounded-full text-white inline-block no-underline font-[bold] bg-[linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.7372198879551821) 0%)] transition-[0.4s] hover:bg-[background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.9781162464985994) 0%);]"
                        >
                          {emp.name}
                        </Link>
                      ));
                      console.log(employeeLinks);
                      return (
                        <>
                          <div key={employee._id}>{employeeLinks}</div>
                        </>
                      );
                    }
                  })}
                </div>
                <div className=" mt-4 flex flex-col">
                  <div className="text-md font-medium leading-6 text-gray-900">
                    Remarks :
                  </div>
                  <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.networkData && data.networkData.networkotherRemarks}
                  </div>
                </div>
                {isProjectManager &&
                data.networkData &&
                !data.networkData.isCompleted ? (
                  <div className=" mt-2 flex justify-end gap-x-6">
                    <Link
                      type="submit"
                      to={`/viewproject/${projectId}/viewtask/${taskID}/network/assignsingle`}
                      className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Assign
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : null}
            {data &&
            data.grcData &&
            data.grcData.grcotherRemarks &&
            type === "grc" ? (
              <div className="block w-full rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h1>For GRC</h1>

                <div className="flex">
                  <h3> Assign To: </h3>
                  {data.grcData.assignEmployee.map((employee) => {
                    const matchedEmployee =
                      employeelist &&
                      employeelist.filter((emp) =>
                        employee.employee.includes(emp._id)
                      );
                    if (Array.isArray(matchedEmployee)) {
                      const employeeLinks = matchedEmployee.map((emp) => (
                        <Link
                          key={emp._id}
                          to={`/singlereportview/${taskID}/grc/${emp._id}`}
                          className="mx-2 list-none bg-green-500 py-1 px-2 rounded-full text-white inline-block no-underline font-[bold] bg-[linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.7372198879551821) 0%)] transition-[0.4s] hover:bg-[background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(5,223,89,0.9781162464985994) 0%);]"
                        >
                          {emp.name}
                        </Link>
                      ));
                      console.log(employeeLinks);
                      return (
                        <>
                          <div key={employee._id}>{employeeLinks}</div>
                        </>
                      );
                    }
                  })}
                </div>

                <div className=" mt-4 flex flex-col">
                  <div className="text-md font-medium leading-6 text-gray-900">
                    Remarks :
                  </div>
                  <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.grcData && data.grcData.grcotherRemarks}
                  </div>
                </div>
                {isProjectManager &&
                data.grcData &&
                !data.grcData.isCompleted ? (
                  <>
                    <div className=" mt-2 flex justify-end gap-x-6">
                      <Link
                        type="submit"
                        to={`/viewproject/${projectId}/viewtask/${taskID}/grc/assignsingle`}
                        className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Assign
                      </Link>
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedViewtask;
