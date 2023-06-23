import { PrismaClient, Role, Position } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create 10 players
    for (let i = 1; i <= 10; i++) {
        await prisma.user.create({
            data: {
                name: `player${i}`,
                displayName: `Player ${i}`,
                email: `player${i}@example.com`,
                hashedPassword,
                role: Role.PLAYER,
                position: Position.FORWARD,
                isReferee: i % 2 === 0,
            }
        })
    }

    // Create 15 matches
    for (let i = 1; i <= 15; i++) {
        const matchDate = new Date()
        matchDate.setDate(matchDate.getDate() + i * 7) // Set the match date to be i weeks in the future

        await prisma.match.create({
            data: {
                homeTeam: 'Home Team ' + i,
                awayTeam: 'Away Team ' + i,
                date: matchDate,
                location: 'Location ' + i,
                needRef: i % 2 === 0
            }
        })
    }
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