import mongoose, { Schema } from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    selectedOptions: {
      type: [String],
      //  required: true,
    },
    taskName: {
      type: String,
    },
    webData: {
      webtargetUrls: [
        {
          lable: {
            type: String,
          },
          link: {
            type: String,
          },
          assignEmployee: [
            {
              employee: {
                type: Schema.Types.ObjectId,
                ref: "Employee",
              },
              report: [
                {
                  type: Schema.Types.ObjectId,
                  ref: "Report",
                },
              ],
            },
          ],
        },
      ],
      webotherRemarks: {
        type: String,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },

    networkData: {
      isCompleted: {
        type: Boolean,
        default: false,
      },
      networkfileUpload: {
        type: String,
      },
      networkotherRemarks: {
        type: String,
      },
      assignEmployee: [
        {
          employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
          },
          report: [
            {
              type: Schema.Types.ObjectId,
              ref: "Report",
            },
          ],
        },
      ],
    },
    apiData: {
      isCompleted: {
        type: Boolean,
        default: false,
      },
      apifile: {
        type: String,
      },
      apiotherRemarks: {
        type: String,
      },
      assignEmployee: [
        {
          employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
          },
          report: [
            {
              type: Schema.Types.ObjectId,
              ref: "Report",
            },
          ],
        },
      ],
    },
    mobileData: {
      isCompleted: {
        type: Boolean,
        default: false,
      },
      android: {
        type: String,
      },
      ios: {
        type: String,
      },
      mobileotherRemarks: {
        type: String,
      },

      forAndroid: {
        assignEmployee: [
          {
            employee: {
              type: Schema.Types.ObjectId,
              ref: "Employee",
            },
            report: [
              {
                type: Schema.Types.ObjectId,
                ref: "Report",
              },
            ],
          },
        ],
      },
      forIos: {
        isCompleted: {
          type: Boolean,
          default: false,
        },
        assignEmployee: [
          {
            employee: {
              type: Schema.Types.ObjectId,
              ref: "Employee",
            },
            report: [
              {
                type: Schema.Types.ObjectId,
                ref: "Report",
              },
            ],
          },
        ],
      },
    },
    grcData: {
      isCompleted: {
        type: Boolean,
        default: false,
      },
      grcotherRemarks: {
        type: String,
      },
      assignEmployee: [
        {
          employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
          },
          report: [
            {
              type: Schema.Types.ObjectId,
              ref: "Report",
            },
          ],
        },
      ],
    },

    submissionDate: {
      type: String,
      //required: true,
    },

    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
