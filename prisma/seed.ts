import { PrismaClient, Role, Position } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const startDate = new Date(); // start from today
    const endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 1); // end date is one year from now

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        // if day of the week is Tuesday (2) or Thursday (4)
        if (d.getDay() === 2 || d.getDay() === 4) {
            const practiceDate = new Date(d);
            practiceDate.setHours(19, 30, 0, 0); // set time to 19:30

            await prisma.practice.create({
                data: {
                    date: practiceDate,
                    location: 'Practice Location',
                    notes: 'Regular practice',
                },
            });
        }
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