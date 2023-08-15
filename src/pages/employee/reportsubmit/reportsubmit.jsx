import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reportCreate } from "../../../actions/reportSubmit";
import { initTE, Select } from "tw-elements";

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
  const [files, setFiles] = useState({});
  const [message, setMessage] = useState("");

  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    setPocFile(selectedFiles);
    for (const file of selectedFiles) {
      addFile(file);
    }
  };

  const dropHandler = (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    for (const file of fileList) {
      addFile(file);
    }
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
  };

  const dragLeaveHandler = (event) => {
    event.preventDefault();
  };

  const dragEnterHandler = (event) => {
    event.preventDefault();
  };

  const handleBrowseButtonClick = () => {
    const hiddenInput = document.getElementById("hidden-input");
    hiddenInput.click();
  };

  const handleFileInput = (event) => {
    const fileList = event.target.files;
    for (const file of fileList) {
      addFile(file);
    }
  };

  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const employee = userData?.id;

  const addFile = (file) => {
    const isImage = file.type.startsWith("image/");
    const objectURL = URL.createObjectURL(file);

    setFiles((prevFiles) => ({
      ...prevFiles,
      [objectURL]: file,
    }));
  };

  const deleteFile = (objectURL) => {
    const updatedFiles = { ...files };
    delete updatedFiles[objectURL];
    setFiles(updatedFiles);
  };

  const handleSubmitFiles = () => {
    alert(`Submitted Files:\n${JSON.stringify(files)}`);
    console.log(files);
  };

  const reportCreated = useSelector((state) => state.reportCreated);
  const { loading, error, report } = reportCreated;

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
    dispatch(
      reportCreate(
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

  return (
    <div className="home ">
      <Sidebar />
      <div className="homeContainer w-[70vw]">
        <Navbar />
        {/* main code here */}
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight m-6">
          Submit Report
        </h2>
        <div className="flex w-auto rounded-lg border border-dashed border-gray-900/25 p-6 m-6 mt-6">
          <form
            onSubmit={handleSubmit}
            className="w-full"
            enctype="multipart/form-data"
          >
            {/* multi file upload start herepx  */}
            <main className="container mb-8 mx-auto h-fit">
              {/* file upload modal */}
              <article
                aria-label="File Upload Modal"
                className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
                onDragLeave={dragLeaveHandler}
                onDragEnter={dragEnterHandler}
              >
                {/* scroll area */}
                <section className=" overflow-auto p-8 w-full h-full flex flex-col">
                  <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                    <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                      <span>Drag and drop your</span>&nbsp;
                      <span>files anywhere or</span>
                    </p>
                    <input
                      id="hidden-input"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileInput}
                    />
                    <button
                      id="button"
                      className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                      onClick={handleBrowseButtonClick}
                    >
                      Upload a file
                    </button>
                  </header>

                  <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                    To Upload
                  </h1>
                </section>

                {/* sticky footer */}
                <footer className="flex justify-end px-8 pb-8 pt-4">
                  <button
                    id="submit"
                    className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
                    onClick={handleSubmitFiles}
                  >
                    Upload now
                  </button>
                  <button
                    id="cancel"
                    className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                  >
                    Cancel
                  </button>
                </footer>
              </article>
            </main>
            {/* multi file upload end here  */}
            <div className=" flex  ">
              <div className="sm:col-span-4">
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
              <div className="sm:col-span-4 ml-10 ">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Risk
                </label>
                <div className=" mt-2 ">
                  <select
                    value={risk}
                    id="Vulnerability"
                    name="risk"
                    type="text"
                    required
                    data-te-select-init
                    onChange={(e) => setRisk(e.target.value)}
                  >
                    <option selected>Select Risk</option>
                    <option value="high">Hign</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* <div className="mt-2">
                  <input
                    value={risk}
                    id="Vulnerability"
                    name="risk"
                    type="text"
                    className="block w-[260px]  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div> */}
              </div>
              <div className="sm:col-span-4 ml-10 ">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  CWE #
                </label>
                <div className="mt-2">
                  <input
                    value={cwe}
                    onChange={(e) => setCwe(e.target.value)}
                    id="Vulnerability"
                    name="cwe"
                    type="text"
                    className="block w-[260px]  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className=" flex  mt-8 ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Attributing Factor
                </label>
                <div className="mt-2">
                  <textarea
                    value={attributingFactor}
                    onChange={(e) => setAttributingFactor(e.target.value)}
                    id="Vulnerability"
                    name="attributingFactor"
                    type="text"
                    className="block w-[250px]  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>
              <div className="sm:col-span-4 ml-10">
                <label
                  htmlFor="Vulnerability"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Affected URL
                </label>
                <div className="mt-2">
                  <textarea
                    value={affectedUrl}
                    onChange={(e) => setAffectedUrl(e.target.value)}
                    name="affectedUrl"
                    type="text"
                    className="block w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-[250px]  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-[250px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-[250px]  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    onChange={handleFileInputChange}
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
                    className="block w-[650px] h-[75px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reportsubmit;
