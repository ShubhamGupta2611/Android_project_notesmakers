import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewTopic from "./pages/NewTopic";
import NoteEditor from "./pages/NoteEditor";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new-topic" element={<NewTopic />} />
                <Route path="/note/:id" element={<NoteEditor />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;