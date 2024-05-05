import ConnectDB, { base } from "@/DB/connectDB";
import User from "@/models/User";
import Joi from "joi";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const LoginComponent = async (req, res) => {
  await ConnectDB();

  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });

  console.log("req.body");
  console.log(req.body);

  if (error)
    return res.status(401).json({
      success: false,
      message: error.details[0].message.replace(/['"]+/g, ""),
    });

  try {
    const userRecords = await base("Users")
      .select({
        filterByFormula: `{email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (userRecords.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Account not Found" });
    }

    const user = userRecords[0].fields;

    console.log("**** user ****", user);

    const isMatch = await compare(password, user?.password);
    console.log("isMatch = ", isMatch);
    console.log("**** password, user?.password ****");

    console.log(password, user?.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const finalData = { token, user };
    return res
      .status(200)
      .json({ success: true, message: "Login Successful", finalData });
  } catch (error) {
    console.log("Error in register (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong Please Retry Later !",
    });
  }
};

export default LoginComponent;
