import {User} from '../Models/userModel.js'
import bcrypt from 'bcrypt'

const saltRounds = 10;
export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    console.log(existingUser);
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }
    console.log(existingUser);

    let hashedPass = await bcrypt.hash(password, saltRounds);
    let newUser = await User.create({ username, password: hashedPass });

    return res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send({ err });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let correct = await bcrypt.compare(password, user.password);
    if (!correct) {
      return res.status(401).json({ message: "Invalid password" });
    }
    return res.status(200).json({ message: "Sign-in successful" });
  } catch (err) {
    res.status(500).send({ err });
  }
};

export const forgotpassword = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let hashedPass = await bcrypt.hash(password, saltRounds);
    user.password = hashedPass;
    await user.save();
    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).send({ err });
  }
};
