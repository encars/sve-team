import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IParams {
    matchId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
    try {
        const { matchId: id } = params;
    
        const players = await prisma.match.findUnique({
            where: {
                id,
            },
            include: {
                users: true,
            }
        });
    
        return NextResponse.json(players);
    } catch (error: any) {
        return new NextResponse("Error in the route", { status: 500 });
    }
}