import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import { SingleViewReport } from "../../../actions/reportSubmit";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "jspdf-autotable";
import { EyeIcon } from "@heroicons/react/20/solid";
function PDF() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const singleReportView = useSelector((state) => state.singleReportView);
  const { report } = singleReportView;
  const { data } = report;
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  }
  useEffect(() => {
    dispatch(SingleViewReport(id));
  }, [dispatch, id]);

  // const downloadPDF = () => {
  //   const capture = document.querySelector(".actual-receipt");

  //   setLoader(true);
  //   html2canvas(capture).then((canvas) => {
  //     const imgData = canvas.toDataURL("img/png");

  //     const doc = new jsPDF("p", "mm", "a4", true);
  //     const componentWidth = doc.internal.pageSize.getWidth();
  //     const componentHeight = doc.internal.pageSize.getHeight();
  //     const scaleFactor = Math.min(
  //       componentWidth / canvas.width,
  //       componentHeight / canvas.height
  //     );

  //     doc.autoTable({
  //       html: "#my-table",
  //       theme: "grid", // Use the grid theme for the table
  //       styles: {
  //         // Custom styling for the table
  //         fontSize: 10,
  //         cellPadding: 2,
  //       },
  //       headStyles: {
  //         // Custom styles for the table header
  //         fillColor: "#DBEAFE",
  //         fontStyle: "bold",
  //         textColor: "black",
  //       },
  //       bodyStyles: {
  //         // Custom styles for the table body
  //         valign: "middle",
  //         halign: "center",
  //         fillColor: "#ffffff",
  //       },

  //       columnStyles: {
  //         // Custom styles for individual columns
  //         1: { fontStyle: "bold", fillColor: "#ebf8ff" },
  //         3: { fillColor: "#ebf8ff" },
  //         5: { fontStyle: "bold", fillColor: "#ebf8ff" },
  //         7: { fillColor: "#ebf8ff" },
  //       },

  //       // Rest of the code to add images to the PDF
  //     });

  //     const aspectRatio = canvas.width / canvas.height;
  //     //console.log(aspectRatio);
  //     data &&
  //       data.files.forEach((items, index) => {
  //         // if (index !== 0) {
  //         doc.addPage(); // Create a new page for each image (skip for the first image)
  //         //}

  //         // const imgWidth = canvas.width; // Adjust this value to set the image width in the PDF
  //         // const imgHeight = canvas.height; // Calculate the height to maintain the aspect ratio

  //         // const pageWidth = doc.internal.pageSize.getWidth();
  //         // const pageHeight = doc.internal.pageSize.getHeight();

  //         // const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
  //         // const imgx = (pageWidth - imgWidth * ratio) / 2;
  //         // const imgY = 0;
  //         // const xPosition = (pageWidth - imgWidth) / 2; // Center the image horizontally
  //         // const yPosition = 0; // Set a top margin of 20mm

  //         const imgWidth = 200; // Adjust this value to set the image width in the PDF
  //         const imgHeight = imgWidth / aspectRatio; // // Calculate the height to maintain the aspect ratio

  //         const pageWidth = doc.internal.pageSize.getWidth();
  //         const pageHeight = doc.internal.pageSize.getHeight();

  //         const xPosition = (pageWidth - imgWidth) / 2; // Center the image horizontally
  //         const yPosition = 20; // Set a top margin of 20mm

  //         // doc.addImage(
  //         //   `http://localhost:5000/files/${items}`,
  //         //   "PNG",
  //         //   imgx,
  //         //   imgY,
  //         //   imgWidth * ratio,
  //         //   imgHeight * ratio
  //         // );
  //         doc.addImage(
  //           `http://localhost:5000/files/${items}`,
  //           "JPEG",
  //           xPosition,
  //           yPosition,
  //           imgWidth,
  //           imgHeight
  //         );
  //       });

  //     // Rest of the code to add images to the PDF remains unchanged
  //     setLoader(false);
  //     doc.save("receipt.pdf");
  //   });
  // };

  const PrintButton = () => {
    window.print();
  };
  console.log(data && data.reportFiles);

  return (
    <div className="wrapper">
      <div className="receipt-box">
        {/* actual receipt */}
        <div className="actual-receipt">
          <div className="mt-12   ">
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
              <h1 className=" text-center  bold text-2xl ">Report</h1>
            </div>

            <div className="flex section2  m-auto mt-10 flex-row w-[1000px] mb-20">
              {data &&
                !data.vulnerability &&
                data.reportFiles.map((fileName, index) => (
                  <div
                    key={index}
                    className=" w-[150px] h-80px]   bg-indigo-600 mx-5  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <button className="  btn btn-primary m-auto flex justify-center pt-5 pb-5">
                      <EyeIcon className="w-5 my-2 text-white" />
                      <a
                        className="receipt-modal-download-button rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        href={
                          data && data.reportFiles
                            ? `http://localhost:5000/files/${fileName}`
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Reports
                      </a>
                    </button>
                  </div>
                ))}
            </div>

            {data && data.vulnerability ? (
              <div class="flex section2  m-auto mt-10 flex-col w-[1000px]">
                <table
                  id="my-table"
                  className="table-auto border border-collapse border-gray-300 mt-5"
                >
                  {/* <thead> */}
                  <tbody>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 w-10 border border-gray-300">
                        #
                      </th>
                      <th className="px-4 py-2 w-[200px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                        Vulnerability
                      </th>
                      <th className="px-4 py-2 w-[200px] border border-gray-300 col-span-3">
                        {data && data.vulnerability}
                      </th>
                      <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                        Risk
                      </th>
                      <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-orange-500 bg-orange-100">
                        {data && data.risk}
                      </th>
                      <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                        Status
                      </th>
                    </tr>
                    {/* </thead> */}

                    <tr>
                      <td className="px-4 py-2 border border-gray-300"> </td>
                      <td className="px-4 py-2 border h-20 border-gray-300 font-semibold text-blue-500 bg-blue-100">
                        Attributing Factor
                      </td>
                      <th className="px-4 py-2 w-[200px] border border-gray-300 col-span-3">
                        {data && data.attributingFactor}
                      </th>
                      <td className="px-4 py-2 border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                        CWE #
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {data && data.cwe}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">open</td>
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
                        {data && data.brief}
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
                        {data && data.affectedUrl}
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
                        {data && data.observation}
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
                        {data && data.impact}
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
                        {data && data.mitigation}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {data &&
                  data.files.map((items) => (
                    <div className="m-5">
                      <img
                        className=" w-500 h-auto"
                        src={`http://localhost:5000/files/${items}`}
                        alt={`Image ${items}`}
                      />
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PDF;
