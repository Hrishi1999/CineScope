/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import mongoose from "mongoose";
import nodemailer from "nodemailer";

const Schema = mongoose.Schema;

const user = new Schema({
  email: String,
  password: String,
  userName: String,
  genres: [String],
  dob: Date,
  about: String,
});

interface Data {
  email: String;
  password: String;
  userName: String;
  genres: string[];
  dob: Date;
  about: String;
}

const User = mongoose.model("User", user);

export function getUserById(id: String) {
  if (id === undefined) {
    throw "Oi! You forgot to pass an id!";
  }

  const user = User.findById(id);
  return user;
}

export async function getUser(email: String) {
  if (email === undefined) {
    throw "Oi! You forgot to pass an email!";
  }
  const user = await User.findOne({ email: email });
  return user;
}

export async function getUserByUserName(userName: String) {
  if (userName === undefined) {
    throw "Oi! You forgot to pass a username!";
  }

  const user: any = await User.findOne({ userName: userName });
  if (user === null) {
    throw "User not found";
  } else {
    return {
      userName: user.userName,
      genres: user.genres ?? [],
      about: user.about,
      id: user._id,
    };
  }
}

export async function createUser(
  email: String,
  password: String,
  userName: String,
  genres: [String],
  about: String,
  dob: Date
) {
  if (
    email === undefined ||
    password === undefined ||
    userName === undefined ||
    genres === undefined ||
    dob === undefined ||
    about === undefined ||
    email === "" ||
    password === "" ||
    userName === "" ||
    about === ""
  ) {
    throw "Missing parameters";
  }

  const user = await getUser(email);
  if (user !== null) {
    throw "User already exists";
  }

  const newUser = new User({
    email: email,
    password: password,
    userName: userName,
    genres: genres,
    dob: dob,
    about: about,
  });
  try {
    const data = await newUser.save();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateUser(user: Data) {
  if (user.email === undefined) {
    throw "Oi! You forgot to pass an email!";
  }

  const usr = await User.find({ email: user.email }).updateOne(user);

  if (usr.matchedCount === 0) {
    throw "User not found";
  } else if (usr.modifiedCount > 0) {
    console.log("User updated");
    return { message: "User updated" };
  }

  return { message: "No changes to user" };
}

export async function deleteUser(userID: String) {
  if (userID === undefined) {
    throw "Oi! You forgot to pass the userID!";
  }

  const response = await User.findByIdAndDelete(userID);

  if (response === null) {
    throw "User not found";
  }
}

// reference: https://stackoverflow.com/a/48924916
export async function sendPasswordResetEmail(email: String) {
  if (email === undefined) {
    throw "Oi! You forgot to pass an email!";
  }

  const user = await getUser(email);
  if (user === null) {
    throw "User not found";
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const tempPass = Math.random().toString(36).slice(-8);

  const userData = {
    email: email,
    password: tempPass,
    userName: user.userName,
    genres: user.genres,
    dob: user.dob,
    about: user.about,
  } as Data;

  await updateUser(userData);

  const mailOptions: any = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    text:
      "Your password has been reset. Your new password is: " +
      tempPass +
      "\nMake sure to change it after logging in.",
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: "Password reset email sent successfully" };
  } catch (err) {
    throw err;
  }
}

export default mongoose.model("User", user);
