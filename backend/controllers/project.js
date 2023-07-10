import { validationResult } from "express-validator";
import Project from "../models/project.js";

const abc = async (req, res) => {
  console.log(req.body);
};

const createProject = async (req, res) => {
  const projectData = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({
      title: "Error",
      message: errors.array(),
      isError: true,
    });
  }
  const project = new Project(projectData);
  console.log(project);

  project
    .save()
    .then(() => {
      console.log("Project  save to db!");
      return res.status(200).send({
        title: "Success",
        message: "Redirecting to gmail in 3s...",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        isError: true,
        title: "Error",
        message: err,
      });
    });
};
export { abc, createProject };
