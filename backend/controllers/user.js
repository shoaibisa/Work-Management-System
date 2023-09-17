import Employee from "../models/employee.js";
import Project from "../models/project.js";

const statusToggle = async function (req, res) {
  try {
    const { status, id } = req.body;

    const result = await Employee.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true }
    );

    if (!result) {
      return res.status(422).json({ error: "Can't update status" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const roleSet = async (req, res) => {
  const { role, id } = req.body;
  //   console.log(role, id);
  try {
    const result = await Employee.findByIdAndUpdate(
      id,
      { $set: { role: role } },
      { new: true }
    );

    if (!result) {
      return res
        .status(422)
        .json({ isError: false, error: "Can't update role" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({ isError: true, error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const employee = await Employee.findById(id).exec();
    if (!employee) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This email is not registered. Redirecting to Signup page!",
      });
    }
    return res.status(200).send({
      // name: employee.name,
      // email: employee.email,
      // phone: employee.phone,
      // department: employee.department,
      // isError: false,
      data: employee,
    });
  } catch (error) {
    return res.status(500);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const employees = await Employee.find({}).exec();
    console.log(employees);
    if (!employees) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "No employee found",
      });
    }
    return res.status(200).send({
      employees: employees,
      isError: false,
    });
  } catch (error) {
    return res.status(500);
  }
};

//   const { id } = req.body;
//   //console.log(id);
//   try {
//     const employee = await Employee.findById(id).exec();

//     if (!employee) {
//       return res.status(208).send({
//         isError: true,
//         title: "Error",
//         message: "This email is not registered. Redirecting to Signup page!",
//       });

//       return res.status(200).send({
//         employee: employee,
//         isError: false,
//       });
//       console.log(employee);
//     }
//   } catch (error) {
//     return res.status(500);
//   }
// };

const getManagerById = async (req, res) => {
  const { id } = req.body;
  //console.log(id);
  try {
    const employee = await Employee.findById(id).exec();

    if (!employee) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This email is not registered. Redirecting to Signup page!",
      });
    }

    // This should be outside the if block
    console.log(employee);

    return res.status(200).send({
      employee: employee,
      isError: false,
    });
  } catch (error) {
    return res.status(500).send({
      isError: true,
      title: "Error",
      message: "An error occurred while fetching manager details.",
    });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.body;
  // console.log(id);

  const employee = await Employee.findById(id)
    .populate("managerProjects")
    .populate("profileImage")
    .exec();
  console.log(employee);
  if (!employee) {
    return res.status(208).send({
      isError: true,
      title: "Error",
      message: "This email is not registered. Redirecting to Signup page!",
    });
  }

  return res.status(200).send({
    employee: employee,
    isError: false,
  });
};

const getEmployeeByDepartment = async (req, res) => {
  try {
    const employees = await Employee.find({
      role: "Employee",
      isVerified: true,
      status: true,
    }).exec();

    // console.log(employees);
    return res.status(200).send({
      employees: employees,
      isError: false,
    });
  } catch (error) {
    return res.status(500);
  }
};

const getEmployeeTask = async (req, res) => {
  //console.log(req.body);
  try {
    const employee = await Employee.findById(req.user._id)
      .populate("tasks.taskid")
      .exec();

    var tasks = employee.tasks;
    const final_tasks = [];
    // get project manager name
    for (const i of tasks) {
      const project = await Project.findById(i.taskid.project)
        .populate("manager")
        .exec();
      const task_val = {
        tasks: i,
        manager: project.manager.name,
      };
      final_tasks.push(task_val);
    }
    // console.log(final_tasks);
    return res.status(200).send({
      datas: final_tasks,
      isError: false,
    });
  } catch (error) {
    return res.status(500);
  }
};
const getEmployeeTaskId = async (req, res) => {
  const { id } = req.body;
  try {
    const employee = await Employee.findById(id)
      .populate("tasks.taskid")
      .exec();

    var tasks = employee.tasks;
    const final_tasks = [];
    // get project manager name
    for (const i of tasks) {
      const project = await Project.findById(i.taskid.project)
        .populate("manager")
        .exec();
      const task_val = {
        tasks: i,
        manager: project.manager.name,
      };
      final_tasks.push(task_val);
    }
    // console.log(final_tasks);
    return res.status(200).send({
      datas: final_tasks,
      isError: false,
    });
  } catch (error) {
    return res.status(500);
  }
};

const getEmployeeReport = async (req, res) => {
  //console.log(req.body);
  try {
    const employee = await Employee.findById(req.user._id)
      .populate("tasks.taskid")
      .exec();

    return res.status(200).send({
      datas: employee.tasks,
      isError: false,
    });
  } catch (error) {
    return res.status(500);
  }
};

const listOfManagers = async (req, res) => {
  try {
    const managers = await Employee.find({ role: "Project Manager" }).exec();
    // console.log(managers);
    return res.status(200).send({
      managers: managers,
      isError: false,
    });
  } catch (error) {
    return res.status(500);
  }
};

const listOfEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ role: "Employee" }).exec();

    return res.status(200).send({
      employees: employees,
      isError: false,
    });
  } catch (error) {
    return res.status(500);
  }
};

const listOfClients = async (req, res) => {
  try {
    const clients = await Employee.find({ role: "Client" }).exec();

    return res.status(200).send({
      clients: clients,
      isError: false,
    });
  } catch (error) {
    return res.status(500);
  }
};

export {
  statusToggle,
  roleSet,
  getUserById,
  getAllUsers,
  getEmployeeByDepartment,
  getEmployeeTask,
  getEmployeeReport,
  listOfManagers,
  listOfEmployees,
  getEmployeeById,
  getManagerById,
  listOfClients,
  getEmployeeTaskId,
};
