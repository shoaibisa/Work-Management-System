import { useEffect } from "react";
import { userRows } from "../../employessdata";
import { Select, initTE } from "tw-elements";

const Employee = (props) => {

    const { departments } = props;

  useEffect(() => {
    initTE({ Select });
  }, []);

 

  const optionelements = userRows
    .filter((option) => {
      return departments.includes(option.department);
    })
    .map((option) => (
      <option
        className="flex justify-between"
        key={option.id}
        value={option.id}
      >
        {`ID.${option.id} `}
        {` ${option.username}`}
      </option>
    ));

//   console.log(optionelements);

  return (
    <div class="flex flex-col mx-5 mt-4">
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
