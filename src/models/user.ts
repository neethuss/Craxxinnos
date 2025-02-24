import { Schema, model, models } from 'mongoose';

interface IUser {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  title: string;
  currentAddress: string;
  livedDuration: string;
  aboutYou: string;
  dob:string
}

const UserSchema = new Schema<IUser>({
  fullName: { type: String },
  email: { type: String, unique: true },
  mobileNumber: { type: String, unique: true },
  password: { type: String },
  title: { type: String },
  currentAddress: { type: String },
  livedDuration: { type: String },
  aboutYou: { type: String },
  dob:{type:String}
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;
