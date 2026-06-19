import mongoose, { Schema, models, model } from "mongoose";

const FieldSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    options: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const FormSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Untitled Form",
    },

    description: {
      type: String,
      default: "",
    },

    fields: {
      type: [FieldSchema],
      default: [],
    },

    views: {
      type: Number,
      default: 0,
    },

    submissionsCount: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Form = models.Form || model("Form", FormSchema);

export default Form;