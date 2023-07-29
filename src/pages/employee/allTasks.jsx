import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { listProject } from "../../actions/projectlistAction";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeTask } from "../../actions/employeeAction";

function EmployeeTasksList() {
  const dispatch = useDispatch();

  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;
  const employeeTask = useSelector((state) => state.employeeTask);
  const { loading, error, task } = employeeTask;
  const tasks = task?.tasks;
  console.log(tasks);

  useEffect(() => {
    dispatch(EmployeeTask());
  }, [dispatch]);
  return (
    <div className="App">
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />

          <div className="font-bold text-2xl ml-10 mt-6">List of tasks</div>
          <div className="m-10 flex items-center justify-center flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
            {tasks &&
              tasks.map((item) => (
                <div key={item._id}>
                  <div className="block w-[320px] rounded-lg bg-white p-6 m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="flex my-2 justify-between">
                      <p className="font-semibold pr-4">{item.companyName}</p>
                      <p>
                        {item.status === "ongoing" && (
                          <button
                            type="button"
                            className="inline-block rounded-full bg-warning px-2 text-xs uppercase leading-normal text-white cursor-auto"
                          >
                            ongoing
                          </button>
                        )}

                        {item.status === "completed" && (
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
                      <p className="font-semibold">Task Type -</p>
                      <p>{item.selectedOption.name}</p>
                    </div>
                    <div className="flex my-2">
                      <p className="font-semibold">Assigned BY -</p>
                      {/* <p>{item.clientName}</p> */}
                    </div>
                    <div className="flex my-2">
                      <p className="font-semibold">Assigned Date -</p>
                      {/* <p>{item.clientName}</p> */}
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
        </div>
      </div>
    </div>
  );
}

export default EmployeeTasksList;
