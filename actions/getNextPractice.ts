import prisma from "@/lib/prisma";

const getNextPractice = async () => {
    const currentDate = new Date();
    const nextPractice = await prisma.practice.findFirst({
        where: {
            date: {
                gt: currentDate,
            },
        },
    });

    if (!nextPractice) return null;

    return nextPractice;
}

export default getNextPractice;