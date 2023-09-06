import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { listProject } from "../../actions/projectlistAction";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeTask } from "../../actions/employeeAction";

function EmployeeTasksList() {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("all"); // "all" or "incomplete"
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);

  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;

  const employeeTask = useSelector((state) => state.employeeTask);
  const { loading, error, task } = employeeTask;
  const data = task?.datas;

  useEffect(() => {
    dispatch(EmployeeTask());
  }, [dispatch]);

  // Function to handle sorting by status
  const handleSortBy = (status) => {
    setSortBy(status);
  };

  // Function to handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle search
  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredTasks = data
    ? data.filter((item) => {
        const task = item.tasks && item.tasks.taskid; // Access the 'tasks' and 'taskid' properties

        // Check if 'task' exists and is truthy
        if (task) {
          const taskName = task.taskName || ""; // Get the task name (default to empty string)

          return (
            taskName.toLowerCase().includes(searchText.toLowerCase()) &&
            (sortBy === "all" ||
              (sortBy === "incomplete" && !task.isCompleted) ||
              (sortBy === "completed" && task.isCompleted))
          );
        }

        // If 'task' is missing or falsy, exclude the item
        return false;
      })
    : [];

  // Calculate the index range for the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  console.log(currentTasks);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }

  const checkIsCompleted = (selectedOptionName) => {
    if (currentTasks.length === 0) {
      return false; // No tasks to check
    }

    const task = currentTasks[0].tasks.taskid; // Assuming you want to check the first task

    if (!task) {
      return false; // Task is undefined, return false
    }
    console.log(task);

    if (selectedOptionName === "grc") {
      return task.grcData ? task.grcData.isCompleted : false;
    }
    if (selectedOptionName === "api") {
      return task.apiData ? task.apiData.isCompleted : false;
    }
    if (selectedOptionName === "network") {
      return task.networkData ? task.networkData.isCompleted : false;
    }
    if (selectedOptionName === "web") {
      return task.webData ? task.webData.isCompleted : false;
    } else if (selectedOptionName === "ios") {
      return task.mobileData ? task.mobileData.isCompleted : false;
    } else if (selectedOptionName === "android") {
      return task.mobileData ? task.mobileData.isCompleted : false;
    } else {
      return task.selectedOption[selectedOptionName].isCompleted;
    }
  };

  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          <div className="font-bold text-2xl ml-10 mt-6">List of tasks</div>
          <div className="m-10">
            {/* Sort and Search Controls */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <label htmlFor="sortBy">Sort by:</label>
                <select
                  id="sortBy"
                  className="ml-2"
                  value={sortBy}
                  onChange={(e) => handleSortBy(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="incomplete">Incomplete</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label htmlFor="search">Search:</label>
                <input
                  type="text"
                  id="search"
                  className="ml-2"
                  value={searchText}
                  onChange={handleSearch}
                />
              </div>
            </div>

            {/* Task List */}
            {filteredTasks.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">
                No Tasks Assign.
              </div>
            ) : (
              <div className="flex items-center justify-center flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
                {currentTasks
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div key={item.tasks._id}>
                      <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <div className="flex my-2 justify-between">
                          <p className="font-semibold pr-4">
                            {item.tasks.taskid.taskName}
                          </p>

                          <p>
                            {checkIsCompleted(
                              item.tasks.selectedOption.name
                            ) === true ? (
                              <button
                                type="button"
                                className="inline-block rounded-full bg-success px-2 text-xs uppercase leading-normal text-white cursor-auto"
                              >
                                completed
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto"
                              >
                                ongoing
                              </button>
                            )}
                          </p>
                        </div>
                        <div className="flex my-2">
                          <p className="font-semibold">Task Type -</p>
                          <p>{item.tasks.selectedOption.name}</p>
                        </div>
                        <div className="flex my-2">
                          <p className="font-semibold">Assigned BY -</p>
                          {/* Include the appropriate value for Assigned BY */}
                          <p>{item.manager}</p>
                        </div>
                        <div className="flex my-2">
                          <p className="font-semibold">Assigned Date -</p>
                          {/* Include the appropriate value for Assigned Date */}
                          <p>{formatDate(item.tasks.assignedDate)}</p>
                        </div>

                        <Link
                          to={`/taskview/${item.tasks.taskid._id}/${item.tasks.selectedOption.name}/${item.tasks.selectedOption.webtargetUrls}`}
                        >
                          <button
                            type="submit"
                            className="flex justify-left py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-4"
                          >
                            View
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              {Array.from({
                length: Math.ceil(filteredTasks.length / tasksPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-3 py-1 rounded-full border ${
                    currentPage === index + 1 ? "bg-gray-300" : "bg-white"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTasksList;
