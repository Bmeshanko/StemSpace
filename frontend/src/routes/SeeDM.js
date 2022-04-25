import './CreatePost.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

function SeeDM() {
    const navigate = useNavigate();
    const location = useLocation();

    const [input, setInput] = useState({
        DMS: [],
        target: location.state.target,
        username: location.state.username
    });

    
    return(
        <body>
                <div>
                    <p>Do you accept Y/N</p>
                </div>
        </body>
    );
}

export default SeeDM;