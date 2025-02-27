import { PrismaClient } from "@prisma/client";
import Favourite from "../Model/Favourite";

const prisma = new PrismaClient();

type FavouriteCreateInput = Omit<Favourite, "FavId">;

export async function getAllFavourites() {
    try {
        return await prisma.favourite.findMany();
    } catch (err) {
        console.error("Error fetching favourites:", err);
        throw new Error("Failed to fetch favourites from the database");
    }
}

export async function getFavouriteById(FavId: number) {
    try {
        const fav = await prisma.favourite.findUnique({
            where: { FavId: FavId },
        });
        if (!fav) {
            throw new Error("Favourite Result not found");
        }
        return fav;
    } catch (err) {
        console.error(`Error fetching favourite with id ${FavId}:`, err);
        throw err;
    }
}

export async function createFavourite(favData: FavouriteCreateInput) {
    try {
        await prisma.favourite.create({
            data: {
                FavTopic:favData.FavTopic,
                UserId:favData.UserId,
            },
        });
    } catch (err) {
        console.error("Error Adding favourites:", err);
        throw new Error("Failed to create favourite");
    }
}

export async function deleteFavourite(FavId: number) {
    try {
        await prisma.favourite.delete({
            where: { FavId },
        });
        return true;
    } catch (err) {
        console.error(`Error deleting favourite with id ${FavId}:`, err);
        throw err;
    }
}
