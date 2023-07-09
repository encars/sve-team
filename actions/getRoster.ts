import prisma from "@/lib/prisma";

const getRoster = async () => {
    try {
        const roster = await prisma.user.findMany();

        return roster;
    } catch (error: any) {
        console.log(error);
        return [];
    }
};

export default getRoster;