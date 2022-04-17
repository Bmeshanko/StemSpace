import './Chat.css';
import React, {Component, useState, useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Row, Col, } from 'antd';
import { Icon } from '@ant-design/compatible';
import { render } from 'react-dom';
// import ChatSocketServer from '../../../utils/ChatSocketServer';

// class Chat extends Component {

//     constructor(properties) {
//         super(properties);
//         this.state = {
//             loading: true,
//             selectUserId: null,
//             chatListUsers: []
//         }
//     }

//     componentDidMount() {
//         const userid = this.properties.userid;
        
//     }
function Chat(){
    

    return (
        <body>
        <header className="Create-post-header">
            <p className="Create-post-text">Create Post:</p>
            {/* // <textarea onChange={handleChange} value={input.contents} id="contents" name="contents" placeholder="Write something.."> */}
            {/* // </textarea> */}
            <div className="space"></div>
            <label for="topic"><p className="topic-text">Topic: </p> </label>
            {/* <select className="topic" name="topic" id="topic" value={input.topic} onChange={handleChange}> */}
                <option value="Art">Art</option>
                <option value="Biology">Biology</option>
                <option value="Blogs">Blogs</option>
                <option value="ComSci">ComSci</option>
                <option value="Earth">Earth</option>
                <option value="Engineering">Engineering</option>
                <option value="Fitness">Fitness</option>
                <option value="Funny">Funny</option>
                <option value="Gaming">Gaming</option>
                <option value="Health">Health</option>
                <option value="Math">Math</option>
                <option value="Music">Music</option>
                <option value="Psychology">Psychology</option>
                <option value="Sports">Sports</option>
            {/* </select> */}
            <div className="space"></div>
            <button className="Signup-button2"
                    onClick={(e) => {
                        e.preventDefault();
                        console.log("clicked\n");
                        // handleClick();
                    }}><b>Submit Post</b>
            </button>
        </header>
        </body>
                // <div>
                //     <p style={{ fontSize: '2rem', textAlign: 'center' }}> Real Time Chat</p>
                // </div>

                // <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                //     <div className="infinite-container">
                //         {/* {this.props.chats && (
                //             <div>{this.renderCards()}</div>
                //         )} */}
                //         <div
                //             ref={el => {
                //                 this.messagesEnd = el;
                //             }}
                //             style={{ float: "left", clear: "both" }}
                //         />
                //     </div>

                //     <Row >
                //         <Form layout="inline" onSubmit={this.submitChatMessage}>
                //             <Col span={18}>
                //                 <Input
                //                     id="message"
                //                     prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                //                     placeholder="Let's start talking"
                //                     type="text"
                //                     value={this.state.chatMessage}
                //                     onChange={this.hanleSearchChange}
                //                 />
                //             </Col>
                //             <Col span={2}>
                                
                //             </Col>

                //             <Col span={4}>
                //                 <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage}  htmlType="submit">
                //                     <Icon type="enter" />
                //                 </Button>
                //             </Col>
                //         </Form>
                //     </Row>
                // </div>
    );

}

export default Chat