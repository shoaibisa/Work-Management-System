import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { infoUSer } from "../../../actions/employeeAction";
function WMClientProjectlist() {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.userInfo);
  const { loading, error, user } = projectList;
  const [projectDetails, setProjectDetails] = useState([]);
  const [managerDetails, setManagerDetails] = useState([]);
  useEffect(() => {
    dispatch(infoUSer());
  }, [dispatch]);

  const fetchProjectDetailsById = async (projectId) => {
    const userData = JSON.parse(localStorage.getItem("employeeInfo"));
    const token = userData?.token;
    try {
      const response = await fetch(`http://localhost:5000/project/getbyid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          id: projectId,
        }),
      });
      const data = await response.json();
      return data; // Return the fetched project data
    } catch (error) {
      console.error("Error fetching project details:", error);
      return null;
    }
  };

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
    if (user.data) {
      const fetchProjectDetails = async () => {
        const details = await Promise.all(
          user.data.clientProjects.map((item) => fetchProjectDetailsById(item))
        );
        setProjectDetails(details);
      };
      fetchProjectDetails();
    }
  }, [user.data]);
  useEffect(() => {
    if (projectDetails.length > 0) {
      const fetchManagerDetails = async () => {
        const managerIds = projectDetails.map((item) => item.data.manager);
        const managerDetailsPromises = managerIds.map(fetchManagerDetailsById);
        const managers = await Promise.all(managerDetailsPromises);
        setManagerDetails(managers);
      };
      fetchManagerDetails();
    }
  }, [projectDetails]);
  // console.log(projectDetails);
  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          <div className="font-bold text-2xl ml-10 mt-6">List of projects</div>
          <div className="m-10 flex items-center justify-center flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
            {projectDetails.length > 0 ? (
              projectDetails.map((projectData, index) => {
                if (projectData) {
                  const item = user.data.clientProjects[index];
                  console.log(projectData);
                  return (
                    <>
                      <div key={item._id}>
                        <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                          <div className="flex my-2 justify-between">
                            <p className="font-semibold pr-4"></p>
                            <p>
                              {projectData.data.isCompleted === false && (
                                <button
                                  type="button"
                                  className="inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto"
                                >
                                  ongoing
                                </button>
                              )}
                              {projectData.isCompleted === true && (
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
                            {projectData.data.projectName}
                          </div>
                          <div className="flex my-2">
                            <p className="font-semibold"> Project Manager -</p>
                            {managerDetails[index] ? (
                              <p>{managerDetails[index].employee.name}</p>
                            ) : null}
                          </div>
                          <div className="flex my-2">
                            <p className="font-semibold">Project Created -</p>
                            {formatDate(projectData.data.createdAt)}
                          </div>

                          <Link to={`/clienttasks/${item}`}>
                            <button
                              type="submit"
                              className="flex justify-left py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-4"
                            >
                              View
                            </button>
                          </Link>
                        </div>
                      </div>
                    </>
                  );
                }
                return null; // Handle the case where project data couldn't be fetched
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

export default WMClientProjectlist;
