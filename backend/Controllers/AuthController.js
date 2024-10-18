const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({
              message: 'Email and password are required',
              success: false
          });
      }
      
      console.log("Received email: ", email);
      
      const user = await UserModel.findOne({ email });
      console.log("User found: ", user);

      const errorMsg = 'Auth failed email or password is wrong';
      
      if (!user) {
          return res.status(403)
              .json({ message: errorMsg, success: false });
      }
      
      const isPassEqual = await bcrypt.compare(password, user.password);
      console.log("Password match: ", isPassEqual);
      
      if (!isPassEqual) {
          return res.status(403)
              .json({ message: errorMsg, success: false });
      }

      if (!process.env.JWT_SECRET) {
          console.error("JWT_SECRET is missing");
          return res.status(500).json({
              message: "Internal server error - Missing JWT Secret",
              success: false
          });
      }

      const jwtToken = jwt.sign(
          { email: user.email, _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
      );
      
      console.log("JWT Token generated: ", jwtToken);
      
      res.status(200)
          .json({
              message: "Login Success",
              success: true,
              jwtToken,
              email,
              name: user.name
          });
  } catch (err) {
      console.error("Error during login: ", err); // Log the error for debugging
      res.status(500)
          .json({
              message: "Internal server error",
              success: false
          });
  }
};


module.exports = {
    signup,
    login
}