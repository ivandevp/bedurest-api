const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No tiene request body" });
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no existe " });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isCorrectPassword) {
      return res
        .status(400)
        .json({ error: "Usuario y/o contraseña incorrecta" });
    }

    const { password: hashedPassword, ...user } = existingUser.toObject();
    const token = jwt.sign(
      { email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({ data: { ...user, token } });
  } catch (error) {
    console.error("LOGIN", error);
    res.status(500).json({ error: "Algo malo sucedió 😞" });
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { email, password, name, image, isAdmin } = req.body;

    const encryptedPassword = await bcrypt.hash(
      password,
      Number(process.env.HASH_SALT) || 10
    );

    const user = new User({
      email,
      password: encryptedPassword,
      name,
      image,
      isAdmin,
    });
    const savedUser = user.save();

    return res.status(201).json({ data: savedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Algo pasó 😞" });
  }
};
