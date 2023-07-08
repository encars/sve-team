import prisma from "@/lib/prisma";

const getNextPractice = async () => {
    try {
        const currentDate = new Date();
        const nextPractice = await prisma.practice.findFirst({
            where: {
                date: {
                    gt: currentDate,
                },
            },
        });
    
        if (!nextPractice) return null;
    
        return nextPractice;
    } catch (error: any) {
        console.log(error);
        return null;
    }
}

export default getNextPractice;