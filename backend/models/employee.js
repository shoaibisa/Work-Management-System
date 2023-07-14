import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      maxLength: 10,
      trim: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "Employee",
    },
    department: {
      type: String,
    },
    assignedProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    submittedProjects: [
      {
        project: {
          type: Schema.Types.ObjectId,
          ref: "Project",
        },
        submitProject: {
          type: Schema.Types.ObjectId,
          ref: "SubmitProject",
        },
      },
    ],
    completedProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

const model = mongoose.model("Employee", employeeSchema);
export default model;
