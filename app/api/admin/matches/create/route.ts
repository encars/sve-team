import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prisma";

export async function POST (req: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== "COACH") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();

        const { type, date, time, location, notes } = body;

        if (type === "MATCH") {
            const { field, homeTeam, awayTeam, needRef } = body;

            const newMatch = await prisma.match.create({
                data: {
                    field,
                    homeTeam,
                    awayTeam,
                    date,
                    time,
                    location,
                    needRef,
                    notes
                },
            });

            return NextResponse.json(newMatch, { status: 201 });
        } else {
            const newPractice = await prisma.practice.create({
                data: {
                    date,
                    time,
                    location,
                    notes
                },
            });

            return NextResponse.json(newPractice, { status: 201 });
        }
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
}