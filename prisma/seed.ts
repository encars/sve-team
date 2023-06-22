import { PrismaClient, Role, Position } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const user1 = await prisma.user.create({
        data: {
            name: "player1",
            displayName: "Player One",
            email: "player1@example.com",
            image: "https://example.com/player1.jpg",
            hashedPassword,
            role: Role.PLAYER,
            position: Position.FORWARD,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: "player2",
            displayName: "Player Two",
            email: "player2@example.com",
            image: "https://example.com/player2.jpg",
            hashedPassword,
            role: Role.PLAYER,
            position: Position.DEFENDER,
        },
    });

    // Create matches
    const match1 = await prisma.match.create({
        data: {
            homeTeam: "Home Team 1",
            awayTeam: "Away Team 1",
            lineup: { players: ["player1", "player2"] },
            score: "1-0",
            date: new Date(),
            location: "Stadium 1",
            users: {
                connect: [
                    { id: user1.id },
                    { id: user2.id },
                ],
            },
        },
    });

    const match2 = await prisma.match.create({
        data: {
            homeTeam: "Home Team 2",
            awayTeam: "Away Team 2",
            lineup: { players: ["player1", "player2"] },
            score: "2-1",
            date: new Date(),
            location: "Stadium 2",
            users: {
                connect: [
                    { id: user1.id },
                    { id: user2.id },
                ],
            },
        },
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