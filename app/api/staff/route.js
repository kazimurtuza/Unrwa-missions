import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Staff } from "@/lib/model/staff";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { uploadBase64Img } from "@/app/helper";
import { Agency } from "@/lib/model/agency";
import { MissionClassification } from "@/lib/model/missionClassification";
import nodemailer from "nodemailer";

export async function GET(){
 
    let data=[];
    try{
        console.log(connectionStr);
        await mongoose.connect(connectionStr);
        data = await Staff
        .find({is_delete:0})
        .populate([{
            path: 'user',
            model: 'User'
        },
        {
            path: 'agency',
            model: 'Agency'
        }
        ])
        .sort({ created_at: -1 })
        .exec();
    }
    catch(error)
    {
        data={success:false,error:error.message};
    }

    return NextResponse.json({result:data,success:true});
}
export async function POST(request) {
    try {
        const payload = await request.json();
        let staff_photo=null;
        let passport_original_attachment=null;
        let passport_duplicate_attachment=null;
        let national_id_attachment=null;
        if (!validator.isEmail(payload.email)) {
            return new NextResponse(JSON.stringify({ msg: 'Invalid email address',success:false }), { status: 400 });
        }
        await mongoose.connect(connectionStr);

        const record = {email: payload.email,is_delete:0};
        const is_findEmail = await User.findOne(record);
        if (is_findEmail) {
            return NextResponse.json({msg: 'user is already present',success:false}, {status: 409});
        }
        const record2 = {national_id: payload.national_id,is_delete:0};
        const is_findEmail2 = await Staff.findOne(record2);
        if (is_findEmail2) {
            return NextResponse.json({msg: 'National ID is already present',success:false}, {status: 409});
        }
        const record3 = {employee_id: payload.employee_id,is_delete:0};
        const is_findEmail3 = await Staff.findOne(record3);
        if (is_findEmail3) {
            return NextResponse.json({msg: 'employee ID is already present',success:false}, {status: 409});
        }
        if(payload.staff_photo)
        {
            try {
                payload.staff_photo = await uploadBase64Img(payload.staff_photo);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }
      
        if(payload.passport_original_attachment)
        {
            try {
                payload.passport_original_attachment = await uploadBase64Img(payload.passport_original_attachment);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }
        if(payload.passport_duplicate_attachment)
        {
            try {
                payload.passport_duplicate_attachment = await uploadBase64Img(payload.passport_duplicate_attachment);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }
        if(payload.national_id_attachment)
        {
            try {
                payload.national_id_attachment = await uploadBase64Img(payload.national_id_attachment);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }
        payload.password=generateRandomCode(8);
        await mongoose.connect(connectionStr);
        //password hashing
        const hashPassword = await bcrypt.hash(payload.password, 10);
        let storeUser = {
                'name': payload.name,
                'email': payload.email,
                'password': hashPassword,
                'user_type': payload.staff_role,
                "phone": payload.whatsup_number,
                "status":0
        };
        //user create
        let user = new User(storeUser);
        let result=await user.save();

        //staff create
        payload.user=user._id;
        let staff = new Staff(payload);
        result = await staff.save();
        // const mailOptions={};


        
        // const transporter = nodemailer.createTransport({
        //         host: "smtp.gmail.com",
        //         port: 465,
        //         secure: true, // Set to false for explicit TLS
        //         auth: {
        //             user: process.env.EMAIL_USER,
        //             pass: process.env.EMAIL_PASSWORD,
        //         },
        //         tls: {
        //             // Do not fail on invalid certificates
        //             //rejectUnauthorized: false,
        //         },
        // });

        // const password = payload.password;
        // const mailContent = `Your password: ${password}`;

        // // Set up email options
        // mailOptions.to = payload.email;
        // mailOptions.subject = "User Creation Email";
        // mailOptions.text = mailContent;

        // // Send the email
        // await transporter.sendMail(mailOptions);

        return NextResponse.json({ result, success: true });
    } catch (error) {
        //await User.deleteMany({ email: payload.email });
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
        
    } finally {
        await mongoose.disconnect();
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