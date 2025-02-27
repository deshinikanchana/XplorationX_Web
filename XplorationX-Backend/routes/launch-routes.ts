import { Router } from "express";
import {getAllLaunches, getLaunchById} from "../Repository/launch-repository";

const launchRouter = Router();

launchRouter.get("/", async (req, res) => {
    try {
        const launchList = await getAllLaunches();
        res.json(launchList);
    } catch (err) {
        console.error("Error in SpaceX API  GET /launch", err);
        res.status(500).json({ error: "Failed to fetch Launches" });
    }
});

launchRouter.get("/:id", async (req, res) => {
    try {
        const LaunchId = req.params.id;
        const launch = await getLaunchById(LaunchId);
        res.json(launch);
    } catch (err) {
        if (err instanceof Error && err.message === "Launch not found") {
            res.status(404).json({ error: "Launch not found" });
        } else {
            console.error("Error in SpaceX API GET /launch/${id}`", err);
            res.status(500).json({ error: "Failed to fetch Launch" });
        }
    }
});

export default launchRouter;