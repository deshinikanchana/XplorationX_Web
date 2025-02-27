import { PrismaClient } from "@prisma/client";
import User from "../Model/User";

const prisma = new PrismaClient();

type UserCreateInput = Omit<User, "UserId">;

export async function getAllUsers() {
    try {
        return await prisma.user.findMany();
    } catch (err) {
        console.error("Error fetching Users:", err);
        throw new Error("Failed to fetch users from the database");
    }
}

export async function getUserByEmail(Email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { Email: Email },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (err) {
        console.error(`Error fetching user with email ${Email}:`, err);
        throw err;
    }
}

export async function updateUser(UserId: number, userData: Partial<UserCreateInput>) {
    try {
        const user = await prisma.user.update({
            where: { UserId },
            data: userData,
        });
        return user;
    } catch (err) {
        console.error(`Error updating user with id ${UserId}:`, err);
        throw err;
    }
}

export async function deleteUser(UserId: number) {
    try {
        await prisma.user.delete({
            where: { UserId },
        });
        return true;
    } catch (err) {
        console.error(`Error deleting user with id ${UserId}:`, err);
        throw err;
    }
}
