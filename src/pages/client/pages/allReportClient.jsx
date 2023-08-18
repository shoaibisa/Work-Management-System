import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "jspdf-autotable";
import { allReportsByTask } from "../../../actions/reportSubmit";
function AllReportForClient() {
  const dispatch = useDispatch();
  const { taskId, Type, webtargetUrls } = useParams();
  const [loader, setLoader] = useState(false);

  const allReportByTask = useSelector((state) => state.allReportByTask);
  const { allReport } = allReportByTask;
  const report = allReport;
  console.log(report);

  useEffect(() => {
    dispatch(allReportsByTask(taskId, Type, webtargetUrls));
  }, [dispatch, taskId, Type, webtargetUrls]);

  const PrintButton = () => {
    window.print();
  };

  return (
    <div className="wrapper">
      <div className="receipt-box">
        <div className="actual-receipt">
          <div className="mt-1 mb-5">
            <div className="receipt-actions-div">
              <div className="actions-right justify-end flex mx-3">
                <button
                  className="receipt-modal-download-button rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={PrintButton}
                  disabled={!(loader === false)}
                >
                  {loader ? <span>Printing</span> : <span>Print</span>}
                </button>
              </div>
            </div>
            <div>
              <h1 className=" text-center  bold text-2xl "> Full Report</h1>
            </div>
            {report && report.length > 0 ? (
              report[0].map((items, index) => (
                <div class="flex  m-auto mt-10  flex-col w-[1000px] ">
                  <table
                    id="my-table"
                    className="table-auto border border-collapse border-gray-300"
                  >
                    <tbody>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 w-10 border border-gray-300">
                          #
                        </th>
                        <th className="px-4 py-2 w-[200px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          Vulnerability
                        </th>
                        <th className="px-4 py-2 w-[200px] border border-gray-300 col-span-3">
                          {items && items.vulnerability}
                        </th>
                        <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          Risk
                        </th>
                        <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-orange-500 bg-orange-100">
                          {items && items.risk}
                        </th>
                        <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          Status
                        </th>
                      </tr>

                      <tr>
                        <td className="px-4 py-2 border border-gray-300"> </td>
                        <td className="px-4 py-2 border h-20 border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          Attributing Factor
                        </td>
                        <th className="px-4 py-2 w-[200px] border border-gray-300 col-span-3">
                          {items && items.attributingFactor}
                        </th>
                        <td className="px-4 py-2 border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          CWE #
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {items && items.cwe}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          open
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300">1</td>
                        <td className="px-4 py-2 border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          Brief Description
                        </td>
                        <td
                          colSpan={6}
                          className="px-4 py-2 border h-20 border-gray-300 col-span-6"
                        >
                          {items && items.brief}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="px-4 text-blue-500 bg-blue-100 py-2 border  border-gray-300"
                          colSpan={2}
                        >
                          Affected Path
                        </td>
                        <td
                          colSpan={6}
                          className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                        >
                          {items && items.affectedUrl}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="px-4 text-blue-500 bg-blue-100 py-2 border border-gray-300"
                          colSpan={2}
                        >
                          Observation
                        </td>
                        <td
                          colSpan={6}
                          className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                        >
                          {items && items.observation}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="px-4 text-blue-500 bg-blue-100 py-2 border border-gray-300"
                          colSpan={2}
                        >
                          Impact
                        </td>
                        <td
                          colSpan={6}
                          className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                        >
                          {items && items.impact}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                          colSpan={2}
                        >
                          Mitigations
                        </td>
                        <td
                          colSpan={6}
                          className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                        >
                          {items && items.mitigation}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h6 className="mx-2 bold ">Screenshots</h6>
                  {items &&
                    items.files.map((it) => (
                      <div className="m-5  ">
                        <img
                          className=" w-500 h-auto"
                          src={`http://localhost:5000/files/${it}`}
                          alt={`Image ${it}`}
                        />
                      </div>
                    ))}
                </div>
              ))
            ) : (
              <div>No reports available.</div>
            )}
            {/* {report ? (
              report.map((items) => (
                <>
                  <div class="flex  m-auto mt-10  flex-col w-[1000px] ">
                    <table
                      id="my-table"
                      className="table-auto border border-collapse border-gray-300"
                    >
                      <tbody>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 w-10 border border-gray-300">
                            #
                          </th>
                          <th className="px-4 py-2 w-[200px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                            Vulnerability
                          </th>
                          <th className="px-4 py-2 w-[200px] border border-gray-300 col-span-3">
                            {items && items.vulnerability}
                          </th>
                          <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                            Risk
                          </th>
                          <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-orange-500 bg-orange-100">
                            {items && items.risk}
                          </th>
                          <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                            Status
                          </th>
                        </tr>

                        <tr>
                          <td className="px-4 py-2 border border-gray-300">
                            {" "}
                          </td>
                          <td className="px-4 py-2 border h-20 border-gray-300 font-semibold text-blue-500 bg-blue-100">
                            Attributing Factor
                          </td>
                          <th className="px-4 py-2 w-[200px] border border-gray-300 col-span-3">
                            {items && items.attributingFactor}
                          </th>
                          <td className="px-4 py-2 border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                            CWE #
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            {items && items.cwe}
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            open
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border border-gray-300">
                            1
                          </td>
                          <td className="px-4 py-2 border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                            Brief Description
                          </td>
                          <td
                            colSpan={6}
                            className="px-4 py-2 border h-20 border-gray-300 col-span-6"
                          >
                            {items && items.brief}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-4 text-blue-500 bg-blue-100 py-2 border  border-gray-300"
                            colSpan={2}
                          >
                            Affected Path
                          </td>
                          <td
                            colSpan={6}
                            className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                          >
                            {items && items.affectedUrl}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-4 text-blue-500 bg-blue-100 py-2 border border-gray-300"
                            colSpan={2}
                          >
                            Observation
                          </td>
                          <td
                            colSpan={6}
                            className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                          >
                            {items && items.observation}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-4 text-blue-500 bg-blue-100 py-2 border border-gray-300"
                            colSpan={2}
                          >
                            Impact
                          </td>
                          <td
                            colSpan={6}
                            className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                          >
                            {items && items.impact}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                            colSpan={2}
                          >
                            Mitigations
                          </td>
                          <td
                            colSpan={6}
                            className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                          >
                            {items && items.mitigation}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h6 className="mx-2 bold ">Screenshots</h6>
                    {items &&
                      items.files.map((it) => (
                        <div className="m-5  ">
                          <img
                            className=" w-500 h-auto"
                            src={`http://localhost:5000/files/${it}`}
                            alt={`Image ${it}`}
                          />
                        </div>
                      ))}
                  </div>
                </>
              ))
            ) : (
              <div>Loading...</div>
            )} */}
            {/* {report &&
              report.map((items) => (
                <div class="flex  m-auto mt-10  flex-col w-[1000px] ">
                  <table
                    id="my-table"
                    className="table-auto border border-collapse border-gray-300"
                  >
                    <tbody>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 w-10 border border-gray-300">
                          #
                        </th>
                        <th className="px-4 py-2 w-[200px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          Vulnerability
                        </th>
                        <th className="px-4 py-2 w-[200px] border border-gray-300 col-span-3">
                          {items && items.vulnerability}
                        </th>
                        <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          Risk
                        </th>
                        <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-orange-500 bg-orange-100">
                          {items && items.risk}
                        </th>
                        <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          Status
                        </th>
                      </tr>

                      <tr>
                        <td className="px-4 py-2 border border-gray-300"> </td>
                        <td className="px-4 py-2 border h-20 border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          Attributing Factor
                        </td>
                        <th className="px-4 py-2 w-[200px] border border-gray-300 col-span-3">
                          {items && items.attributingFactor}
                        </th>
                        <td className="px-4 py-2 border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          CWE #
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {items && items.cwe}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          open
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300">1</td>
                        <td className="px-4 py-2 border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                          Brief Description
                        </td>
                        <td
                          colSpan={6}
                          className="px-4 py-2 border h-20 border-gray-300 col-span-6"
                        >
                          {items && items.brief}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="px-4 text-blue-500 bg-blue-100 py-2 border  border-gray-300"
                          colSpan={2}
                        >
                          Affected Path
                        </td>
                        <td
                          colSpan={6}
                          className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                        >
                          {items && items.affectedUrl}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="px-4 text-blue-500 bg-blue-100 py-2 border border-gray-300"
                          colSpan={2}
                        >
                          Observation
                        </td>
                        <td
                          colSpan={6}
                          className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                        >
                          {items && items.observation}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="px-4 text-blue-500 bg-blue-100 py-2 border border-gray-300"
                          colSpan={2}
                        >
                          Impact
                        </td>
                        <td
                          colSpan={6}
                          className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                        >
                          {items && items.impact}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                          colSpan={2}
                        >
                          Mitigations
                        </td>
                        <td
                          colSpan={6}
                          className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                        >
                          {items && items.mitigation}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h6 className="mx-2 bold ">Screenshots</h6>
                  {items &&
                    items.files.map((it) => (
                      <div className="m-5  ">
                        <img
                          className=" w-500 h-auto"
                          src={`http://localhost:5000/files/${it}`}
                          alt={`Image ${it}`}
                        />
                      </div>
                    ))}
                </div>
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllReportForClient;
