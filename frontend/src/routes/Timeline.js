import './Timeline.css';
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Timeline() {
    
    const navigate = useNavigate();
    const location = useLocation();

    const [input, setInput] = useState({
        username: location.state.username,
        posts: [],
        following: [],
        viewing: "",
        topic: "None",
        blocked: []
    })

    useEffect(()=>{
        axios.post("/getUsers", {
			username: location.state.username
		}).then (res => {
            for(let i = 0; i < res.data.following.length; i++){
                input.following.push(res.data.following[i]);
            }
            for(let i = 0; i < res.data.blocking.length; i++){
                input.blocked.push(res.data.blocking[i])
            }
            for(let i = 0; i < res.data.blockers.length; i++){
                input.blocked.push(res.data.blockers[i])
            }
		}).catch(function (error) {
			console.log("Error Detected")
		})
    },[input.blocked, input.following, location.state.username]);

    useEffect(()=>{
        axios.post("/getPosts", {
			//criteria would go here
		}).then (res => {
            //put in console all the posts
            let temp=[];
            let promises=[];
            for(let i = 0; i < res.data.length; i++){
                promises.push(axios.post("/getUsers", {
                    username: res.data[i].author
                }).then (response=> {
                    let base64Flag = 'data:image/jpeg;base64,';
                    let imageStr = arrayBufferToBase64(response.data.img.data.data);
                    let picture=base64Flag+imageStr;
                    temp[i] = {post: {author: res.data[i].author,
                        contents: res.data[i].contents,
                        topic: res.data[i].topic,
                        id: res.data[i]._id,
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

    function removeBlocks(post){
        return !(input.blocked.includes(post.post.author));
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
            //code for filtering array by only topics that the user follows
        }
        filteredArray = filteredArray.filter(removeBlocks);
        return filteredArray;
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

    return(
        <body>
            <div className="Timeline-Top-Banner">
                <button className="Timeline-Logo-Button"
                    onClick={handleClickLogo}>
                            
                    <img className='Timeline-Logo-Image' src="Logo_new.png" alt="STEM"></img>
                </button>

                <div className="Timeline-Banner-Text">StemSpace</div>

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

                <select className="Topic-Selector" name="topic" id="topic" value={input.topic} onChange={viewTopic}>
                    <option className="Timeline-Topic-Selection" value="None">No Topic</option>
                    <option className="Timeline-Topic-Selection" value="Follow">Followed Topics</option>
                    <option className="Timeline-Topic-Selection" value="Art">Art</option>
                    <option className="Timeline-Topic-Selection" value="Biology">Biology</option>
                    <option className="Timeline-Topic-Selection" value="Blogs">Blogs</option>
                    <option className="Timeline-Topic-Selection" value="ComSci">ComSci</option>
                    <option className="Timeline-Topic-Selection" value="Earth">Earth</option>
                    <option className="Timeline-Topic-Selection" value="Engineering">Engineering</option>
                    <option className="Timeline-Topic-Selection" value="Fitness">Fitness</option>
                    <option className="Timeline-Topic-Selection" value="Funny">Funny</option>
                    <option className="Timeline-Topic-Selection" value="Gaming">Gaming</option>
                    <option className="Timeline-Topic-Selection" value="Health">Health</option>
                    <option className="Timeline-Topic-Selection" value="Math">Math</option>
                    <option className="Timeline-Topic-Selection" value="Music">Music</option>
                    <option className="Timeline-Topic-Selection" value="Psychology">Psychology</option>
                    <option className="Timeline-Topic-Selection" value="Sports">Sports</option>
                </select>
            </header>

            <div className="Timeline-Horizontal-Bar"/>

            <span class="Timeline-Posts-Wrapper">
                {filterPosts(input.posts, input.viewing, input.topic).map((post)=>(
                    <div className="Timeline-Post">
                        
                        <button className="Timeline-Post-Name" 
                            onClick={(event) => {
                                handleClickName(event, post.post.author)}}>
                            
                            <img className='Timeline-Post-PFP' src={post.post.image} alt={"PFP of" + post.post.author}></img>
                            <b>@{post.post.author}</b>

                        </button>  

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
                    <p className="DM-header">Chats</p>
            </span>
        </body>
    );
}

export default Timeline;
