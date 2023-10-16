import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: {
            name: "Admin",
        },
        update: {},
        create: {
            name: "Admin",
            hashedPassword: await bcrypt.hash("enric7117", 10),
        }
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })