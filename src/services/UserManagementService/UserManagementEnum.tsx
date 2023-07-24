/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
export enum UserManagementState {
  UserRegistrationSuccess = "User Registered Successfully",
  UserAlreadyExists = "User already exists",
  UserRegistrationFailed = "User Registration Failed",
  UserLoginSuccess = "User Login Success",
  UserLoginFailedIncorrectPassword = "Incorrect password",
  UserLoginFailedUserDoesNotExist = "User not found",
  UserLoginFailed = "User Login Failed",
  UserUpdatedSuccess = "User Updated Successfully",
  UserUpdatedFailed = "User Update Failed",
  UserDeletedSuccess = "User Deleted Successfully",
  UserDeletedFailed = "User Delete Failed",
  PasswordResetSuccess = "Password Reset Successfully",
  PasswordResetFailedUserDoesNotExist = "User not found",
  PasswordResetFailed = "Password Reset Failed",
}
