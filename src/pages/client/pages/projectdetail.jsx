import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { dummyProjectList } from "../../../dummyprojectlist";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { viewTasks } from "../../../actions/projectlistAction";
import { toast } from "react-hot-toast";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function ClientProjectView() {
  //console.log(useParams());
  const { projectId, taskId } = useParams();
  const dispatch = useDispatch();
  const TaskView = useSelector((state) => state.tasksView);
  const { tasks } = TaskView;
  console.log(tasks);

  useEffect(() => {
    dispatch(viewTasks(taskId));
  }, [dispatch, taskId]);
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;

  const [Vernablitydata, setVernablityData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/project/getreportdatabyproject`,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update task status");
        }

        const responseData = await response.json();
        setVernablityData(responseData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  //console.log(Vernablitydata);

  const integerValues = [
    Vernablitydata?.critical,
    Vernablitydata?.low,
    Vernablitydata?.medium,
    Vernablitydata?.high,
  ];
  const data = {
    labels: ["Critical", "Low", "Medium", "High"],
    datasets: [
      {
        data: integerValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#2ECC71",
          "#9B59B6",
          "#FFA500",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#2ECC71",
          "#9B59B6",
          "#FFA500",
        ],
      },
    ],
  };

  const [showOptions, setShowOptions] = useState(false);

  const handleButtonClick = () => {
    setShowOptions(true);
  };

  const [selectedOption, setSelectedOption] = useState("");

  function handleDropdownChange(event) {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  }

  const handleOptionSelect = (option) => {
    // Do something with the selected option
    //console.log("Selected option:", option);
    setShowOptions(false); // Hide the options after selection (you can change this behavior as needed)
  };

  const downloadPdf = (type, webtargetUrlsid) => {
    // Show loading toast
    const loadingToastId = toast.loading("Downloading PDF...");

    // Access the dynamic PDF endpoint from your Node.js server.
    const pdfUrl = `http://localhost:5000/project/downloadallreports/${projectId}/${taskId}/${type}/${webtargetUrlsid}`;

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
          <div className="font-bold text-2xl ml-10 mt-6">Projects Name</div>
          <div className="m-10 flex items-center justify-around flex-row flex-wrap rounded-lg border border-dashed border-gray-900/25 py-6">
            <div>
              <Pie width={300} height={200} data={data} />
              <span>Vernablity Status</span>
            </div>
            <div className=" p-10 rounded-lg border border-dashed border-gray-900/25">
              <button
                onClick={handleButtonClick}
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Generate Report
              </button>
              {showOptions && (
                <div className="w-64 mt-5">
                  <label
                    htmlFor="dropdown"
                    className="block font-medium text-gray-700"
                  >
                    Select an option:
                  </label>

                  <select
                    onChange={handleDropdownChange}
                    id="dropdown"
                    name="dropdown"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option disabled selected value="">
                      Select an option
                    </option>
                    {tasks.data.selectedOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {
                <div>
                  {selectedOption === "web" && (
                    <div>
                      {tasks.data.webData.webtargetUrls.map((url, index) => (
                        <div key={index} className="pt-6 flex justify-between">
                          <div className="flex flex-1 items-center">
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            {url.lable}
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <Link
                              onClick={() => {
                                downloadPdf("web", url._id);
                              }}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              rel="noopener noreferrer"
                            >
                              Download Report
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {selectedOption === "mobile" && (
                    <div>
                      <div className=" pt-6 flex justify-between">
                        <div className="flex  flex-1 items-center">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          Android
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <Link
                            to={`/allreportforclient/${taskId}/android/`}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download Report
                          </Link>
                        </div>
                      </div>
                      <div className=" pt-6 flex justify-between">
                        <div className="flex  flex-1 items-center">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          Ios
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <Link
                            to={`/allreportforclient/${taskId}/ios/`}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download Report
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedOption === "api" && (
                    <div className=" pt-6 flex justify-between">
                      {tasks.data.apiData && (
                        <div className="flex  flex-1 items-center">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <Link
                            //  to={`/allreportforclient/${taskId}/api/`}
                            onClick={() => {
                              downloadPdf("api", 78);
                            }}
                            className="font-medium ml-4 text-indigo-600 hover:text-indigo-500"
                          >
                            Download Report
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                  {selectedOption === "network" && (
                    <div className=" pt-6 flex justify-between">
                      {tasks.data.networkData && (
                        <div className="flex  flex-1 items-center">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <Link
                            to={`/allreportforclient/${taskId}/network/`}
                            href="#"
                            className="font-medium ml-4 text-indigo-600 hover:text-indigo-500"
                          >
                            Download Report
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                  {selectedOption === "grc" && (
                    <div className=" pt-6 flex justify-between">
                      <div className="flex  flex-1 items-center">
                        <PaperClipIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <Link
                          to={`/allreportforclient/${taskId}/grc/`}
                          className="font-medium ml-4 text-indigo-600 hover:text-indigo-500"
                        >
                          Download Report
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProjectView;
