import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import User from "../Model/User";

const prisma = new PrismaClient();

export async function createUser(user: { username: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log("Hashing password for new user:", hashedPassword);

    const addedUser = await prisma.user.create({
        data: {
            Name: user.username,
            Email: user.email,
            Password: hashedPassword,
        },
    });

    console.log("User created:", addedUser);
    return addedUser;
}

export async function verifyUserCredentials(verifyUser: { email: string; password: string }) {
    const user : User | null = await prisma.user.findUnique({
        where: { Email: verifyUser.email },
    });
    if (!user) {
        return false;
    }

    return await bcrypt.compare(verifyUser.password, user.Password);
}
