import ConnectDB, { base } from "@/DB/connectDB";
import Joi from "joi";
import { hash } from "bcryptjs";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required(),
});

const Register = async (req, res) => {
  await ConnectDB();

  const { email, password, name } = req.body;
  const { error } = schema.validate({ email, password, name });

  if (error)
    return res.status(401).json({
      success: false,
      message: error.details[0].message.replace(/['"]+/g, ""),
    });

  try {
    // Check if the user already exists in Airtable
    const ifExist = await base("Users")
      .select({
        filterByFormula: `{email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (ifExist && ifExist.length > 0) {
      return res
        .status(406)
        .json({ success: false, message: "User Already Exist" });
    } else {
      const hashedPassword = await hash(password, 12);
      // Create a new record in Airtable
      await base("Users").create({
        email,
        name,
        password: hashedPassword, // Note: Storing passwords in plain text is not recommended. Consider using a secure method.
      });
      return res
        .status(201)
        .json({ success: true, message: "Account created successfully" });
    }
  } catch (error) {
    console.log("Error in register (server) => ", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong Please Retry Later !",
    });
  }
};

export default Register;
