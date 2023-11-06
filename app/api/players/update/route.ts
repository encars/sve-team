import getUser from "@/actions/getUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH (req: Request) {
    try {
        const user = await getUser();

        const { displayName, email, password } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        let updatedUser;

        if (!password) {
            updatedUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    displayName,
                    email
                }
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            updatedUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    displayName,
                    email,
                    hashedPassword
                }
            });
        }

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error: any) {
        return new NextResponse("Internal server error", { status: 500 });
    }
}