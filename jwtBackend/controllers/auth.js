const AuthSchema = require("../models/Auth");
exports.register = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let payload = {
      username,
      email,
      password,
    };

    let user = await AuthSchema.create(payload);
    //! generation of token starts here
    let token = user.getJWTtoken();
    //! generation of token ends here
    res.status(201).json({ message: "succesfull", token });
  } catch (error) {
    res.status(501).json("server error");
  }
};
exports.Login = async (req, res) => {
  let { email, password } = req.body;

  let user = await AuthSchema.findOne({ email }).select("+password");
  //  res.status(201).json({ message: "succesfull", token });
  let token = user.getJWTtoken();
  if (!email || !password) {
    return res.status(400).json({ message: "email and password required" });
  }

  if (!user) {
    return res.status(401).json({
      message: "user not exist",
    });
  }
  res.status(201).json({ message: "succesfully login", user, token });
};

exports.getMe = async (req, res, next) => {
  try {
    let user = await AuthSchema.findById(req.user.id);
    res.status(200).json({ message: "succesfully fetched", user });
  } catch (error) {
    return res.status(501).json({ message: "SERVER ERROR" });
  }
};
