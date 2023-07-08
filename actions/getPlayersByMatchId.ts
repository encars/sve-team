import prisma from "@/lib/prisma";

const getPlayersByMatchId = async (id: string) => {
    try {
        const players = await prisma.user.findMany({
            where: {
                matchIds: {
                    has: id,
                },
            },
        });

        return players;
    } catch (error) {
        console.error(error);

        return [];
    }
};

export default getPlayersByMatchId;