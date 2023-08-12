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
    },

    networkData: {
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
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
