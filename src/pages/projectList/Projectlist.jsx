import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { listProject } from "../../actions/projectlistAction";
import { useDispatch, useSelector } from "react-redux";
import { CogIcon } from "@heroicons/react/20/solid";

function Projectlist() {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.projectList);
  const { loading, error, project } = projectList;
  const { data } = project;
  useEffect(() => {
    dispatch(listProject());
  }, [dispatch]);
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }

  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          <div className="font-bold text-2xl ml-10 mt-6">List of projects</div>
          <div className="m-10 flex items-center justify-center flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
            {data && data.length > 0 ? (
              data
                .slice()
                .reverse()
                .map((item) => {
                  return (
                    <div key={item._id}>
                      <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <div className="flex my-2 justify-between">
                          <p className="font-semibold pr-4">
                            {item.companyName}
                          </p>
                          <p>
                            {item.isCompleted === false && (
                              <button
                                type="button"
                                className="inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto"
                              >
                                ongoing
                              </button>
                            )}

                            {item.isCompleted === true && (
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
                          <p className="font-semibold">Project Name -</p>
                          <p>{item.projectName}</p>
                        </div>
                        <div className="flex my-2">
                          <p className="font-semibold">createdAt -</p>
                          <p>{formatDate(item.createdAt)}</p>
                        </div>

                        <Link to={`/viewproject/${item._id}`}>
                          <button
                            type="submit"
                            className="flex justify-left py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-4"
                          >
                            View
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="text-center text-gray-500 mt-4">
                No projects created yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projectlist;
