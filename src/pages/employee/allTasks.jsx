// import React, { useEffect } from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import { Link } from "react-router-dom";
// import { listProject } from "../../actions/projectlistAction";
// import { useDispatch, useSelector } from "react-redux";
// import { EmployeeTask } from "../../actions/employeeAction";

// function EmployeeTasksList() {
//   const dispatch = useDispatch();

//   const employeeLogin = useSelector((state) => state.employeeLogin);
//   const { employeeInfo } = employeeLogin;

//   const employeeTask = useSelector((state) => state.employeeTask);
//   const { loading, error, task } = employeeTask;
//   const data = task?.datas;
//   useEffect(() => {
//     dispatch(EmployeeTask());
//   }, [dispatch]);
//   return (
//     <div className="App">
//       <div className="home">
//         <Sidebar />
//         <div className="homeContainer">
//           <Navbar />

//           <div className="font-bold text-2xl ml-10 mt-6">List of tasks</div>
//           <div className="m-10 flex items-center justify-center flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
//             {data &&
//               data
//                 .slice()
//                 .reverse()
//                 .map((item) => {
//                   // Check if the selectedOption.name matches the taskid.selectedOptions array

//                   if (
//                     item.selectedOption &&
//                     item.taskid &&
//                     item.taskid.selectedOptions.includes(
//                       item.selectedOption.name
//                     )
//                   ) {
//                     return (
//                       <div key={item._id}>
//                         <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
//                           <div className="flex my-2 justify-between">
//                             <p className="font-semibold pr-4">
//                               {item.taskid.taskName}
//                             </p>

//                             <p>
//                               {item.taskid.isCompleted === true ? (
//                                 <button
//                                   type="button"
//                                   className="inline-block rounded-full bg-success px-2 text-xs uppercase leading-normal text-white cursor-auto"
//                                 >
//                                   completed
//                                 </button>
//                               ) : (
//                                 <button
//                                   type="button"
//                                   className="inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto"
//                                 >
//                                   ongoing
//                                 </button>
//                               )}
//                             </p>
//                           </div>
//                           <div className="flex my-2">
//                             <p className="font-semibold">Task Type -</p>
//                             <p>{item.selectedOption.name}</p>
//                           </div>
//                           <div className="flex my-2">
//                             <p className="font-semibold">Assigned BY -</p>
//                             {/* <p>{item.clientName}</p> */}
//                           </div>
//                           <div className="flex my-2">
//                             <p className="font-semibold">Assigned Date -</p>
//                             {/* <p>{item.clientName}</p> */}
//                           </div>

//                           <Link
//                             to={`/taskview/${item.taskid._id}/${item.selectedOption.name}/${item.selectedOption.webtargetUrls}`}
//                           >
//                             <button
//                               type="submit"
//                               className="flex justify-left py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mt-4"
//                             >
//                               View
//                             </button>
//                           </Link>
//                         </div>
//                       </div>
//                     );
//                   } else {
//                     return null; // Render nothing if the condition is not met
//                   }
//                 })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmployeeTasksList;

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

  // Filter tasks based on search text and sorting criteria
  const filteredTasks = data
    ? data.filter((item) => {
        return (
          item.taskid.taskName
            .toLowerCase()
            .includes(searchText.toLowerCase()) &&
          (sortBy === "all" ||
            (sortBy === "incomplete" && !item.taskid.isCompleted) ||
            (sortBy === "completed" && item.taskid.isCompleted))
        );
      })
    : [];

  // Calculate the index range for the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

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
            <div className="flex items-center justify-center flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
              {currentTasks.map((item) => (
                <div key={item._id}>
                  <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="flex my-2 justify-between">
                      <p className="font-semibold pr-4">
                        {item.taskid.taskName}
                      </p>

                      <p>
                        {item.taskid.isCompleted === true ? (
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
                      <p>{item.selectedOption.name}</p>
                    </div>
                    <div className="flex my-2">
                      <p className="font-semibold">Assigned BY -</p>
                      {/* Include the appropriate value for Assigned BY */}
                      <p>{item.assignedBy}</p>
                    </div>
                    <div className="flex my-2">
                      <p className="font-semibold">Assigned Date -</p>
                      {/* Include the appropriate value for Assigned Date */}
                      <p>{item.assignedDate}</p>
                    </div>

                    <Link
                      to={`/taskview/${item.taskid._id}/${item.selectedOption.name}/${item.selectedOption.webtargetUrls}`}
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
