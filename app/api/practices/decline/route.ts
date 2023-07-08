import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
        const body = await req.json();
        const { practiceId, practices, userId } = body;

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                practiceIds: {
                    set: practices,
                },
            },
        });

        const updatedPractice = await prisma.practice.update({
            where: {
                id: practiceId,
            },
            data: {
                users: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        });

        return new NextResponse("Practice declined", { status: 200 });
    } catch (error: any) {
        return new NextResponse("Internal server error", { status: 500 });
    }
}