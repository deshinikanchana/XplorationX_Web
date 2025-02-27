import { Router } from "express";
import {getAboutCompany} from "../Repository/home-repository";

const homeRouter = Router();

homeRouter.get("/", async (req, res) => {
    try {
        const CompanyData = await getAboutCompany();
        res.json(CompanyData);
    } catch (err) {
        console.error("Error in SpaceX API  GET /company", err);
        res.status(500).json({ error: "Failed to fetch Company Data" });
    }
});

export default homeRouter;