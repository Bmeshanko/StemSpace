import './Home.css';
import App from "./App";

function Home() {
    return (
        <div className="Home">
            <header className="Home-header">
            <img src="Logo.png" style="float: left" alt="STEM"></img>
                <p>
                    Welcome to StemSpace!
                </p>
                <a
                    className="Github-Link"
                    href="https://github.com/Bmeshanko/StemSpace"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Link to GitHub
                </a>
            </header>
        </div>
    );
}

export default Home;
