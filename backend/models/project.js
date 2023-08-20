import mongoose, { Schema } from "mongoose";
const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    selectedOptions: {
      type: [String],
      required: true,
    },

    projectPriority: {
      type: String,
      required: true,
    },
    submissionDate: {
      type: String,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    task: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
