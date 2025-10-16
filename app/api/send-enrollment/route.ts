import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// This is the main handler for POST requests to /api/send-enrollment
export async function POST(request: Request) {
  try {
    // 0. VALIDATE SERVER-SIDE ENVIRONMENT VARIABLES
    // Note: Server-side variables should NOT have the NEXT_PUBLIC_ prefix.
    if (
      !process.env.NEXT_PUBLIC_EMAIL_SERVER_USER ||
      !process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD ||
      !process.env.NEXT_PUBLIC_EMAIL_TO
    ) {
      console.error("Missing environment variables for email configuration.");
      return NextResponse.json(
        { message: "Server configuration error: Unable to send email." },
        { status: 500 }
      );
    }

    // 1. PARSE FORM DATA
    const formData = await request.formData();

    // 2. CONFIGURE NODEMAILER
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use host/port for other services
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD,
      },
    });

    // 3. PREPARE ALL ATTACHMENTS (INCLUDING NEW ONES)
    const schoolIdFile = formData.get("schoolId") as File | null;
    const aadhaarCardFile = formData.get("aadhaarCard") as File | null;
    const federationIdImageFile = formData.get(
      "federationIdImage"
    ) as File | null;
    const fideIdImageFile = formData.get("fideIdImage") as File | null;

    const attachments = [];

    // Helper function to process and add files to the attachments array
    const addAttachment = async (file: File | null) => {
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type,
        });
      }
    };

    // Process all potential file uploads
    await addAttachment(schoolIdFile);
    await addAttachment(aadhaarCardFile);
    await addAttachment(federationIdImageFile);
    await addAttachment(fideIdImageFile);

    // 4. CONSTRUCT THE DETAILED EMAIL BODY
    const fields: { [key: string]: FormDataEntryValue } = {};
    const fileKeys = [
      "schoolId",
      "aadhaarCard",
      "federationIdImage",
      "fideIdImage",
    ];
    for (const [key, value] of formData.entries()) {
      if (!fileKeys.includes(key)) {
        // Don't add file objects to the fields list
        fields[key] = value;
      }
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Chess Academy Enrollment</h2>
        <p>A new enrollment form has been submitted.</p>
        <hr>
        <h3>Student Information</h3>
        <ul>
          <li><strong>Full Name:</strong> ${fields.studentName}</li>
          <li><strong>Chess Level:</strong> ${fields.chessLevel}</li>
          <li><strong>Achievements:</strong> ${
            fields.achievements || "N/A"
          }</li>
        </ul>
        <h3>Parent / Guardian Information</h3>
        <ul>
          <li><strong>Name:</strong> ${fields.parentName}</li>
          <li><strong>Email:</strong> ${fields.email}</li>
          <li><strong>Contact:</strong> ${fields.contact}</li>
          <li><strong>Occupation:</strong> ${fields.parentOccupation}</li>
          <li><strong>Details:</strong> ${
            fields.postName || fields.businessName || "N/A"
          }</li>
        </ul>
        <h3>Location</h3>
        <ul>
          <li><strong>Location:</strong> ${fields.city}, ${fields.state}, ${
      fields.country
    }</li>
        </ul>
        <h3>Online Readiness & IDs</h3>
         <ul>
          <li><strong>Has Internet:</strong> ${fields.hasInternet}</li>
          <li><strong>Familiar with Platforms:</strong> ${
            fields.familiarWithPlatforms
          }</li>
          <li><strong>Has Federation ID:</strong> ${fields.hasFederationId} (${
      fields.federationId || "N/A"
    })</li>
          <li><strong>Has FIDE/AICF ID:</strong> ${fields.hasFideId} (${
      fields.fideIdNumber || "N/A"
    })</li>
           <li><strong>Preferred Timings:</strong> ${
             fields.preferredTiming
           }</li>
        </ul>
        <h3>Chess Goals</h3>
        <p>${fields.goals}</p>
        <h3>Terms & Consent</h3>
         <ul>
          <li><strong>Signature:</strong> ${fields.signature}</li>
          <li><strong>Date:</strong> ${fields.date}</li>
          <li><strong>Agreed to Terms:</strong> ${fields.agreedToTerms}</li>
        </ul>
        <hr>
        <p>Uploaded documents are attached to this email.</p>
      </div>
    `;

    // 5. DEFINE MAIL OPTIONS
    const mailOptions = {
      from: `"${fields.parentName}" <${process.env.NEXT_PUBLIC_EMAIL_SERVER_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_TO,
      subject: `New Chess Enrollment: ${fields.studentName}`,
      html: emailHtml,
      attachments: attachments,
    };

    // 6. SEND THE EMAIL
    await transporter.sendMail(mailOptions);

    // 7. RETURN SUCCESS RESPONSE
    return NextResponse.json(
      { message: "Enrollment submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    // 8. HANDLE ERRORS
    console.error("Error sending enrollment email:", error);
    return NextResponse.json(
      { message: "Failed to submit enrollment. Please try again later." },
      { status: 500 }
    );
  }
}
