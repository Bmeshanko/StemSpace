
import React, {useState} from "react";
import './Home.css';
import {useRef} from "react";

function Home() {

    const[style, setStyle] = useState(true);

    const changeStyle = ()=> {
        setStyle(!style);
    }

    return (
        <div>
            <button className='button-class'
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='/Signup';
                }}><b><img className='Logo-position' src="Logo_new.png" alt="STEM"></img></b>
            </button>
            <p className='Stem-text'>StemSpace</p>
            <p className={style ? "topLine" : "black"}></p>
            <button className="button-class" onClick={changeStyle}>
                press
                </button>
        </div>
    );
};

export default Home;
