import mongoose from "mongoose";
const userschema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "admin","recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginamName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilephoto: {
        type: String,
        default: "",
      },
    },
  },
  {
     timeseries: true,
  }
);
const User = mongoose.model("User", userschema);
export default User;
