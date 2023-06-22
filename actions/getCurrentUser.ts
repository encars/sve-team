import prisma from '@/lib/prisma';
import getSession from './getSession';

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.name) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                name: session.user.name as string
            }
        });

        if (!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error: any) {
        return null;
    }
}

export default getCurrentUser;