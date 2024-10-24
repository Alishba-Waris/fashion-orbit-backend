const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const signUp = async (req, res) => {
  console.log("::::::::");
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { _id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const logIn = async (req, res) => {
  const {email, password} = req.body;
  console.log("::::::::");

  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message: "User not found"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message: "Invalid Password"});
    }

    const payload = {user: {id: user._id}};
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1d"});
    res.json({ token, user: { _id: user._id, email: user.email, name: user.name } });

  } catch (error) {
    return res.status(500).json({message: "Server error"});
  }

};


const getUserInfo = async (req, res) => {
  const userId = req.params.id; 

  try {
    const user = await User.findById(userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      _id: user._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { signUp, logIn, getUserInfo };