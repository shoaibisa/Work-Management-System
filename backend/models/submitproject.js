import mongoose from "mongoose";

const submitProjectSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    files: [
      {
        filename: String,
        contentType: String,
        data: Buffer,
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
  },
  { timestamps: true }
);

export default mongoose.model("SubmitProject", submitProjectSchema);
