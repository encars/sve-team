import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { displayName, email } = body;

        if (!displayName || typeof displayName !== "string") {
            return new NextResponse("Invalid display name", { status: 400 });
        }

        if (!email || typeof email !== "string") {
            return new NextResponse("Invalid email", { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                displayName,
                email,
            },
        });

        return new NextResponse("User updated", { status: 200 });
    } catch (error: any) {
        return new NextResponse("Internal server error", { status: 500 });
    }
}