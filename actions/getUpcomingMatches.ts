import prisma from "@/lib/prisma";

const getUpcomingMatches = async () => {
    try {
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
    } catch (error: any) {
        console.log(error);
        return [];
    }
};

export default getUpcomingMatches;
