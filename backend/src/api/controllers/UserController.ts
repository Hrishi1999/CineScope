/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  getUserByUserName,
  sendPasswordResetEmail,
  updateUser,
} from "../models/User";

const UserController = {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await getUser(username);
      if (user === null) {
        res.status(404).json({ message: "User not found" });
      } else {
        if (user.password === password) {
          res.json(user);
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      }
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async getUserByID(req: Request, res: Response) {
    const id = req.params.userId;
    try {
      const user = await getUserById(id);
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async getUserByUserName(req: Request, res: Response) {
    const username = req.params.userName;
    try {
      const user = await getUserByUserName(username);
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async createUser(req: Request, res: Response) {
    const { email, password, userName, genres, about, dob } = req.body;

    try {
      const user = await createUser(
        email,
        password,
        userName,
        genres,
        about,
        dob
      );
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const { email, password, userName, genres, dob, about } = req.body;
      const user = await updateUser({
        email,
        password,
        userName,
        genres,
        dob,
        about,
      });
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const id = req.params.userId;
    try {
      const user = await deleteUser(id);
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async sendPasswordResetEmail(req: Request, res: Response) {
    const email: any = req.query.email;
    if (email === undefined) {
      res
        .status(400)
        .json({ message: "Oi! Please pass an email address as query" });
    }
    try {
      const user = await sendPasswordResetEmail(email);
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },
};

export default UserController;
