import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    vulnerability: {
      type: String,
    },
    risk: String,
    affectedUrl: String,
    observation: String,
    attributingFactor: String,
    cwe: String,
    impact: String,
    mitigation: String,
    brief: String,
    files: [
      {
        type: String,
      },
    ],
    remarks: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
        },
        remark: {
          type: String,
        },
      },
    ],

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
