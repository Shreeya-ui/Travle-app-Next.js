import { sendEmail } from "./sendEmails";

sendEmail("your-email@gmail.com", "Test Email", "welcome-email", { name: "Shreeya" })
  .then(() => console.log("✅ Email Sent!"))
  .catch((err) => console.error("🚨 Email Failed:", err));
