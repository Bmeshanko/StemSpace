import './Home.css';
import App from "./App";


const Welcome = () => {
    return(
        <>
        <h1 style={{color: "#1DBC60"}}>Welcome to StemSpace!</h1>
        </>
    );
}

const Login_button = () => (
        <>
        <header className='toLogin'>

            Login

        </header>
        </>
    );

    const Signin_button = () => (
        <>
        <header className='toSignin'>

            Signup

        </header>
        </>
    );

function Home() {
    return (
        <div className="Home">
            <header className="Home-header">
            <img src="Logo_new.png" alt="STEM"></img>

            <Welcome></Welcome>
            <Login_button> </Login_button>
            <Signin_button></Signin_button>
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
