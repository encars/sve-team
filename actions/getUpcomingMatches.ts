import prisma from "@/lib/prisma";

const getUpcomingMatches = async () => {
    const currentDate = new Date();
    const matches = await prisma.match.findMany({
        where: {
            date: {
                gt: currentDate,
            },
        },
        orderBy: {
            date: "asc",
        },
        take: 2,
    });

    return matches;
};

export default getUpcomingMatches;
