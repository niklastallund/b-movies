import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const FormSchema = z.object({
  firstName: z.string().min(1, "Förnamn är obligatoriskt"),
  lastName: z.string().min(1, "Efternamn är obligatoriskt"),
  email: z.string().email("Ogiltig e-postadress"),
  phone: z.union([z.string().max(50), z.literal("")]).optional(),
  city: z.union([z.string().max(100), z.literal("")]).optional(),
  message: z
    .string()
    .min(1, "Meddelande är obligatoriskt")
    .max(2000, "Max 2000 tecken"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const values = await FormSchema.parseAsync(body);

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "karianne36@ethereal.email",
        pass: "EnTMMFfq8TeUdaf9aF",
      },
    });

    const mailOptions = {
      from: "karianne36@ethereal.email", // Specify a sender
      to: "karianne36@ethereal.email", // Specify the recipient
      subject: "New message from the website contact form",
      html: `
        <h2>Contact Inquiry</h2>
        <p><strong>Name:</strong> ${values.firstName} ${values.lastName}</p>
        <p><strong>Email:</strong> ${values.email}</p>
        <p><strong>Phone:</strong> ${values.phone}</p>
        <p><strong>City/Location:</strong> ${values.city}</p>
        <p><strong>Message:</strong></p>
        <p>${values.message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "The message has been sent!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Could not send the message." },
      { status: 500 }
    );
  }
}
