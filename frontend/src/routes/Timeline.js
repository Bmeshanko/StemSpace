import './Timeline.css';
import {Link} from "react-router-dom";

function Timeline() {
    return(
        <body className="wrapper">
        <p className="Timeline-banner">StemSpace
            <img src="DM.png"
                 className="DM-Logo"
                 alt="DM"/>
            <img src="Notification.png"
                 className="Notification-Logo"
                 alt="Notification"/>
        </p>
        <div className="Timeline-bar-horizontal"/>
        <header className="Timeline-selector">
            <p className="Timeline-following">Following</p>
            <div className="Timeline-bar-vertical"/>
            <p className="Timeline-topics">Topics</p>
        </header>
        <div className="Timeline-bar-horizontal"/>
        <header className="Direct-messages">

        </header>
        <span class="Timeline-posts">
                posts
        </span>
        <span class="Timeline-DMs">
                <p className="DM-header">Chats</p>
        </span>
        </body>
    );
}

export default Timeline;
