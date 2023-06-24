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
        const { matchId } = body;

        if (!matchId || typeof matchId !== "string") {
            return new NextResponse("Invalid match ID", { status: 400 });
        }

        let matches = [...(currentUser.matchIds || [])]

        matches = matches.filter((id) => id !== matchId);

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
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
                        id: currentUser.id,
                    },
                },
            },
        });

        return new NextResponse("Match declined", { status: 200 });
    } catch (error: any) {
        return new NextResponse("Internal server error", { status: 500 });
    }
}
