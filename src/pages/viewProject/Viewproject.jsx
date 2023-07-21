import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { dummyProjectList } from "../../dummyprojectlist";
import { viewProject } from "../../actions/projectlistAction";
import { useDispatch, useSelector } from "react-redux";
function Viewproject() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const projectView = useSelector((state) => state.projectView);
  const { loading, error, project } = projectView;
  const { data } = project;
  console.log(data);
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
              <div className=" flex flex-row ">
                <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <h1>For web</h1>
                  <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <div className="text-md font-medium leading-6 text-gray-900">
                      URL :
                    </div>
                    <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href="">Click Here</a>
                    </div>
                  </div>

                  <div className=" mt-4 flex flex-col">
                    <div className="text-md font-medium leading-6 text-gray-900">
                      Remarks :
                    </div>
                    <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      psum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy book. It has su
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

                <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <h1>For Api</h1>
                  <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <div className="text-md font-medium leading-6 text-gray-900">
                      URL :
                    </div>
                    <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href="">Click Here</a>
                    </div>
                  </div>

                  <div className=" mt-4 flex flex-col">
                    <div className="text-md font-medium leading-6 text-gray-900">
                      Remarks :
                    </div>
                    <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      psum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy book. It has su
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

                <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <h1>For Mobile</h1>
                  <div className=" mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <div className="text-md font-medium leading-6 text-gray-900">
                      URL :
                    </div>
                    <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href="">Click Here</a>
                    </div>
                  </div>

                  <div className=" mt-4 flex flex-col">
                    <div className="text-md font-medium leading-6 text-gray-900">
                      Remarks :
                    </div>
                    <div className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      psum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy book. It has su
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
