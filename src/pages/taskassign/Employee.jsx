import { useEffect, useState } from "react";
import { userRows } from "../../employessdata";
import { Select, initTE } from "tw-elements";

const Employee = (props) => {
  const { departments } = props;
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    initTE({ Select });
    fetch(`http://localhost:5000/user/department`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmployee(data.employees);
        return data;
      });
  }, []);

  const optionelements = employee
    .filter((option) => {
      return departments.includes(option.department);
    })
    .map((option) => (
      <option
        className="flex justify-between"
        key={option._id}
        value={option._id}
      >
        {`ID.${option.userId} `}
        {` ${option.name}`}
      </option>
    ));

  //   console.log(optionelements);

  return (
    <div className="flex flex-col mx-5 mt-4">
      <select
        id="multiSelection"
        multiple
        data-te-select-init
        data-te-select-filter="true"
      >
        {optionelements}
      </select>
      <label data-te-select-label-ref>Select Employees</label>
    </div>
  );
};

export default Employee;
