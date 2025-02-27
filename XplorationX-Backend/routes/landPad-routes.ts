import { Router } from "express";
import {getAllLandPads, getLandPadById} from "../Repository/landPad-repository";

const landPadRouter = Router();

landPadRouter.get("/", async (req, res) => {
    try {
        const landPads = await getAllLandPads();
        res.json(landPads);
    } catch (err) {
        console.error("Error in SpaceX API  GET /landpad", err);
        res.status(500).json({ error: "Failed to fetch LandPads" });
    }
});

landPadRouter.get("/:id", async (req, res) => {
    try {
        const landPadId = req.params.id;
        const landPad = await getLandPadById(landPadId);
        res.json(landPad);
    } catch (err) {
        if (err instanceof Error && err.message === "LandPad not found") {
            res.status(404).json({ error: "LandPad not found" });
        } else {
            console.error("Error in SpaceX API GET /landpad/${id}`", err);
            res.status(500).json({ error: "Failed to fetch LandPad" });
        }
    }
});

export default landPadRouter;