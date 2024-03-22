import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const headerdata = headers();
    const bearerToken = headerdata.get("authorization");
    const token = bearerToken.split(" ")[1];
    let info = jwt.decode(token);

    return NextResponse.json(info);
}
