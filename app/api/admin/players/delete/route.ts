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

        const { id } = body.data;

        const deletedUser = await prisma.user.delete({
            where: {
                id,
            },
        });

        return NextResponse.json(deletedUser, { status: 200 });
    } catch (error: any) {
        console.log(error)
        return new NextResponse(error, { status: 500 });
    }
}