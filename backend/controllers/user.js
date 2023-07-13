import Employee from "../models/employee.js";

const statusToggle = function (req, res) {
  const { status, id } = req.body;
  Employee.findByIdAndUpdate(
    id,
    { $set: { isVerified: status } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "can't update status" });
      }
      res.json(result);
    }
  );
};

const roleSet = (req, res) => {
  const { role, id } = req.body;
  Employee.findByIdAndUpdate(
    id,
    { $set: { role: role } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "can't update role" });
      }
      res.json(result);
    }
  );
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
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      isError: false,
    });
  } catch (error) {
    return res.status(500);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const employees = await Employee.find({}).exec();
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

export { statusToggle, roleSet, getUserById, getAllUsers };
