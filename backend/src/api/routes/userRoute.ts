/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import { Router } from "express";
import userController from "../controllers/UserController";

const UserRoute = (): Router => {
  const router = Router();

  router.route("/").post(userController.createUser);

  router
    .route("/:userId")
    .get(userController.getUserByID)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

  router.route("/username/:userName").get(userController.getUserByUserName);

  router.route("/login").post(userController.login);
  router.route("/reset").post(userController.sendPasswordResetEmail);

  return router;
};

export default UserRoute;
