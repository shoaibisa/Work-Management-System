import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    notification: {
      type: String,
      required: true,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    link: {
      type: String,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
