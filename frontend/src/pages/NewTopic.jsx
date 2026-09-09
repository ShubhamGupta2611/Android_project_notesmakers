import { useState } from "react";
import { useNavigate } from "react-router-dom";
import android_newtopic from "./android_newtopic.png";

function NewTopic() {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const createTopic = async () => {
        if (!title.trim()) {
            setError("Please enter a topic name");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch("http://localhost:5000/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title.trim(),
                    content: ""
                })
            });

            if (!response.ok) {
                throw new Error("Failed to create topic");
            }

            const note = await response.json();

            navigate(`/note/${note._id}`);
        } catch (error) {
            setError("Unable to create topic");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="new-topic-page">
            <section className="new-topic-section">

                <div className="new-topic-content">
                    <h1>New Topic</h1>

                    <p className="new-topic-description">
                        Create a new topic for your Android notes.
                    </p>

                    <input
                        type="text"
                        placeholder="Enter topic name..."
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    {error && <p className="new-topic-error">{error}</p>}

                    <button onClick={createTopic} disabled={loading}>
                        {loading ? "Creating..." : "Create Topic"}
                    </button>
                </div>

                <img
                    className="new-topic-image"
                    src={android_newtopic}
                    alt="Android mascot"
                />

            </section>
        </main>
    );
}

export default NewTopic;