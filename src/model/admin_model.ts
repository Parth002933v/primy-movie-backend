import { Document, model, Schema } from "mongoose";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

interface IAdmin extends Document {
  email: string;
  password: string;
  refreshToken?: string;

  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  GenerateRefreshToken(): string;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (this: IAdmin, next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.isPasswordCorrect = async function (
  this: IAdmin,
  password: string
) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function (this: IAdmin): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    `${process.env.ACCESS_TOKEN_SECRET}`,
    {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}`,
    }
  );
};
adminSchema.methods.GenerateRefreshToken = function (this: IAdmin): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    `${process.env.REFRESH_TOKEN_SECRET}`,
    {
      expiresIn: `${process.env.REFRESH_TOKEN_EXPIRY}`,
    }
  );
};

const AdminModel = model<IAdmin>("admin", adminSchema);

export { IAdmin, AdminModel };
