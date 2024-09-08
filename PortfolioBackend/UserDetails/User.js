const userData = require("../modal/userModel");
const nodemailer = require("nodemailer");
const user = async (req, res) => {
  try {
    const { email, name, message } = req.body;
    const userEntry = await userData.findOne({ email });
    if (userEntry) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    res.status(200).json({ success: true });
    const data = new userData({ name, email, message });
    await data.save();


  } catch (error) {
    res.status(500).json("internal server error");
  }
};
const data = {
  name: "Aakash",
  email: "abc@gmail.com",
  message: "Hi ,Whatsapp kya haal hai",
};
const example = async (res, req) => {
  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: "sparrow7283@gmail.com",
      pass: "ebufackiaattktrl",
    },
  });
  const receiver = {
    from: "sparrow7283@gmail.com",
    to: "aakashk7405@gmail.com",
    subject: "Nodemailer Testing",
    text: `name: ${data.name}\nemail: ${data.email}\nmessage: ${data.message}`,
  };

  auth.sendMail(receiver, (error, emailResponse) => {
    if (error) {
      return error;
    }
    return res.status(200).json("success");
  });
};
module.exports = { user, example };
