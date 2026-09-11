# 📱 Android Notes Maker

<div align="center">

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<br />

**A full-stack web application designed for organizing, managing, and drafting Android development notes, topics, and documentation with rich-text editing and auto-save capabilities.**

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Getting Started](#-getting-started) • [API Reference](#-api-reference) • [Future Enhancements](#-future-enhancements)

---

</div>

## ✨ Key Features

- **📝 Rich-Text WYSIWYG Editor**:
  - Full text styling: **Bold**, *Italic*, <u>Underline</u>.
  - Multi-tier headings (`H1`, `H2`) and dynamic font sizing (Small, Normal, Large, Huge).
  - Unordered (`•`) and ordered (`1.`) list formatting.
  - Formatted text paste cleaner to preserve clean HTML styling.
- **⚡ Automatic Background Saving**:
  - Debounced auto-save triggers seamlessly while typing without disrupting the workflow.
  - Real-time status indicators (`Saving...` / `Saved ✓`).
- **🔍 Real-Time Note Filtering**:
  - Instant client-side search across all saved topics and note titles.
- **🎨 Android Themed Aesthetics**:
  - Clean, modern Android-inspired interface tailored with dedicated artwork and smooth transitions.
- **🚀 Full CRUD RESTful API**:
  - Create, read, update, and delete notes backed by MongoDB with Mongoose timestamp tracking.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: Modern Vanilla CSS with responsive layout architecture

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose 8](https://mongoosejs.com/)
- **Middleware**: `cors`, `express.json()`

---

## 📂 Project Structure

```text
android_project/
├── backend/
│   ├── controllers/
│   │   └── noteController.js      # Controller logic for Note CRUD operations
│   ├── models/
│   │   └── Note.js                # Mongoose schema and model definition
│   ├── routes/
│   │   └── noteRoutes.js          # Express route definitions for /api/notes
│   ├── package.json               # Backend dependencies and scripts
│   └── server.js                  # Express server entry point & MongoDB connection
│
├── frontend/
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── NotesHeader.jsx    # Hero header component with branding
│   │   │   ├── NotesList.jsx      # Notes listing and search component
│   │   │   └── android_home.png   # Header graphic asset
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Dashboard view
│   │   │   ├── NewTopic.jsx       # Topic creation screen
│   │   │   ├── NoteEditor.jsx     # Rich text editor page with toolbar
│   │   │   └── android_newtopic.png
│   │   ├── App.jsx                # Route declarations
│   │   ├── index.css              # Global styles and design system
│   │   └── main.jsx               # React DOM entry point
│   ├── index.html                 # HTML template
│   ├── package.json               # Frontend dependencies and scripts
│   └── vite.config.js             # Vite configuration
│
├── .gitignore                     # Git ignore rules
└── README.md                      # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **yarn**
- **MongoDB** (Local instance running at `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection string)

---

### 1. Clone the Repository

```bash
git clone https://github.com/ShubhamGupta2611/Android_project_notesmakers.git
cd Android_project_notesmakers
```

---

### 2. Configure & Start the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. ### Configure Environment Variables

By default, the server connects to `mongodb://127.0.0.1:27017/android-notes` on port `5000`.

For MongoDB Atlas, create a `.env` file inside the `backend` folder and add:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/android-notes?retryWrites=true&w=majority

4. Start the backend server:
   ```bash
   npm start
   ```
   *The server will start listening at `http://localhost:5000`.*

---

### 3. Configure & Start the Frontend

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`).

---

## 📡 API Reference

Base URL: `http://localhost:5000/api/notes`

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Retrieve all notes sorted by latest updated | _None_ |
| `GET` | `/:id` | Retrieve single note by ID | _None_ |
| `POST` | `/` | Create a new note topic | `{ "title": "Kotlin Coroutines", "content": "" }` |
| `PUT` | `/:id` | Update note title or content | `{ "title": "Updated Title", "content": "<p>Content</p>" }` |
| `DELETE` | `/:id` | Delete a note by ID | _None_ |

### Example Note Schema
```json
{
  "_id": "65e8a9341b9e2c45d8f2a1b9",
  "title": "Jetpack Compose Basics",
  "content": "<h2>State Management</h2><p>Remember and mutableStateOf...</p>",
  "createdAt": "2026-03-01T10:00:00.000Z",
  "updatedAt": "2026-03-01T10:05:00.000Z"
}
```

---

## 🔮 Future Enhancements

- [ ] Code syntax highlighting block for Kotlin/Java/XML snippets.
- [ ] Export notes to Markdown (`.md`) and PDF formats.
- [ ] Tagging and categorization system (e.g., `Architecture`, `Jetpack Compose`, `Coroutines`).
- [ ] Dark mode toggle.
- [ ] Offline caching & PWA support.

---

## 📄 License

This project is licensed under the **MIT License**.

## 👨‍💻 Author

**Shubham Gupta**
- GitHub: [@ShubhamGupta2611](https://github.com/ShubhamGupta2611)
- Repository: [Android_project_notesmakers](https://github.com/ShubhamGupta2611/Android_project_notesmakers)
