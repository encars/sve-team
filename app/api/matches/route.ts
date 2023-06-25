import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const currentDate = new Date();
        const matches = await prisma.match.findMany({
            where: {
                date: {
                    gt: currentDate,
                },
            },
            orderBy: {
                date: "asc",
            },
            take: 2,
        });

        return NextResponse.json(matches, { status: 200 });
    } catch (error: any) {
        return new NextResponse("Internal server error", { status: 500 });
    }
}