import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prisma";

export async function PATCH (req: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== "COACH") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        console.log(body)

        const { id, name, displayName, number, password, role, position, isReferee, license } = body;

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
                isReferee,
                license,
            },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}