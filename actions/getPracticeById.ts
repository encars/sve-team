import prisma from "@/lib/prisma";

const getPracticeById = async (id: string) => {
    try {
        const practice = await prisma.practice.findUnique({
            where: {
                id,
            },
        });

        return practice;
    } catch (error: any) {
        return null;
    }
};

export default getPracticeById;