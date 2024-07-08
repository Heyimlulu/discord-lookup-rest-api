import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const insertLookup = async (data) => {
    try {
        await prisma.lookup.create({data});
        prisma.$disconnect();
    } catch (error) {
        console.error(error);
        prisma.$disconnect();
    }
}