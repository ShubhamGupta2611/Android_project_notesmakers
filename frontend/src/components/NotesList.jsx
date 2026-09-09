import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NotesList() {
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/notes");

                if (!response.ok) {
                    throw new Error("Failed to fetch notes");
                }

                const data = await response.json();
                setNotes(data);
            } catch (error) {
                setError("Unable to load notes");
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    const getPreviewText = (content) => {
        if (!content) {
            return "No content yet.";
        }

        const temporaryElement = document.createElement("div");
        temporaryElement.innerHTML = content;

        return temporaryElement.textContent.trim() || "No content yet.";
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main>
            <section>
                <div className="notes-heading">
                    <h2>Your Notes</h2>

                    <button onClick={() => navigate("/new-topic")}>
                        + New Topic
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search your notes..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                {loading && <p>Loading notes...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && (
                    <div id="notesContainer">
                        {filteredNotes.length === 0 ? (
                            <p>No notes found.</p>
                        ) : (
                            filteredNotes.map((note) => (
                                <article
                                    className="note-card"
                                    key={note._id}
                                    onClick={() => navigate(`/note/${note._id}`)}
                                >
                                    <h3>{note.title}</h3>

                                    <p>
                                        {getPreviewText(note.content).slice(
                                            0,
                                            100
                                        )}
                                    </p>
                                </article>
                            ))
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}
export default NotesList;