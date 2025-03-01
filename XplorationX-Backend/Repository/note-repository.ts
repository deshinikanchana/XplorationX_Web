import { PrismaClient } from "@prisma/client";
import Note from "../Model/Notes";

const prisma = new PrismaClient();

type NoteCreateInput = Omit<Note, "NoteId">;

export async function getAllNotes() {
    try {
        return await prisma.note.findMany();
    } catch (err) {
        console.error("Error fetching Notes:", err);
        throw new Error("Failed to fetch Notes from the database");
    }
}

export async function getNoteById(NoteId: number) {
    try {
        const note = await prisma.note.findUnique({
            where: { NoteId },
        });
        if (!note) {
            throw new Error("Note not found");
        }
        return note;
    } catch (err) {
        console.error(`Error fetching note with id ${NoteId}:`, err);
        throw err;
    }
}

export async function createNote(noteData: NoteCreateInput) {
    try {
        return await prisma.note.create({
            data: {
                UserId:noteData.UserId,
               Topic:noteData.Topic,
                Description:noteData.Description,
            },
        });
    } catch (err) {
        console.error("Error creating note:", err);
        throw new Error("Failed to create note");
    }
}

export async function updateNote(NoteId: number, noteData: Partial<NoteCreateInput>) {
    try {
        const note = await prisma.note.update({
            where: { NoteId },
            data: noteData,
        });
        return note;
    } catch (err) {
        console.error(`Error updating note with id ${NoteId}:`, err);
        throw err;
    }
}

export async function deleteNote(NoteId: number) {
    try {
        await prisma.note.delete({
            where: { NoteId },
        });
        return true;
    } catch (err) {
        console.error(`Error deleting note with id ${NoteId}:`, err);
        throw err;
    }
}
