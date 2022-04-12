import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import './Timeline.css';


function Followers(){
    const navigate = useNavigate();
    const location = useLocation();
    const {userid} = useParams();
    const [input, setInput] = useState({
            username: userid,
            size: 0,
            users: []
        }
    );
    function arrayBufferToBase64(buffer) {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    useEffect(()=>{
        axios.post("/followPage", {username: userid, view: location.state.view}).then(res=> {
            let temp
            if (location.state.view === "following") {
                temp = res.data.following
            } else {
                temp = res.data.followers
            }
            let temp2 = [];
            let promises=[];
            for(let i = 0; i < temp.length; i++){
                promises.push(axios.post("/getUsers", {
                    username: temp[i]
                }).then (resp=> {
                    let base64Flag = 'data:image/jpeg;base64,';
                    let imageStr = arrayBufferToBase64(resp.data.img.data.data);
                    let picture=base64Flag+imageStr;
                    temp2[i] = {user:{username: temp[i], image: picture}};
                }))
            }
            Promise.all(promises).then(()=>setInput({username: location.state.username, size: temp.length, users: temp2}));
        })
    },[location.state.view,userid,location.state.username])

    function handleClickName(event, name) {
        navigate(`/Profile/${name}`, {state:{username:location.state.username}});
    }

    return(
        <body>
        {location.state.view}
                <ol>
                    {input.users.map((user) => (
                        <div className={"Post"}>
                            <img className='SmallerPost-picture' src={user.user.image}></img>
                            <button class = "Post" onClick={(e) => {
                                handleClickName(e,user.user.username)}}>
                                @{user.user.username}
                            </button>
                        </div>
                    ))}
                </ol>
        </body>
    );
}
export default Followers