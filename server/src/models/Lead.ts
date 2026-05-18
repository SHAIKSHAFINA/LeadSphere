import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;

  status: "new" | "contacted" | "qualified" | "lost";

  source: "website" | "instagram" | "referral" | "linkedin";

  createdBy: mongoose.Types.ObjectId;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new",
    },

    source: {
      type: String,
      enum: ["website", "instagram", "referral", "linkedin"],
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model<ILead>("Lead", leadSchema);

export default Lead;