import { PrismaClient, Role, Position } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const player1 = await prisma.user.create({
        data: {
            name: "Player 1",
            username: "player1",
            email: "player1@example.com",
            hashedPassword,
            role: Role.PLAYER,
            position: Position.FORWARD,
        },
    });

    const player2 = await prisma.user.create({
        data: {
            name: "Player 2",
            username: "player2",
            email: "player2@example.com",
            hashedPassword,
            role: Role.PLAYER,
            position: Position.DEFENDER,
        },
    });

    const coach = await prisma.user.create({
        data: {
            name: "Coach",
            username: "coach",
            email: "coach@example.com",
            hashedPassword,
            role: Role.COACH,
        },
    });

    const match1 = await prisma.match.create({
        data: {
            homeTeam: "Home Team 1",
            awayTeam: "Away Team 1",
            score: "0-0",
            date: new Date(),
            location: "Location 1",
            userIds: [player1.id, player2.id, coach.id],
        },
    });

    const match2 = await prisma.match.create({
        data: {
            homeTeam: "Home Team 2",
            awayTeam: "Away Team 2",
            score: "0-0",
            date: new Date(),
            location: "Location 2",
            userIds: [player1.id, coach.id],
        },
    });

    await prisma.user.update({
        where: { id: player1.id },
        data: { matchIds: [match1.id, match2.id] },
    });

    await prisma.user.update({
        where: { id: player2.id },
        data: { matchIds: [match1.id] },
    });

    await prisma.user.update({
        where: { id: coach.id },
        data: { matchIds: [match1.id, match2.id] },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })