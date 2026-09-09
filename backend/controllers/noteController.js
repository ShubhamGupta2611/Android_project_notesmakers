const Note = require("../models/Note");

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ updatedAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Failed to get notes" });
    }
};

const getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Failed to get note" });
    }
};

const createNote = async (req, res) => {
    try {
        const note = await Note.create({
            title: req.body.title,
            content: req.body.content
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: "Failed to create note" });
    }
};

const updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content
            },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Failed to update note" });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete note" });
    }
};
module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
};