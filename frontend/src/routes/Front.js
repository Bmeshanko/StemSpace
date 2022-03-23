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
            </section>
        </body>
    );
}

export default Front