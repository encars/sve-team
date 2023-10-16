import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
import getUser from "@/actions/getUser";

export async function POST (req: Request) {
    try {
        const user = await getUser();

        if (!user || user.role !== "COACH") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        
        const { name, displayName, number, password, role, position, stick, isReferee, license } = body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                name,
                displayName,
                number,
                hashedPassword,
                role,
                position,
                stick,
                isReferee,
                license,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}