import React, {useState, useRef, useEffect} from "react";
import './Home.css';


function Home() {


    const[style, setStyle] = useState(true);

    const changeStyle = ()=> {
        setStyle(!style);
    }
    const [name, setName] = useState('')
    const inputRef = useRef()


    function focus_element() {
        inputRef.current.focus()
    }

    let name2 = "Zachary"

    return (
        <div>
            <button className='button-class'
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='/Signup';
                }}><b><img className='Logo-position' src="Logo_new.png" alt="STEM"></img></b>
            </button>
            <p className='Stem-text' id={"Stem"}>StemSpace</p>
            <button className = 'support button-class'> support </button>
            <button className = 'button-class Login-btn'> Login </button>
            <p className={style ? "topLine" : "black"}></p>
            <button className="button-class" onClick={changeStyle}>
                press
                </button>
            <input ref={inputRef} value={name} placeholder = "name" onChange={e => setName(e.target.value)}/>
            <div>MY name is {name}</div>
            <button onClick={focus_element}>
                Focus
            </button>
        </div>

    );
};

export default Home;
