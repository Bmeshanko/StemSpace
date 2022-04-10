import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import './Timeline.css';

function Followers(){
    const location = useLocation();
    console.log(location.state.username)
    const {userid} = useParams();
    const [input, setInput] = useState({
            username: userid,
            size: 0,
            users: []
        }
    );
    useEffect(()=>{
        axios.post("/followPage", {username: userid, view: location.state.view}).then(res=>{
            let temp = [];
            if (location.state.view === "following") {
                console.log(res.data)
                setInput(({username: userid, size: res.data.following.length, users: res.data.following}))
            }else {
                setInput(({username: userid, size: res.data.followers.length, users: res.data.followers}))
            }
        })
    },[])

    console.log(input.users)
    return(
        <body>
        <span>
                <ol>
                    {input.users.map((user) => (
                        <div>
                            <button>
                                @{user}
                            </button>
                        </div>
                    ))}
                </ol>
        </span>
        </body>
    );
}
export default Followers