import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db"
import {User} from "@/lib/model/users";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import ejs from "ejs";

export async function PUT(request, content) {
    let result = [];
    try {
        const id = content.params.id;
        const filter = {_id: id};
        const payload = await request.json();
        // return NextResponse.json(payload.password);
        await mongoose.connect(connectionStr);
        const userInfo=await User.findById(filter);
        const oldData=userInfo._doc;
        payload.status=1;
        if(userInfo.status==0)
        {
            payload.status=1;
        }
        else
        {
            payload.status=0;
        }
        // if(userInfo.status==0)
        // {
            const newPassword=generateRandomCode(8);
            payload.password= await bcrypt.hash(newPassword, 10);
        //}
        
        const updatedata={...oldData,...payload}
        result = await User.findOneAndUpdate(filter, updatedata);
        //const mailOptions={};

        
        // if(userInfo.status==0)
        // {
        
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

        const password = newPassword;
        //const mailContent = `Your password: ${password}`;

        // Set up email options
        // mailOptions.to = userInfo.email;
        // mailOptions.subject = "User Creation Email";
        // mailOptions.text = mailContent;

        const emailTemplatePath = path.resolve("./app/emails/account_creation.ejs");
        const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
        const mailContent = ejs.render(emailTemplate, { password,email:userInfo.email,name:userInfo.name});


        const mailOptions = {
           from: process.env.EMAIL_USER,
           to: userInfo.email,
           subject: "ERCS Account Creation Notification",
           html: mailContent,
       };

        // Send the email
        await transporter.sendMail(mailOptions);

        //}
    } catch (error) {
        return NextResponse.json({error:error.message, success: 'error found'});
    }
    return NextResponse.json({result, success: true});
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