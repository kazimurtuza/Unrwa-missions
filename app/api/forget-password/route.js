import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import jwt from "jsonwebtoken";
import { User } from "@/lib/model/users";
// import { mailOptions} from "../../config/nodemailer";
import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from "path";


export async function POST(request) {
    
    // Extract email from the request body
    const { email } = await request.json();
    const mailOptions={};


    
   const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Set to false for explicit TLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            // Do not fail on invalid certificates
            //rejectUnauthorized: false,
        },
    });


   

    try {
        // Connect to MongoDB
        await mongoose.connect(connectionStr);
        
  

        // Check if the user with the provided email exists
        const user = await User.findOne({ email , is_delete:false});

        if (user) {
            // Generate a random code for reset password
            const code = generateRandomCode(6);

            // Store the token and timestamp in the user document
            user.reset_password_code = code;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            // Save the updated user document
            const userInfo=await user.save();

            // Compose the email content
            const resetLink = code;
            //const mailContent = `For reset your password Code: ${code}`;

            // Set up email options
            // mailOptions.from = process.env.EMAIL_USER;
            // mailOptions.to = email;
            // mailOptions.subject = "Password Reset";
            // mailOptions.text = mailContent;

             // Compose the email content using EJS

             const emailTemplatePath = path.resolve("./app/emails/forget_password.ejs");
             const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
             const mailContent = ejs.render(emailTemplate, { resetLink,name:userInfo.name,date:new Date()});


             const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "ERCS Account Password Reset",
                html: mailContent,
            };

            // Send the email
            await transporter.sendMail(mailOptions);
            
            // const phpScriptUrl = "https://technovicinity.com/development/sajeeb/viewscape-demo/public/api/send-email";
            
            // const phpResponse = await fetch(phpScriptUrl, {
            //     method: 'POST',
            //     body: JSON.stringify({ email, code }),
            //     headers: { 'Content-Type': 'application/json' }
            // });

            // Close the MongoDB connection
            await mongoose.connection.close();

            return NextResponse.json({ result: "Password reset email sent successfully.",code:code }, { status: 200 });
        } else {
            return NextResponse.json({ error: "User not found with the provided email." }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


function generateRandomCode(length) {
    const charset = "0123456789";
    let randomCode = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomCode += charset.charAt(randomIndex);
    }

    return randomCode;
}