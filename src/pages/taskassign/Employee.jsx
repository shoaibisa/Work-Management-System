import { useEffect, useState } from "react";
import { Select, initTE, Input } from "tw-elements";

const Employee = (props) => {
  const { departments } = props;
  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setselectedEmployee] = useState([]);

  useEffect(() => {
    initTE({ Select, Input });
    fetch(`http://localhost:5000/user/department`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    },[])
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data.employees);
        return data;
      });
  }, []);
  const handleSelectdEmployee = (event) => {
    console.log("Employee selected is --- ",event.target.value)
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setselectedEmployee(selectedValues);
    props.onDataUpdate(selectedValues);
  };

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
        {` ${option.name}`}
        {`(ID.${option.userId} )`}
      </option>
    ));

  return (
    <div className="flex flex-col mx-5 mt-4">
      <select
        className=" mb-6 "
        id="multiSelection"
        multiple
        data-te-select-init
        data-te-select-filter="true"
        onChange={(e) => handleSelectdEmployee(e)}
      >
        {optionelements}
        {/* <div class="relative mb-3" data-te-input-wrapper-init>
          <input
            type="number"
            class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInputNumber"
            placeholder="Example label"
          />
          <label
            for="exampleFormControlInputNumber"
            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Hours{" "}
          </label>
        </div> */}
      </select>
      <label data-te-select-label-ref>Select Employees</label>
      <div className=" mt-5 ">Selected Employees</div>

      {selectedEmployee.map((e, key) => (
        <div className=" flex ">
          {e} -
          <div class="relative justify-center -top-1 ml-2   w-[120px] mb-3" data-te-input-wrapper-init>
            <input
              type="number"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInputNumber"
              placeholder="Example label"
            />
            <label
              for="exampleFormControlInputNumber"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
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
