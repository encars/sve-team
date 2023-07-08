import prisma from "@/lib/prisma";

const getMatchById = async (id: string) => {
    const match = await prisma.match.findUnique({
        where: {
            id,
        },
    });

    return match;
};

export default getMatchById;