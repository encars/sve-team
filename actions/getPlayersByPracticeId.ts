import prisma from "@/lib/prisma";

const getPlayersByPracticeId = async (id: string) => {
    try {
        const players = await prisma.user.findMany({
            where: {
                practiceIds: {
                    has: id,
                },
            },
        });

        return players;
    } catch (error: any) {
        console.error(error);
        
        return [];
    }
};

export default getPlayersByPracticeId;