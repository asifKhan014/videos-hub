import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username?: string;
  email: string;
  password: string;
  token?: string;
  uploadCount: number;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String
    },
    uploadCount: {
      type: Number,
      default: 0
    },
    downloadCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const User : mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;