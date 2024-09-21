import UserAuthModel from "../models/userAuthModel.js";
import auth from "../helper/auth.js";
import hash from "../helper/hash.js";
import adminToEmpEmailService from "../helper/emailAdminToEmp.js";
import userToAdminEmailService from "../helper/emailUserToAdmin.js";

const login = async (req, res) => {
  try {
    debugger;
    const { email, password, isGhost } = req.body;
    const user = await UserAuthModel.findOne({ email: email });
    if (user) {
      let isPasswordValid = "";
      if (password) {
        isPasswordValid = await hash.hashCompare(password, user.password);
      }
      if (isGhost || isPasswordValid) {
        const loginToken = await auth.createLoginToken({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isLoggedIn: user.isLoggedIn,
          isAdmin: user.isAdmin,
        });
        await UserAuthModel.findOneAndUpdate(
          { email: email },
          { $set: { isLoggedIn: true } }
        );
        res.status(200).send({
          message: "Login Successful",
          loginToken,
          // id:user._id,
          // isAdmin : user.isAdmin
        });
      } else {
        res.status(400).send({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).send({
        message: "Email Not Found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in fetching email",
    });
  }
};

const registerAsGhost = async (req, res) => {
  try {
    const currentTimestamp = Date.now();
    const newUser = new UserAuthModel({
      firstName: "Ghost_",
      lastName: currentTimestamp,
      email: `ghost_${currentTimestamp}@ghost.com`,
      password: "ghost123",
      isGhost: true,
    });
    newUser.save({ validateBeforeSave: false });
    res.status(200).send({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in fetching email",
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUserEmail = await UserAuthModel.findOne({ email: email });
    if (!checkUserEmail) {
      req.body.password = await hash.createHash(password);
      const newUser = await UserAuthModel.create(req.body);
      res.status(200).send({
        message: "User created successfully",
        newUser,
      });
    } else {
      res.status(400).send({
        message: `User with ${req.body.email} already exists`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in fetching email",
    });
  }
};

const logout = async (req, res) => {
  try {
    const user = await UserAuthModel.findOne({ _id: req.params.id });
    if (user) {
      let logout = await UserAuthModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { isLoggedIn: false } },
        { new: true }
      );
      res.status(200).send({
        message: "Logged Out Successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in logging out",
    });
  }
};

const contact = async (req, res) => {
  try {
    const { userName, email, mobile, description } = req.body;
    res.status(200).send({
      message: "Thanks for Contacting us, We will revert you back!!!",
    });
    await adminToEmpEmailService(userName, email, mobile, description);
    await userToAdminEmailService(email);
  } catch (error) {
    res.status(500).send({
      message: "Internal server error in sending your query",
    });
  }
};

export default {
  login,
  register,
  registerAsGhost,
  logout,
  contact,
};
