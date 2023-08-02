import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prisma";

export async function POST (req: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== "COACH") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, displayName, password, role, position, isReferee, license } = body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                name,
                displayName,
                hashedPassword,
                role,
                position,
                isReferee,
                license,
            },
        });

        return NextResponse.json(newUser, { status: 200 });
    } catch (error: any) {
        return new NextResponse("Internal server error", { status: 500 });
    }
}