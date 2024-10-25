const nodemailer = require("nodemailer");

const SendContactEmail = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        secure: true,
        port: 465,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting us!",
      text: `Hi ${name},\n\nThank you for reaching out to us! We appreciate your message and will respond as soon as possible.
            \n\nYour Message: ${message}\n\nIn the meantime, feel free to browse our latest collections and exclusive offers.\n\nWarm regards,\nFashionOrbit Team`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Hi ${name},</h2>
            <p>Thank you for getting in touch with <b>FashionOrbit</b>! We have received your message and our team will respond to you soon.</p>
            <p><strong>Your Message:</strong><br/> ${message}</p>
            
            <p>While you wait, check out our <a href="http://localhost:3000/" style="color: #ff6600;">latest collections</a> and stay connected for updates on special offers.</p>
            <br/>
            <p>Best regards,<br/>The FashionOrbit Team</p>
        </div>
    `,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Email Send Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = SendContactEmail;
