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

    useEffect(()=>{
        axios.post("/getDMS", {
			//criteria would go here
            author: input.username
		}).then (res => {
            //put in console all the posts
            let temp=[];
            for(let x=0;x<res.data.length;x++)
            {
                //temp[x]=res.data[x].content;
                if((res.data[x].author===input.username && res.data[x].target===input.target) || (res.data[x].author===input.target && res.data[x].target===input.username))
                    temp[x]={DM:{author:res.data[x].author, target:res.data[x].target, content: res.data[x].content}};
            }
            setInput(prevState => ({ ...prevState, DMS: temp}))
            console.log(input);
		}).catch(function (error) {
			console.log("Error Detected")
		})
    },[input.DMS]);
    return(
        <body>
                {(input.DMS).map((DM)=>(
                    <div>
                        <p>Author: {DM.DM.author}</p>
                        <p>Target: {DM.DM.target}</p>
                        <p>Content: {DM.DM.content}</p>
                    </div>
                ))}
        </body>
    );
}

export default SeeDM;