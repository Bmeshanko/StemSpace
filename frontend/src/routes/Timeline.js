import './Timeline.css';
import {Link} from "react-router-dom";

function Timeline() {
    return(
        <body>
            <p className="Timeline-banner">StemSpace</p>
            <div className="Timeline-bar-horizontal"/>
            <header className="Timeline-selector">
                <p className="Timeline-following">Following</p>
                <div className="Timeline-bar-vertical"/>
                <p className="Timeline-topics">Topics</p>
            </header>
            <div className="Timeline-bar-horizontal"/>
        </body>
    );
}

export default Timeline;
