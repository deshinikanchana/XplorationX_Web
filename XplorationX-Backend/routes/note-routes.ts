import { Router } from "express";
import {createNote, deleteNote, getAllNotes, getNoteById, updateNote} from "../Repository/note-repository";

const noteRouter = Router();

noteRouter.get("/", async (req, res) => {
    try {
        const noteList = await getAllNotes();
        res.json(noteList);
    } catch (err) {
        console.error("Error in GET /notes:", err);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});

noteRouter.get("/:id", async (req, res) => {
    try {
        const NoteId = parseInt(req.params.id);
        const note = await getNoteById(NoteId);
        res.json(note);
    } catch (err) {
        if (err instanceof Error && err.message === "Note not found") {
            res.status(404).json({ error: "Note not found" });
        } else {
            console.error("Error in GET /notes/:id:", err);
            res.status(500).json({ error: "Failed to fetch note" });
        }
    }
});

noteRouter.post("/", async (req, res) => {
    try {
        const newNote = req.body;
        const note = await createNote(newNote);
        res.status(201).json(note);
    } catch (err) {
        if (err instanceof Error && err.message.includes("Already exists")) {
            res.status(400).json({ error: "Note For That already exists" });
        } else {
            console.error("Error in POST /notes:", err);
            res.status(500).json({ error: "Failed to create note" });
        }
    }
});

noteRouter.put("/:id", async (req, res) => {
    try {
        const NoteId = parseInt(req.params.id);
        const updateData = req.body;
        const updatedNote = await updateNote(NoteId, updateData);
        res.json(updatedNote);
    } catch (err) {
        if (err instanceof Error && err.message.includes("Record to update not found")) {
            res.status(404).json({ error: "Note not found" });
        } else {
            console.error("Error in PUT /notes/:id:", err);
            res.status(500).json({ error: "Failed to update note" });
        }
    }
});

noteRouter.delete("/:id", async (req, res) => {
    try {
        const NoteId = parseInt(req.params.id);
        await deleteNote(NoteId);
        res.json({NoteId})
    } catch (err) {
        if (err instanceof Error && err.message.includes("Record to delete does not exist")) {
            res.status(404).json({ error: "Note not found" });
        } else {
            console.error("Error in DELETE /notes/:id:", err);
            res.status(500).json({ error: "Failed to delete note" });
        }
    }
});

export default noteRouter;