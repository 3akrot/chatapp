import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res,next) => {
  try {
      console.log(req.headers.authorization)
    const token = req.headers.authorization?.split(" ")[1];
    if (!Boolean(token)) return res.status(401).json({ message: "no token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)return res.status(401).json({ message: "invalid token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user)return res.status(401).json({ message: "user not found" });

    req.user = user;
    next();

  } catch (e) {
    console.log("error in protect route", e.message);
    res.status(400).json({ message: "internal server error" });
  }
};
