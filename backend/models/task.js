import mongoose, { Schema } from "mongoose";
const fileTypes = ["application/pdf", "application/vnd.ms-excel"];
const taskSchema = new mongoose.Schema(
  {
    // projectName: {
    //   type: Schema.Types.ObjectId,
    //   // required: true,
    // },
    selectedOptions: {
      type: [String],
      //  required: true,
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
        },
      ],
      webotherRemarks: {
        type: String,
      },
    },

    networkData: {
      networkfileUpload: {
        type: String,
        // validate: {
        //   validator: function (value) {
        //     return fileTypes.includes(value);
        //   },
        //   message: "Invalid file format. Only PDF and Excel files are allowed.",
        // },
      },
      networkotherRemarks: {
        type: String,
      },
    },
    apiData: {
      apifile: {
        type: String,
        // validate: {
        //   validator: function (value) {
        //     return fileTypes.includes(value);
        //   },
        //   message: "Invalid file format. Only PDF and Excel files are allowed.",
        // },
      },
      apiotherRemarks: {
        type: String,
      },
    },
    mobileData: {
      android: {
        type: String,
      },
      ios: {
        type: String,
      },
      mobileData: {
        type: String,
      },
    },
    grcData: {
      grcotherRemarks: {
        type: String,
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    submissionDate: {
      type: String,
      //required: true,
    },
    submittedProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubmitProject",
      },
    ],
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
