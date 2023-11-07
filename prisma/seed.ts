import { PrismaClient } from "@prisma/client";
import { add, eachWeekOfInterval } from "date-fns";

const prisma = new PrismaClient();

async function main() {
    const startDate = new Date(2023, 10, 7); // Dates in JS are zero-indexed for the month
    const endDate = new Date(2024, 9, 31); // This would end the creation of practices on the 31st of October, 2024

    const allTuesdaysThursdays = eachWeekOfInterval(
        { start: startDate, end: endDate },
        { weekStartsOn: 1 }
    ).flatMap((weekStart) => [
        add(weekStart, { days: 1 }), // Tuesday
        add(weekStart, { days: 3 }), // Thursday
    ]);

    const practices = [];

    for (const day of allTuesdaysThursdays) {
        const isFirstTuesday = day.getDate() <= 7 && day.getDay() === 2;
        const practiceTime = isFirstTuesday ? '19:15' : '19:30';

        // You would adjust the time format and duration here to fit your exact needs
        const practice = {
            date: day,
            time: practiceTime,
            location: 'Niekampsweg 25, 22523 Hamburg', // Replace with your actual location
            // Any additional notes or default values you wish to include
        };

        practices.push(practice);
    }

    for (const practice of practices) {
        await prisma.practice.create({
            data: practice,
        });
    }

    console.log('Practices created');
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })