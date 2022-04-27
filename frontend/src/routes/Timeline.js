import './Timeline.css';
import {createRoutesFromChildren, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Timeline() {
    
    const navigate = useNavigate();
    const location = useLocation();

    const [input, setInput] = useState({
        username: location.state.username,
        message: "",
        posts: [],
        DMS: [],
        currentDMid: "",
        currentDMcontent: {
            otherUser: "",
            messages: []
        },
        following: [],
        viewing: "",
        topic: "None",
        blocked: [],
        topics: [],
        defaultTopics: ["Art", 
            "Biology", 
            "Blogs", 
            "CompSci",
            "Earth",
            "Engineering",
            "Fitness",
            "Funny",
            "Gaming",
            "Health",
            "Math",
            "Music",
            "Psychology",
            "Sports"]
    })

    useEffect(()=>{
        axios.post("/getUsers", {
			username: location.state.username
		}).then (res => {
            input.following = [];
            for(let i = 0; i < res.data.following.length; i++){
                input.following.push(res.data.following[i]);
            }
            input.blocked = [];
            for(let i = 0; i < res.data.blocking.length; i++){
                input.blocked.push(res.data.blocking[i])
            }
            for(let i = 0; i < res.data.blockers.length; i++){
                input.blocked.push(res.data.blockers[i])
            }
            input.topics = [];
            for(let i = 0; i < res.data.topics.length; i++){
                input.topics.push(res.data.topics[i])
            }
		}).catch(function (error) {
			console.log("Error Detected")
		})
    },[]);

    useEffect(()=>{
        axios.post("/getPosts", {
			//criteria would go here
		}).then (res => {
            //put in console all the posts
            let temp=[];
            let promises=[];
            for(let i = 0; i < res.data.length; i++){
                if(!input.defaultTopics.includes(res.data[i].topic) && res.data[i].topic !== "" && res.data[i].topic !== "None"){
                    input.defaultTopics.push(res.data[i].topic);
                }
                promises.push(axios.post("/getUsers", {
                    username: res.data[i].author
                }).then (response=> {
                        let base64Flag = 'data:image/jpeg;base64,';
                        let imageStr = arrayBufferToBase64(response.data.img.data.data);
                        let picture=base64Flag+imageStr;
                        temp[i] = {post: {author: res.data[i].author,
                            anon: res.data[i].anon,
                            contents: res.data[i].contents,
                            topic: res.data[i].topic,
                            id: res.data[i]._id,
                            blocked: response.data.blocking.includes(location.state.username),
                            likers: res.data[i].likers,
                            image: picture}}; 
                }))
            }
            Promise.all(promises).then(()=>setInput(prevState => ({ ...prevState, posts: temp})));
		}).catch(function (error) {
			console.log("Error Detected")
		})
    },[input.posts]);

    function handleClickPost(event) {
        navigate("/CreatePost", {state:{username:input.username}});
    }

    function handleClickNotification(event) {
        navigate(`/Profile/${input.username}`, {state:{username:input.username}});
    }

    function handleClickLogo(event) {
        navigate("/Timeline", {state:{username:input.username}});
    }

    function handleClickName(event, name) {
        navigate(`/Profile/${name}`, {state:{username:input.username}});
    }

    function handlePost(event, postid){
        navigate(`/Post/${postid}`, {state:{username:input.username}});
    }

    function deletePost(event,id) {
        axios.post("/deletePost", {
			id: id
		}).then (res => {
            //put in console all the posts
		}).catch(function (error) {
			console.log("Error Detected")
		})
    }

    function handleLike(event, username, id){
        axios.post("/getPost", {
            id: id
        }).then( res => {
            if(res.data.likers.includes(username)){
				unlikePost(event, username, id);
			} else{
				likePost(event, username, id);
			}
        }).catch(function(error){
            console.log("Error Detected")
        })
	}

    function likePost(event, username, id){
        axios.post("/likePost", {
            username: username,
            id: id
        }).then( res => {
            //whatever
        }).catch(function(error){
            console.log("Error Detected")
        })
    }

    function unlikePost(event, username, id){
        axios.post("/unlikePost", {
            username: username,
            id: id
        }).then( res => {
            //whatever
        }).catch(function(error){
            console.log("Error Detected")
        })
    }

    function arrayBufferToBase64(buffer) {
		let binary = '';
		let bytes = [].slice.call(new Uint8Array(buffer));
		bytes.forEach((b) => binary += String.fromCharCode(b));
		return window.btoa(binary);
	};

    function isFollowing(post){
        return (input.following.includes(post.post.author) || post.post.author === location.state.username);
    }

    function filterTopic(post){
        return input.topic === post.post.topic;
    }

    function isFollowingTopic(post){
        return input.topics.includes(post.post.topic);
    }

    function removeBlocks(post){
        return (!(input.blocked.includes(post.post.author)) && post.post.blocked === false);
    }

    function filterPosts(posts, viewing, topic){
        let filteredArray = posts;
        if(viewing === "Follow"){
            filteredArray = filteredArray.filter(isFollowing);
        }
        if(topic !== "None" && topic !== "Follow"){
            filteredArray = filteredArray.filter(filterTopic);
        }
        if(topic === "Follow"){
            filteredArray = filteredArray.filter(isFollowingTopic);
        }
        filteredArray = filteredArray.filter(removeBlocks);
        return filteredArray.reverse();
    }

    function viewFollowing(){
        if(input.viewing === "Follow"){
            setInput(prevState => ({ ...prevState, viewing: ""}));
        } else{
            setInput(prevState => ({ ...prevState, viewing: "Follow"}));
        }
    }

    function viewTopic(event) {
        const {value} = event.target;
        setInput(prevState => ({ ...prevState, topic: value}));
    }

    function handleFollowTopic(username, topic){
        if(input.topics.includes(topic)){
            unfollowTopic(username, topic)
        } else{
            followTopic(username, topic)
        }
    }

    function followTopic(username, topic){
        axios.post("/followTopic", {
            username: username,
            topic: topic
        }).then( res =>{
            input.topics.push(topic);
        }).catch(function(error){
            console.log("Error Detected")
        })
    }
    function unfollowTopic(username, topic){
        axios.post("/unfollowTopic", {
            username: username,
            topic: topic
        }).then( res =>{
            var index = input.topics.indexOf(topic);
            if (index !== -1) {
                input.topics.splice(index, 1);
            }
        }).catch(function(error){
            console.log("Error Detected")
        })
    }
    function createDM(event,id) {
        console.log(input.username);
        navigate("/CreateDM", {state:{username:input.username}});
    }

    function acceptDM(event, id){
        axios.post("/acceptDM", {
            id: id
        }).then( res =>{
        }).catch(function(error){
            console.log(" Accept DM Error Detected")
        })
    }
    function deleteDM(event, id){
        axios.post("/deleteDM", {
            id: id
        }).then( res =>{
        }).catch(function(error){
            console.log(" Delete DM Error Detected")
        })
    }
    function sendDM(event, id){
        setInput(prevState => ({ ...prevState, message: ""}))
        axios.post("/sendDM", {
            id: id,
            author: input.username,
            content: input.message
        }).then( res =>{
        }).catch(function(error){
            console.log("Send DM Error Detected")
        })
    }
    function handleChange(event) {
        const {name, value} = event.target;

        setInput(prevInput=> {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }
    useEffect(()=>{
        axios.post("/getDMS", {
			//criteria would go here
            author: input.username
		}).then (res => {
            //put in console all the posts
            let temp=[];
            for(let x=0;x<res.data.length;x++)
            {
                if(res.data[x].user === input.username || res.data[x].creator===input.username)
                    temp[x]={DM:{id:res.data[x]._id,check:res.data[x].check,user:res.data[x].user,creator:res.data[x].creator}}
            }
            setInput(prevState => ({ ...prevState, DMS: temp}))
            //console.log(input.DMS);
		}).catch(function (error) {
			console.log("Error Detected")
		})
    },[input.DMS]);

    useEffect(()=>{
        if(input.currentDMid !== ""){
            axios.post("/getDM", {
                //criteria would go here
                id: input.currentDMid
            }).then (res => {
                var temp = {
                    otherUser: (res.data.creator === input.username? res.data.user: res.data.creator),
                    messages: res.data.messages
                }
                setInput(prevState => ({ ...prevState, currentDMcontent: temp}))
                //console.log(input.DMS);
            }).catch(function (error) {
                console.log("Error Detected")
            })
        }
    },[input.DMS]);

    function enterDM(id){
        setInput(prevState => ({ ...prevState, currentDMid: id}))
    }

    function leaveDM(){
        setInput(prevState => ({ ...prevState, currentDMid: ""}))
    }

    return(
        <body>
            <div className="Timeline-Top-Banner">
                <button className="Timeline-Logo-Button"
                    onClick={handleClickLogo}>
                            
                    <img className='Timeline-Logo-Image' src="Logo_new.png" alt="STEM"></img>
                </button>

                <span className="Timeline-Banner-Text">StemSpace</span>

                <button className="Timeline-Banner-Button"
                    onClick={handleClickPost}>
                    
                    <img src="post_button.png" className="Timeline-Banner-Logos" alt="Create-post"/>
                </button>

                <button className="Timeline-Banner-Button"
                    onClick={handleClickNotification}>
                        
                    <img src="Notification.png" className="Timeline-Banner-Logos" alt="Notification"/>
                </button>
            </div>

            <div className="Timeline-Horizontal-Bar"/>

            <header className="Timeline-Selector">
                <button className="Timeline-Following"
                    onClick={viewFollowing}
                >{input.viewing==="Follow"? "Following": "All" }</button>

                <div className="Timeline-Vertical-Bar"/>

                <select className="Timeline-Following" name="topic" id="topic" value={input.topic} onChange={viewTopic}>
                    <option className="Timeline-Topic-Selection" value="None">No Topic</option>
                    <option className="Timeline-Topic-Selection" value="Follow">Followed Topics</option>
                    {input.defaultTopics.map((topic) => <option className="Timeline-Topic-Selection" value={topic}>{topic}</option>)}
                </select>
            </header>

            <div className="Timeline-Horizontal-Bar"/>

            <span class="Timeline-Posts-Wrapper">
                
                {input.topic !== "None" && input.topic !== "Follow" && input.topic !== "" &&
                    <button className="Timeline-Follow-Topic"
                        onClick={(e) => {handleFollowTopic(input.username, input.topic)}}>
                        {input.topics.includes(input.topic)? "Unfollow Topic: ": "Follow Topic: "} {input.topic}
                    </button>
                }

                { input.topic === "Follow" &&
                    <div className="Timeline-Followed-Topic">
                            Followed Topics: {input.topics.map((topic, index)=>(
                                <span>{topic} </span>
                            ))}
                    </div>
                }

                {filterPosts(input.posts, input.viewing, input.topic).map((post)=>(
                    <div className="Timeline-Post">
                        
                        {!post.post.anon && <button className="Timeline-Post-Name" 
                            onClick={(event) => {
                                handleClickName(event, post.post.author)}}>
                            
                            <img className='Timeline-Post-PFP' src={post.post.image} alt={"PFP of" + post.post.author}></img>
                            <b>@{post.post.author}</b>

                        </button>  }

                        {post.post.anon && <button className="Timeline-Post-Name">
                            <b>@anon</b>

                        </button>  }

                        <p className="Timeline-Post-Topic">Topic: {post.post.topic ?  post.post.topic: "None"}</p>

                        <button className="Timeline-Post-Content" 
                            onClick={(event) => {
                                handlePost(event, post.post.id)}}>
                            
                            <p>{post.post.contents}</p>
                        </button>
                        

                        <button className="Timeline-Like-Button"
                            onClick={(e) => {
                                handleLike(e, location.state.username, post.post.id)
                            }}>
                                
                            <b>{post.post.likers.length}|{post.post.likers.includes(location.state.username)? "UNLIKE": "LIKE"}</b>
                        </button>

                        <div className="Timeline-Likers">{post.post.likers.map((liker)=>(
                            <button className="Timeline-Liker-Button" 
                                onClick={(event) => {;
                                    handleClickName(event, liker)}}>

                                <b>@{liker}</b> 
                            </button>
                        ))}</div>

                        {post.post.author===input.username &&
                        <button className="Timeline-Like-Button"
                            onClick={(e) => {
                                deletePost(e, post.post.id)
                            }}><b>Delete Post</b>
                        </button>}
                    </div>
                ))}
            </span>

            <span class="Timeline-DMs">
                    {input.currentDMid==="" && <p className="DM-header">Chats</p>}
                    {input.currentDMid==="" && <button className="Timeline-Like-Button"
                            onClick={(e) => {
                                createDM()
                            }}>makeDmRequest
                    </button>}

                    { input.currentDMid === "" && 
                        (input.DMS).map((DM)=>(
                        <div>
                        {DM.DM.check===false && DM.DM.creator!==input.username &&
                            <div>
                            <b>Accept {DM.DM.creator}'s DM</b> 

                            <button onClick={(e)=>{
                                acceptDM(e,DM.DM.ID)
                            }}>
                                <b>+</b>
                            </button>
                            <button onClick={(e)=>{
                                 deleteDM(e,DM.DM.ID)
                            }}>
                                <b>x</b>
                            </button>
                            </div>
                        }

                        {DM.DM.check===false && DM.DM.creator===input.username &&
                            <div>
                                <b>Request to {DM.DM.user} is pending</b> 
                            </div>
                        }      

                        { DM.DM.check === true &&
                            <button onClick={(e)=>{
                                enterDM(DM.DM.id)
                            }}>
                                {DM.DM.creator === input.username ? DM.DM.user: DM.DM.creator}
                            </button>
                        }   
                        </div>))
                    }

                    { input.currentDMid !== "" &&
                        <div className="DM-wrapper">
                            <button className="DM-back"onClick={(e)=>{
                                leaveDM()
                            }}>
                                {"<- BACK"}
                            </button>

                            <span className="DM-name">@{input.currentDMcontent.otherUser}</span>

                            <div className="Timeline-Horizontal-Bar"/>

                            <div className="DM-messages">
                                {(input.currentDMcontent.messages).map((message)=>
                                <p>{message.author}: {message.content}</p>
                            )}
                            </div>


                            <textarea className="DM-textarea"
                                onChange={handleChange} value={input.message} id="message" name="message" placeholder="Say something...">
                            </textarea>
                            <button className="DM-send-button" onClick={(e)=>{
                                sendDM(e,input.currentDMid)
                            }}>
                            <b>Send message</b>
                            </button>

                        </div>

                    }                 
            </span>
        </body>
    );
}
export default Timeline;
