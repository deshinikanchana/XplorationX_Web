import { Router } from "express";
import {getAllLaunchPads, getLaunchPadById} from "../Repository/launchPad-repository";

const LaunchPadRouter = Router();

LaunchPadRouter.get("/", async (req, res) => {
    try {
        const launchPadList = await getAllLaunchPads();
        res.json(launchPadList);
    } catch (err) {
        console.error("Error in SpaceX API  GET /launchpad", err);
        res.status(500).json({ error: "Failed to fetch LaunchPads" });
    }
});

LaunchPadRouter.get("/:id", async (req, res) => {
    try {
        const LaunchPadId = req.params.id;
        console.log("LaunchPad Id : " , LaunchPadId);
        const launchPad = await getLaunchPadById(LaunchPadId);
        res.json(launchPad);
    } catch (err) {
        if (err instanceof Error && err.message === "LaunchPad not found") {
            res.status(404).json({ error: "LaunchPad not found" });
        } else {
            console.error("Error in SpaceX API GET /launchpad/${id}`", err);
            res.status(500).json({ error: "Failed to fetch Launch Pad" });
        }
    }
});

export default LaunchPadRouter;