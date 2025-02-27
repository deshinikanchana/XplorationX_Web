import { Router } from "express";
import {createFavourite, deleteFavourite, getAllFavourites, getFavouriteById} from "../Repository/favourite-repository";

const favouriteRouter = Router();

favouriteRouter.get("/", async (req, res) => {
    try {
        const favouriteList = await getAllFavourites();
        res.json(favouriteList);
    } catch (err) {
        console.error("Error in GET /favourites:", err);
        res.status(500).json({ error: "Failed to fetch favourites" });
    }
});

favouriteRouter.get("/:id", async (req, res) => {
    try {
        const FavId = parseInt(req.params.id);
        const fav = await getFavouriteById(FavId);
        res.json(fav);
    } catch (err) {
        if (err instanceof Error && err.message === "Favourite not found") {
            res.status(404).json({ error: "Favourite not found" });
        } else {
            console.error("Error in GET /favourites/:id:", err);
            res.status(500).json({ error: "Failed to fetch favourite" });
        }
    }
});

favouriteRouter.post("/", async (req, res) => {
    try {
        const newFav = req.body;
        const fav = await createFavourite(newFav);
        res.status(201).json(fav);
    } catch (err) {
        if (err instanceof Error && err.message.includes("Already exists")) {
            res.status(400).json({ error: "This Is An Already exists" });
        } else {
            console.error("Error in POST /favourites:", err);
            res.status(500).json({ error: "Failed to create favourite" });
        }
    }
});

favouriteRouter.delete("/:id", async (req, res) => {
    try {
        const FavId = parseInt(req.params.id);
        await deleteFavourite(FavId);
        res.json({FavId})
    } catch (err) {
        if (err instanceof Error && err.message.includes("Record to delete does not exist")) {
            res.status(404).json({ error: "favourite not found" });
        } else {
            console.error("Error in DELETE /favourites/:id:", err);
            res.status(500).json({ error: "Failed to delete favourite" });
        }
    }
});

export default favouriteRouter;
