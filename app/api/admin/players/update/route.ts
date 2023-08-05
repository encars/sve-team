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

        const { id, name, displayName, number, password, role, position, stick, isReferee, license } = body.data;

        if (!password || typeof password !== "string") {
            const updatedUser = await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    name,
                    displayName,
                    number,
                    role,
                    position,
                    stick,
                    isReferee,
                    license,
                },
            });

            return NextResponse.json(updatedUser, { status: 200 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const updatedUser = await prisma.user.update({
            where: {
                id,
            },
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

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}