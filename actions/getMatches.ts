import prisma from "@/lib/prisma";

const getMatches = async (numMatches?: number) => {
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
            take: numMatches,
        });

        return matches;
    } catch (error: any) {
        return [];
    }
};

export default getMatches;
