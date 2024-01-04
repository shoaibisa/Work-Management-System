import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reportCreate,
  reportUpdate,
  reportCreateForWeb,
} from "../../../actions/reportSubmit";
import { initTE, Select } from "tw-elements";
import { toast } from "react-hot-toast";

const Reportsubmit = () => {
  const { taskID, type, webtargetUrlsId } = useParams();
  const [vulnerability, setVulnerability] = useState("");
  const [risk, setRisk] = useState("");
  const [attributingFactor, setAttributingFactor] = useState("");
  const [affectedUrl, setAffectedUrl] = useState("");
  const [observation, setObservation] = useState("");
  const [cwe, setCwe] = useState("");
  const [impact, setImpact] = useState("");
  const [mitigation, setMitigation] = useState("");
  const [pocFile, setPocFile] = useState([]);
  const [brief, setBrief] = useState("");
  const [message, setMessage] = useState("");
  // Multiple file upload
  const [highlight, setHighlight] = useState(false);
  const [files, setFiles] = useState([]);

  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const employee = userData?.id;

  const reportCreated = useSelector((state) => state.reportCreated);
  const { loading, error, report } = reportCreated;

  const updateReport = useSelector((state) => state.updateReport);
  const { updateReports } = updateReport;

  useEffect(() => {
    if (report) {
      if (!report.isError) {
        // Do something on success
      } else {
        setMessage(report.message);
      }
    }
  }, [report]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // return console.log("ejnfjr", files);
    if (!files) {
      toast.error("Please Select The File.");
      return;
    }
    dispatch(reportCreate(files, employee, taskID, type, webtargetUrlsId));
    window.history.back();
  };

  const validateAndPOCFiles = (selectedFiles) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 400 * 1024; // 400KB in bytes

    const validFiles = Array.from(selectedFiles).filter((file) => {
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a valid file type.`);
        return false;
      }

      // Check file size
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds the maximum allowed size (400KB).`);
        return false;
      }

      return true;
    });

    // Display an error message if no valid files are selected
    if (validFiles.length === 0) {
      toast.error("No valid files selected.");
      // You may want to set an error state or display a message to the user
    }

    setPocFile(validFiles);
  };

  const handleFileInputChangePocFile = (event) => {
    const selectedFiles = event.target.files;
    validateAndPOCFiles(selectedFiles);
  };

  const handleSubmitForWeb = (event) => {
    event.preventDefault();

    if (
      !vulnerability ||
      !risk ||
      !attributingFactor ||
      !affectedUrl ||
      !observation ||
      !cwe ||
      !impact ||
      !mitigation ||
      !pocFile.length ||
      !brief
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(
      reportCreateForWeb(
        vulnerability,
        risk,
        attributingFactor,
        affectedUrl,
        observation,
        cwe,
        impact,
        mitigation,
        pocFile,
        brief,
        employee,
        taskID,
        type,
        webtargetUrlsId
      )
    );
    window.history.back();
  };

  useEffect(() => {
    initTE({ Select });
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setHighlight(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlight(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileInputChange({ target: { files: droppedFiles } }); // Call handleFileInputChange with dropped files
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    validateAndAddFiles(selectedFiles);
  };

  const removeFile = (fileName) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
  };

  const validateAndAddFiles = (selectedFiles) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    const validFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );
    setFiles([...files, ...validFiles]);
  };

  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    setPocFile(selectedFiles);
  };

  return (
    <div className="home ">
      <Sidebar />
      <div className="homeContainer w-[70vw]">
        <Navbar />
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight m-6">
          Submit Report
        </h2>
        <div className="flex-row gap-10 w-auto rounded-lg border border-dashed border-gray-900/25 p-6 m-6 mt-6">
          {/* Here multiple file upload Start*/}
          {["network", "grc"].includes(type) && (
            <form
              onSubmit={handleSubmit}
              className="w-full"
              enctype="multipart/form-data"
            >
              <div className=" flex-col   items-center  mb-5 pb-5">
                <h1 className=" bold  text-2xl p-2 m-2  ">
                  {" "}
                  Upload Report Here
                </h1>
                <div
                  className={`border-4  w-full ${
                    highlight ? "border-blue-500" : "border-gray-300"
                  } border-dashed p-8 `}
                >
                  <div
                    className="w-full h-32 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-lg"
                    onDragEnter={handleDragEnter}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileInput}
                      multiple
                      required
                      accept=".pdf, .xlsx, .xls"
                      name="files"
                    />
                    <p>Drag & Drop PDF or Excel files here</p>
                    <p>or</p>
                    <p
                      className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                      onClick={() =>
                        document.querySelector("input[type=file]").click()
                      }
                    >
                      Browse Files
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {files.map((file) => (
                      <li
                        key={file.name}
                        className="flex items-center justify-between space-x-2"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{file.name}</span>
                          <span className="text-sm text-gray-500">
                            ({(file.size / 1024).toFixed(2)} KB)
                          </span>
                        </div>
                        <button
                          className="text-red-600 hover:text-red-800 focus:outline-none"
                          onClick={() => removeFile(file.name)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
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
                {/* <div className="  text-green-500   text-md ">
                  {report.message}
                </div> */}
              </div>
            </form>
          )}

          {["android", "ios", "web", "api"].includes(type) && (
            <form
              onSubmit={handleSubmitForWeb}
              className="w-full mt-5"
              enctype="multipart/form-data"
            >
              {/* multi file upload end here  */}
              <div className=" flex ">
                <div className="">
                  <label
                    htmlFor="Vulnerability"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Vulnerability Name
                  </label>
                  <div className="mt-2">
                    <input
                      value={vulnerability}
                      onChange={(e) => setVulnerability(e.target.value)}
                      id="Vulnerability"
                      name="vulnerability"
                      type="text"
                      className="block w-[260px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className=" ml-10 ">
                  <label
                    htmlFor="Vulnerability"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Risk
                  </label>
                  <div className=" mt-2 ">
                    <select
                      value={risk}
                      name="risk"
                      type="text"
                      required
                      data-te-select-init
                      onChange={(e) => setRisk(e.target.value)}
                    >
                      <option selected>Select Risk</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                <div className=" ml-10 ">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    CWE #
                  </label>
                  <div className="mt-2">
                    <input
                      value={cwe}
                      onChange={(e) => setCwe(e.target.value)}
                      name="cwe"
                      type="text"
                      className="block w-[260px]   rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className=" flex  mt-8 ">
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Attributing Factor
                  </label>
                  <div className="mt-2">
                    <textarea
                      value={attributingFactor}
                      onChange={(e) => setAttributingFactor(e.target.value)}
                      name="attributingFactor"
                      type="text"
                      className="block w-[250px]  h-[300px] p-5  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>
                <div className="sm:col-span-4 ml-10">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Affected URL
                  </label>
                  <div className="mt-2">
                    <textarea
                      value={affectedUrl}
                      onChange={(e) => setAffectedUrl(e.target.value)}
                      name="affectedUrl"
                      type="link"
                      className="block w-[250px]  h-[300px] p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>
                <div className="sm:col-span-4 ml-10 ">
                  <label
                    htmlFor="Vulnerability"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Observation
                  </label>
                  <div className="mt-2">
                    <textarea
                      value={observation}
                      onChange={(e) => setObservation(e.target.value)}
                      id="Vulnerability"
                      name="observation"
                      type="text"
                      className="block w-[250px] h-[300px] p-5  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className=" flex  mt-8 ">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="Vulnerability"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Impact
                  </label>
                  <div className="mt-2">
                    <textarea
                      value={impact}
                      onChange={(e) => setImpact(e.target.value)}
                      id="Vulnerability"
                      name="impact"
                      type="text"
                      className="block w-[250px]  h-[300px] p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>
                <div className="sm:col-span-4 ml-10 ">
                  <label
                    htmlFor="Vulnerability"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mitigations
                  </label>
                  <div className="mt-2">
                    <textarea
                      value={mitigation}
                      onChange={(e) => setMitigation(e.target.value)}
                      id="Vulnerability"
                      name="mitigation"
                      type="text"
                      className="block w-[250px]   h-[300px] p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>
                <div className="sm:col-span-4 ml-10 w-[300px] ">
                  <label
                    htmlFor="Vulnerability"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    POC
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleFileInputChangePocFile}
                      class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      type="file"
                      multiple
                      name="pocFiles"
                      id="formFile"
                    />
                  </div>
                </div>
              </div>
              <div className=" flex flex-col  mt-8 ">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="Vulnerability"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Brief Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      id="Vulnerability"
                      name="brief"
                      type="text"
                      className="block w-[650px]  h-[300px] p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>

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
              <input name="reportId" hidden value={report.reportId} />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reportsubmit;
