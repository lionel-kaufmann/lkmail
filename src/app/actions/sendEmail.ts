"use server";

// 1. Strict typing for the API response to prevent 'unknown' errors
interface Smtp2goResponse {
  data?: {
    failures?: number;
  };
}

export async function sendEmail(prevState: any, formData: FormData) {
  // 2. Data extraction with basic sanitization (trimming whitespace)
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { error: "Please fill out all fields." };
  }

  // 3. Fail-fast check for the API key
  const apiKey = process.env.SMTP2GO_API_KEY;
  if (!apiKey) {
    console.error("Missing SMTP2GO_API_KEY environment variable.");
    return { error: "Server configuration error." };
  }

  try {
    // 4. Streamlined native fetch call
    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        to: ["info@lkmail.me"],
        sender: "info@lkmail.me",
        subject: `New message from ${name} via lkmail.me`,
        text_body: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        custom_headers: [{ header: "Reply-To", value: email }],
      }),
    });

    const data = (await response.json()) as Smtp2goResponse;

    // 5. Check both HTTP status and SMTP2GO's internal failure count
    if (!response.ok || (data.data?.failures && data.data.failures > 0)) {
      console.error("SMTP2GO API Error:", data);
      return { error: "Failed to send the message. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Execution Error:", error);
    return { error: "Network error. Please try again later." };
  }
}