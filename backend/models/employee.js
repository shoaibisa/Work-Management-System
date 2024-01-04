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
    profileImage: {
      type: String,
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
    },
    department: {
      type: String,
    },
    managerProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],

    tasks: [
      {
        taskid: {
          type: Schema.Types.ObjectId,
          ref: "Task",
        },
        assignedDate: {
          type: String,
        },
        selectedOption: {
          name: {
            type: String,
          },
          webtargetUrls: {
            type: String,
          },
        },
      },
    ],
    userToken: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    clientProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    excelFile: [
      {
        filename: String,
        path: String,
        status: { type: String, default: "unassigned" },
      },
    ],
  },

  { timestamps: true }
);

const model = mongoose.model("Employee", employeeSchema);
export default model;
