import mongoose from "mongoose";

const requestProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    excelFile: {
      filename: String,
      path: String,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    assigned: {
      type: Boolean,
      required: false,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },

  { timestamps: true }
);

export default mongoose.model("RequestProject", requestProjectSchema);
