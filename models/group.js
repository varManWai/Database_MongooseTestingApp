import { Schema, model, models } from "mongoose";

const groupSchema = new Schema({
  groupName: {
    type:String,
    required: true
  },
  desc: {
    type: String,
    required: true,
  },
});

const Student = models.Student || model("Student", groupSchema);

export default Student;
