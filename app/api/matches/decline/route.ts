import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
        const body = await req.json();
        const { matchId, matches, userId } = body;

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                matchIds: {
                    set: matches,
                },
            },
        });

        const updatedMatch = await prisma.match.update({
            where: {
                id: matchId,
            },
            data: {
                users: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        });

        return new NextResponse("Match declined", { status: 200 });
    } catch (error: any) {
        return new NextResponse("Internal server error", { status: 500 });
    }
}
