import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NoteEditor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    const editorRef = useRef(null);
    const firstLoad = useRef(true);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/notes/${id}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch note");
                }

                const note = await response.json();

                setTitle(note.title);
                setContent(note.content);

                if (editorRef.current) {
                    editorRef.current.innerHTML = note.content || "";
                }
            } catch (error) {
                setError("Unable to load note");
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    useEffect(() => {
        if (firstLoad.current) {
            return;
        }

        const timer = setTimeout(() => {
            saveNote();
        }, 1000);

        return () => clearTimeout(timer);
    }, [title, content]);

    useEffect(() => {
        if (!loading) {
            firstLoad.current = false;
        }
    }, [loading]);

    const saveNote = async () => {
        try {
            setSaving(true);
            setSaved(false);

            const response = await fetch(
                `http://localhost:5000/api/notes/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title,
                        content
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to save note");
            }

            setSaved(true);
        } catch (error) {
            setError("Unable to save note");
        } finally {
            setSaving(false);
        }
    };

    const deleteNote = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/notes/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete note");
            }

            navigate("/");
        } catch (error) {
            setError("Unable to delete note");
        }
    };

    const formatText = (command, value = null) => {
        if (!editorRef.current) {
            return;
        }

        editorRef.current.focus();

        document.execCommand(command, false, value);

        setContent(editorRef.current.innerHTML);
        setSaved(false);
    };

    const handleEditorChange = () => {
        if (!editorRef.current) {
            return;
        }

        setContent(editorRef.current.innerHTML);
        setSaved(false);
    };

    const handlePaste = (event) => {
        event.preventDefault();

        const text = event.clipboardData.getData("text/plain");

        document.execCommand("insertText", false, text);

        handleEditorChange();
    };

    const handleFontSize = (event) => {
        const size = event.target.value;

        if (!size) {
            return;
        }

        formatText("fontSize", size);

        event.target.value = "";
    };

    if (loading) {
        return (
            <main>
                <p>Loading note...</p>
            </main>
        );
    }

    if (error && !title && !content) {
        return (
            <main>
                <p>{error}</p>

                <button onClick={() => navigate("/")}>
                    Back to Notes
                </button>
            </main>
        );
    }

    return (
        <main>
            <section className="editor-section">
                <div className="editor-header">
                    <button onClick={() => navigate("/")}>
                        ← Back
                    </button>

                    <div className="save-status">
                        {saving && <span>Saving...</span>}
                        {!saving && saved && <span>Saved ✓</span>}
                    </div>

                    <button onClick={deleteNote}>
                        Delete
                    </button>
                </div>

                {error && <p className="editor-error">{error}</p>}

                <input
                    type="text"
                    placeholder="Note title..."
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                        setSaved(false);
                    }}
                />

                <div className="editor-toolbar">
                    <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => formatText("bold")}
                        title="Bold"
                    >
                        B
                    </button>

                    <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => formatText("italic")}
                        title="Italic"
                    >
                        I
                    </button>

                    <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => formatText("underline")}
                        title="Underline"
                    >
                        U
                    </button>

                    <select
                        defaultValue=""
                        onChange={handleFontSize}
                        title="Font Size"
                    >
                        <option value="" disabled>
                            Font Size
                        </option>

                        <option value="2">Small</option>
                        <option value="3">Normal</option>
                        <option value="5">Large</option>
                        <option value="7">Huge</option>
                    </select>

                    <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => formatText("formatBlock", "h2")}
                        title="Heading"
                    >
                        H1
                    </button>

                    <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => formatText("formatBlock", "h3")}
                        title="Subheading"
                    >
                        H2
                    </button>

                    <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => formatText("insertUnorderedList")}
                        title="Bullet List"
                    >
                        • List
                    </button>

                    <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => formatText("insertOrderedList")}
                        title="Numbered List"
                    >
                        1. List
                    </button>
                </div>

                <div
                    ref={editorRef}
                    className="note-editor"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onInput={handleEditorChange}
                    onPaste={handlePaste}
                    data-placeholder="Write your notes here..."
                ></div>
            </section>
        </main>
    );
}
export default NoteEditor;