"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill out all fields." };
  }

  try {
    await resend.emails.send({
      // 1. MUST send FROM your verified domain so Resend allows it
      from: "lkmail.me Contact <contact@lead.mercury-strategy.com>", 
      
      // 2. Send TO whatever inbox you actually check (Gmail, lkmail, etc.)
      to: "info@lkmail.me", 
      
      subject: `New message from ${name} via lkmail.me`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      
      // 3. This is the magic part: When you click "Reply" in your inbox, 
      // it will reply directly to the person who filled out the form!
      replyTo: email, 
    });

    return { success: true };
  } catch (error) {
    console.error("Resend Error:", error);
    return { error: "Failed to send the message. Please try again." };
  }
}