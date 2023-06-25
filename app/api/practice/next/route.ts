import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const currentDate = new Date();
        const nextPractice = await prisma.practice.findFirst({
            where: {
                date: {
                    gt: currentDate,
                },
            },
        });

        return NextResponse.json(nextPractice, { status: 200 });
    } catch (error: any) {
        return new NextResponse("Internal server error", { status: 500 });
    }
}