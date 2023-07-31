import prisma from "@/lib/prisma";

const getAllPractices = async () => {
    try {
        const currentDate = new Date();
        const practices = await prisma.practice.findMany({
            where: {
                date: {
                    gt: currentDate,
                },
            },
            orderBy: {
                date: "asc",
            },
            take: 10,
        });

        return practices;
    } catch (error: any) {
        return [];
    }
};

export default getAllPractices;