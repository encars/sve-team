import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id } = body;
    
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