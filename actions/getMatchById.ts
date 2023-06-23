import prisma from "@/lib/prisma";

const getMatchById = async (id: string) => {
    try {
        const match = await prisma.match.findUnique({
            where: {
                id,
            },
        });

        return match;
    } catch (error: any) {
        return null;
    }
};

export default getMatchById;