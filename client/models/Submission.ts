import mongoose, { Schema, models, model } from "mongoose";

const SubmissionSchema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    answers: {
      type: Map,
      of: Schema.Types.Mixed,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = models.Submission || model("Submission", SubmissionSchema);

export default Submission;
