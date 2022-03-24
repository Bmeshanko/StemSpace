import './Front.css'


function Front() {

    return(
        <body>
            <section className="Front-top">
                <p>
                    StemSpace is bringing the STEM community together <br/>
                    by fostering a sense of inclusion within fields.
                </p>
                <img className='Front-logo' src="Big_logo.png" alt="STEM"></img>
            </section>

            <section className="Front-bottom">
                <p>
                    Register or login to join the StemSpace community!
                </p>
                <button className="Front-login-button"
                        onClick={(e) => {
                            e.preventDefault();
                        }}><b>Log In</b>
                </button>
                <button className="Front-signup-button"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href='/Signup';
                        }}><b>Signup</b>
                </button>
            </section>
        </body>
    );
}

export default Front