import { Router } from "express";
import {getAllCrew, getCrewMemberById} from "../Repository/crew-repository";

const crewRouter = Router();

crewRouter.get("/", async (req, res) => {
    try {
        const crewList = await getAllCrew();
        res.json(crewList);
    } catch (err) {
        console.error("Error in SpaceX API  GET /crew", err);
        res.status(500).json({ error: "Failed to fetch Crew" });
    }
});

crewRouter.get("/:id", async (req, res) => {
    try {
        const crewId = req.params.id;
        const crew = await getCrewMemberById(crewId);
        res.json(crew);
    } catch (err) {
        if (err instanceof Error && err.message === "Member not found") {
            res.status(404).json({ error: "Member not found" });
        } else {
            console.error(`Error in SpaceX API GET /crew/${req.params.id}`, err);
            res.status(500).json({ error: "Failed to fetch member" });
        }
    }
});

export default crewRouter;