import { Router } from "express";
import {getAllPayLoads, getPayloadById} from "../Repository/payload-repository";

const payloadRouter = Router();

payloadRouter.get("/", async (req, res) => {
    try {
        const payloadsList = await getAllPayLoads();
        res.json(payloadsList);
    } catch (err) {
        console.error("Error in SpaceX API  GET /payloads", err);
        res.status(500).json({ error: "Failed to fetch PayLoads" });
    }
});

payloadRouter.get("/:id", async (req, res) => {
    try {
        const payloadId = req.params.id;
        console.log("backend payload route line 19 :" ,payloadId);
        const payload = await getPayloadById(payloadId);
        res.json(payload);
    } catch (err) {
        if (err instanceof Error && err.message === "Payload not found") {
            res.status(404).json({ error: "Payload not found" });
        } else {
            console.error(`Error in SpaceX API GET /payloads/${req.params.id}`, err);
            res.status(500).json({ error: "Failed to fetch payload" });
        }
    }
});

export default payloadRouter;