import { Router } from "express";
import {deleteUser, getAllUsers, getUserByEmail, updateUser} from "../Repository/user-repository";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
    try {
        const userList = await getAllUsers();
        res.json(userList);
    } catch (err) {
        console.error("Error in GET /user:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

userRouter.get("/:id", async (req, res) => {
    try {
        const Email = req.params.id;
        const user = await getUserByEmail(Email);
        res.json(user);
    } catch (err) {
        if (err instanceof Error && err.message === "User not found") {
            res.status(404).json({ error: "User not found" });
        } else {
            console.error("Error in GET /user/:email :", err);
            res.status(500).json({ error: "Failed to fetch user" });
        }
    }
});

userRouter.put("/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const updateData = req.body;
        const updatedUser = await updateUser(userId, updateData);
        res.json(updatedUser);
    } catch (err) {
        if (err instanceof Error && err.message.includes("Record to update not found")) {
            res.status(404).json({ error: "User not found" });
        } else if (err instanceof Error && err.message.includes("Unique constraint")) {
            res.status(400).json({ error: "Email already exists" });
        } else {
            console.error("Error in PUT /user/:id:", err);
            res.status(500).json({ error: "Failed to update user" });
        }
    }
});

userRouter.delete("/:id", async (req, res) => {
    try {
        const UserId = parseInt(req.params.id);
        await deleteUser(UserId);
        res.json({UserId});
    } catch (err) {
        if (err instanceof Error && err.message.includes("Record to delete does not exist")) {
            res.status(404).json({ error: "User not found" });
        } else {
            console.error("Error in DELETE /user/:id:", err);
            res.status(500).json({ error: "Failed to delete user" });
        }
    }
});

export default userRouter;



