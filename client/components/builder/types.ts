export type FieldType =
  | "text"
  | "email"
  | "number"
  | "textarea"
  | "dropdown"
  | "checkbox"
  | "radio"
  | "date";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}