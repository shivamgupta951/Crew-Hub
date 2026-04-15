import { getCurrentUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try {
        const user = await getCurrentUser();
        if(!user)
        {
            return NextResponse.json({
                error: "You are not Authenticated",
            },{status: 401});
        }
        return NextResponse.json(user);
    } catch (error) {
        console.log("error: ",error);
        NextResponse.json({
            error: "Internal server error!"
        },{status: 500});
    }
}