import './Home.css';


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
        <div>

            <button className='button-class'
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='/Signup';
                }}><b><img className='Logo-position' src="Logo_new.png" alt="STEM"></img></b>
            </button>
            <p className='Stem-text'>StemSpace</p>
            <p className='topLine'></p>
        </div>
    );
}

export default Home;
