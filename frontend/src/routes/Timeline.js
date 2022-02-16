import './Timeline.css';
import {Link} from "react-router-dom";

function Timeline() {
    return(
        <body>
            <p className="Timeline-banner">
                <img className='Logo-position' src="Logo_new.png" alt="STEM"></img>
                <p className='Stem-text'>StemSpace</p>
            </p>
            <div className="Timeline-bar-horizontal"/>
            <header className="Timeline-selector">
                <p className="Timeline-following">Following</p>
                <div className="Timeline-bar-vertical"/>
                <p className="Timeline-topics">Topics</p>
            </header>
            <div className="Timeline-bar-horizontal"/>
            <span class="posts">
                posts
            </span>
            <span class="chats">
                <p className="DM-header">Chats</p>
            </span>
        </body>
    );
}

export default Timeline;
