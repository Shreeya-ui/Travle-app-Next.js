import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const getEmailTemplate = (templateName: string, variables: { [key: string]: string }) => {
  const templatePath = path.join(process.cwd(), "app/emails/templates", `${templateName}.html`);
  let template = fs.readFileSync(templatePath, "utf-8");

  Object.keys(variables).forEach((key) => {
    template = template.replace(new RegExp(`{{${key}}}`, "g"), variables[key]);
  });

  return template;
};

export const sendEmail = async (to: string, subject: string, templateName: string, variables: { [key: string]: string }) => {
  try {
    console.log("📧 Preparing to send email...");

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Log SMTP Connection Test
    transporter.verify((error, success) => {
      if (error) {
        console.error("🚨 SMTP Connection Error:", error);
      } else {
        console.log("✅ SMTP Connection Successful");
      }
    });

    const htmlContent = getEmailTemplate(templateName, variables);

    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    console.log("📨 Sending email to:", to);
    
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully! Response:", info.response);
  } catch (error) {
    console.error("🚨 Error sending email:", error);
  }
};
