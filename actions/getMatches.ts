import prisma from "@/lib/prisma";

const getMatches = async () => {
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
        });

        return matches;
    } catch (error: any) {
        return [];
    }
};

export default getMatches;