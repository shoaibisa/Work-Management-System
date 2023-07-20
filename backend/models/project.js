import mongoose, { Schema } from "mongoose";
const fileTypes = ["application/pdf", "application/vnd.ms-excel"];
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
    // webData: {
    //   webclientName: {
    //     type: String,
    //   },
    //   webcompanyName: {
    //     type: String,
    //   },
    //   webclientEmail: {
    //     type: String,
    //   },
    //   webtargetUrls: [
    //     {
    //       lable: {
    //         type: String,
    //       },
    //       link: {
    //         type: String,
    //       },
    //     },
    //   ],
    //   webotherRemarks: {
    //     type: String,
    //   },
    // },

    // networkData: {
    //   networkclientName: {
    //     type: String,
    //   },
    //   networkcompanyName: {
    //     type: String,
    //   },
    //   networkclientEmail: {
    //     type: String,
    //   },
    //   networkfileUpload: {
    //     type: String,
    //     // validate: {
    //     //   validator: function (value) {
    //     //     return fileTypes.includes(value);
    //     //   },
    //     //   message: "Invalid file format. Only PDF and Excel files are allowed.",
    //     // },
    //   },
    //   networkotherRemarks: {
    //     type: String,
    //   },
    // },
    // apiData: {
    //   apiclientName: {
    //     type: String,
    //   },
    //   apicompanyName: {
    //     type: String,
    //   },
    //   apiclientEmail: {
    //     type: String,
    //   },
    //   apifile: {
    //     type: String,
    //     // validate: {
    //     //   validator: function (value) {
    //     //     return fileTypes.includes(value);
    //     //   },
    //     //   message: "Invalid file format. Only PDF and Excel files are allowed.",
    //     // },
    //   },
    //   apiotherRemarks: {
    //     type: String,
    //   },
    // },
    // mobileData: {
    //   mobileclientName: {
    //     type: String,
    //   },
    //   mobilecompanyName: {
    //     type: String,
    //   },
    //   mobileclientEmail: {
    //     type: String,
    //   },
    //   android: {
    //     type: String,
    //   },
    //   ios: {
    //     type: String,
    //   },
    //   mobileData: {
    //     type: String,
    //   },
    // },
    // grcData: {
    //   grcclientName: {
    //     type: String,
    //   },
    //   grccompanyName: {
    //     type: String,
    //   },
    //   grcclientEmail: {
    //     type: String,
    //   },
    //   grcotherRemarks: {
    //     type: String,
    //   },
    // },
    createdBy: {
      type: Schema.Types.ObjectId,
      require: true,
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
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
