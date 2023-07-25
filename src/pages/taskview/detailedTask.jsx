import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { viewTasks } from "../../actions/projectlistAction";
import { useDispatch, useSelector } from "react-redux";
import { PaperClipIcon } from "@heroicons/react/20/solid";
function DetailedViewtask() {
  const { projectId, taskID, type } = useParams();
  const dispatch = useDispatch();
  const TaskView = useSelector((state) => state.tasksView);
  const { tasks } = TaskView;
  const { data } = tasks;

  let android = "";
  let ios = "";
  if (data && data.mobileData) {
    const mobileData = data.mobileData;
    android = mobileData.android !== "";
    ios = mobileData.ios !== "";
    console.log(mobileData);
  }
  useEffect(() => {
    dispatch(viewTasks(taskID));
  }, [dispatch, taskID]);

  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          {/* main code  */}
          <div className="font-bold text-2xl ml-10 mt-6">
            {" "}
            Detailed Task View
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
                    <div className="mt-4 pb-2 border-b-2 shadow-sm  flex   gap-9 sm:px-0">
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
                        <Link
                          to={`/viewproject/${projectId}/viewtask/${taskID}/assign/web/webtargetUrlsId/${url._id}`}
                          type="submit"
                          className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Assign
                        </Link>
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
                  <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <div className="text-md font-medium leading-6 text-gray-900">
                      Android
                    </div>
                    <div className="mt-1  flex text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href={data.mobileData && data.mobileData.android}>
                        {data.mobileData && data.mobileData.android}
                      </a>
                      <Link
                        type="submit"
                        to={`/viewproject/${projectId}/viewtask/${taskID}/anorid/assignsingle`}
                        className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Assign
                      </Link>
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
                        {data.mobileData && data.mobileData.ios}
                      </a>
                      <Link
                        type="submit"
                        to={`/viewproject/${projectId}/viewtask/${taskID}/ios/assignsingle`}
                        className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Assign
                      </Link>
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
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    FILE
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

                <div className=" mt-2 flex justify-end gap-x-6">
                  <Link
                    type="submit"
                    to={`/viewproject/${projectId}/viewtask/${taskID}/api/assignsingle`}
                    className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Assign
                  </Link>
                </div>
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
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    FILE
                  </span>
                </div>

                <div className=" mt-4 flex flex-col">
                  <div className="text-md font-medium leading-6 text-gray-900">
                    Remarks :
                  </div>
                  <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.networkData && data.networkData.networkotherRemarks}
                  </div>
                </div>

                <div className=" mt-2 flex justify-end gap-x-6">
                  <Link
                    type="submit"
                    to={`/viewproject/${projectId}/viewtask/${taskID}/network/assignsingle`}
                    className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Assign
                  </Link>
                </div>
              </div>
            ) : null}
            {data &&
            data.grcData &&
            data.grcData.grcotherRemarks &&
            type === "grc" ? (
              <div className="block w-full rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h1>For GRC</h1>

                <div className=" mt-4 flex flex-col">
                  <div className="text-md font-medium leading-6 text-gray-900">
                    Remarks :
                  </div>
                  <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.grcData && data.grcData.grcotherRemarks}
                  </div>
                </div>

                <div className=" mt-2 flex justify-end gap-x-6">
                  <Link
                    type="submit"
                    to={`/viewproject/${projectId}/viewtask/${taskID}/grc/assignsingle`}
                    className="  mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Assign
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedViewtask;
