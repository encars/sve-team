import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import getUser from "@/actions/getUser";

export async function POST (req: Request) {
    try {
        const user = await getUser();

        if (!user || user.role !== "COACH") {
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