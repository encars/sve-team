import prisma from "@/lib/prisma";

const getMatches = async (number?: number) => {
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
            take: number || 100,
        });

        return matches;
    } catch (error: any) {
        return [];
    }
};

export default getMatches;
