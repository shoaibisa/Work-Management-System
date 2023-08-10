import React from "react";

function Pdftemplate() {
  return (
    <div className="  ">
      {/* first template  */}
      <div>
        <div class="flex mx-auto mt-10 flex-col w-[800px]">
          <table className="table-auto border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 w-10 border border-gray-300">#</th>
                <th className="px-4 py-2 w-[200px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                  Vulnerability
                </th>
                <th className="px-4 py-2 w-[200px] border border-gray-300 col-span-3"></th>
                <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                  Risk
                </th>
                <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-orange-500 bg-orange-100">
                  Critical
                </th>
                <th className="px-4 py-2 w-[150px] border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300"> </td>
                <td className="px-4 py-2 border h-20 border-gray-300 font-semibold text-blue-500 bg-blue-100">
                  Attributing Factor
                </td>
                <th className="px-4 py-2 w-[200px] border border-gray-300 col-span-3"></th>
                <td className="px-4 py-2 border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                  CWE #
                </td>
                <td className="px-4 py-2 border border-gray-300"></td>
                <td className="px-4 py-2 border border-gray-300"></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">1</td>
                <td className="px-4 py-2 border border-gray-300 font-semibold text-blue-500 bg-blue-100">
                  Brief Description
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border h-20 border-gray-300 col-span-6"
                ></td>
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
                ></td>
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
                ></td>
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
                ></td>
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
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* second template  */}
      <div className=" my-24 ">
        {" "}
        <div className=" text-xl ml-60 font font-semibold text-black ">
          Control Page
        </div>
        <div class="flex mx-auto mt-10 flex-col w-[800px]">
          <table className="table-auto border border-collapse border-gray-300">
            <tbody>

              <tr>
                <td
                  className="px-4 w-[30%] text-blue-500 bg-blue-100 py-2 border  border-gray-300"
                  colSpan={2}
                >
                 ReportID
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 text-blue-500 bg-blue-100 py-2 border border-gray-300"
                  colSpan={2}
                >
                  Report Type
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 text-blue-500 bg-blue-100 py-2 border border-gray-300"
                  colSpan={2}
                >
                  Document Type
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                  Client Name
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                  Project Name/ID
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                 Test Enviourment
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                  Test Method
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                  Web Application Verson Number / Build Number
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                 Refrence Document / Base Document
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                 Report Date
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                  Test Start Date
                </td>
                <td
                  colSpan={4}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={1}
                >
                  Test End Date
                </td>
                <td
                  colSpan={4}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                 Testing Performed By
                </td>
                <td
                  colSpan={6}
                  className="px-4 py-2 border border-gray-300 h-20 col-span-6"
                ></td>
              </tr>

              <tr>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                 Report Author
                </td>
                <td
                  colSpan={3}
                  className="px-4 py-2 border  text-blue-500 bg-blue-100 border-gray-300 h-20 col-span-6"
                ></td>
                <td
                  className="px-4 py-2 text-blue-500 bg-blue-100 border border-gray-300"
                  colSpan={4}
                >
                 Date
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pdftemplate;
