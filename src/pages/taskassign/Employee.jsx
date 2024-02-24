/* eslint-disable react/jsx-no-duplicate-props */
import { useEffect, useState } from "react";
import { Select, initTE, Input } from "tw-elements";

const Employee = (props) => {
  const { departments } = props;
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [hoursAssigned, setHoursAssigned] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/user/department", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.employees);
      });
  }, []);

  useEffect(() => {
    initTE({ Select, Input });
  }, [departments, employees, selectedEmployees, hoursAssigned]);

  const handleSelectEmployee = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) =>
      employees.find((emp) => emp._id === option.value)
    );
    // console.log(selectedValues._id);
    setSelectedEmployees(selectedValues);
  };

  // const handleSelectEmployee = (event) => {
  //   const selectedIds = Array.from(
  //     event.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   console.log(selectedIds);
  //   setSelectedEmployees(selectedIds);
  // };

  const handleAssignHours = (event, employee) => {
    const { value } = event.target;
    setHoursAssigned((prev) => ({ ...prev, [employee]: value }));
    // Update data with new hours assigned
    const updatedEmployees = selectedEmployees.map((emp) => {
      if (emp._id === employee) {
        return { id: emp._id, assignedHours: value };
      }
      // Retain existing hours data for other employees
      return { id: emp._id, assignedHours: hoursAssigned[emp._id] || 0 };
    });
    props.onDataUpdate(updatedEmployees);
  };

  // console.log(hoursAssigned);
  const optionElements = employees
    .filter((option) => departments.includes(option.department))
    .map((option) => (
      <option
        className="flex justify-between"
        key={option._id}
        value={option._id}
      >
        {`${option.name} (ID.${option.userId})`}
      </option>
    ));

  return (
    <div className="flex flex-col mx-5 mt-4">
      <select
        className="mb-6"
        id="multiSelection"
        multiple
        data-te-select-init
        data-te-select-filter="true"
        onChange={(e) => handleSelectEmployee(e)}
      >
        {optionElements}
      </select>
      <label data-te-select-label-ref>Select Employees</label>
      <div className="mt-10"> Assign No of Hours To Selected Employees</div>

      {selectedEmployees.map((employee, key) => (
        <div className="flex  mt-5" key={employee._id}>
          {employee.name} -
          <div
            className="relative justify-center -top-1 ml-2 w-[120px] mb-3"
            data-te-input-wrapper-init
          >
            <input
              type="Number"
              id={`assignHours-${employee._id}`}
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              onChange={(e) => handleAssignHours(e, employee._id)}
            />
            <label
              htmlFor={`exampleFormControlInputNumber-${key}`}
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Assign Hours
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Employee;
