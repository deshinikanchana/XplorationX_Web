import Notes from "../Models/Notes.ts";
import api from "./axiosInstance.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState: Notes[] = [];

type NewNote = Omit<Notes, 'NoteId'>;

export const saveNote = createAsyncThunk(
    "notes/saveNote",
    async (notes: NewNote) => {
        try {
            const response = await api.post("/notes", notes);
            return response.data;
        } catch (error) {
            return console.log("error", error);
        }
    }
);

export const getNotes = createAsyncThunk(
    "notes/getNotes",
    async () => {
        try {
            const response = await api.get("/notes");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const deleteNotes = createAsyncThunk(
    "notes/deleteNote",
    async (id: number) => {
        try {
            const response = await api.delete(`/notes/${id}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const updateNote = createAsyncThunk(
    "notes/updateNote",
    async (notes: Notes) => {
        try {
            const response = await api.put(`/notes/${notes.NoteId}`, notes);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveNote.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveNote.rejected, (state, action) => {
                console.error("Failed to save Notes:", action.payload);
            })
            .addCase(saveNote.pending, (state, action) => {
                console.log("Save Notes Pending", action.payload);
            });

        builder
            .addCase(getNotes.fulfilled, (state, action) => {
                const currentUserId = Number(localStorage.getItem('currentUserId'));

                const filteredNotes = action.payload.filter(
                    (note: Notes) => note.UserId === currentUserId
                );

                return filteredNotes;
            })
            .addCase(getNotes.pending, (state, action) => {
                console.log("Get Notes pending", action.payload);
            })
            .addCase(getNotes.rejected, (state, action) => {
                console.error("Get Notes failed:", action.payload);
            });

        builder
            .addCase(deleteNotes.rejected, (state, action) => {
                console.error("Failed to delete Notes", action.payload);
            })
            .addCase(deleteNotes.fulfilled, (state, action) => {
                console.log(action);
                return (state = state.filter(
                    (notes: Notes) => notes.NoteId !== action.payload.NoteId
                ));
            })
            .addCase(deleteNotes.pending, (state, action) => {
                console.log("Pending delete Notes", action.payload);
            });

        builder
            .addCase(updateNote.rejected, (state, action) => {
                console.error("Failed to Update Notes:", action.payload);
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                const notes = state.find(
                    (notes: Notes) => notes.NoteId === action.payload.NoteId
                );
                if (notes) {
                    notes.Description = action.payload.Description;
                }
            })
            .addCase(updateNote.pending, (state, action) => {
                console.log("Pending update Notes:", action.payload);
            });
    },
});

export default noteSlice.reducer;