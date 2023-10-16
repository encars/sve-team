import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getUser = async () => {    
    try {
        const session = await getServerSession(authOptions);
    
        if (!session) return null;
    
        const name = session.user!.name!;

        const user = await prisma.user.findUnique({
            where: {
                name,
            },
        });

        if (!user) return null;

        return user;
    } catch (error: any) {
        console.log(error);
        return null;
    }
}

export default getUser;