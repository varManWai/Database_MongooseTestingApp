import { Schema, model, models } from "mongoose";

const studentSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Student = models.Student || model("Student", studentSchema);

export default Student;
