import androidHome from "./android_home.png";

function NotesHeader() {
    return (
        <header>
            <div className="header-content">
                <h1>Android Notes</h1>
                <p>Your personal Android development notebook</p>
                <br/>
                <br/>
            </div>

            <img
                className="android-home-image"
                src={androidHome}
                alt="Android Home"
            />
        </header>
    );
}

export default NotesHeader;