const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const assert = require("assert");
const sendMail = require('../mail.js');
const sendMailAcc = require('../mail_account');
const { $where } = require("../models/userModel");
const { getSystemErrorMap } = require("util");
var fs = require('fs');
const path = require('path');
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const DM = require("../models/dmsModel");

router.post("/follow", (req, res) => {
    const user = req.body.user; //get current user
    const followed_user = req.body.followed_user; //get user who is getting followed
    
    const criteria = {username: user} //criteria to search for "user"
    const criteria_followed = {username: followed_user} //criteria to search for "followed_user"
    
    const update = {$addToSet: {following: followed_user}} //update to add "followed_user" to "user"s following  
    const update_followed = {$addToSet: {followers: user}} //update to add "user" to "followed_user"s followed

    //add "followed_user" to "user"s following
    User.findOneAndUpdate(criteria, update, function(err, users) {
    }, {collection: 'users'});

    //add "user" to "followed_user"s followed
    User.findOneAndUpdate(criteria_followed, update_followed, function(err, users) {
        res.json(users)
    }, {collection: 'users'});
})

router.post("/unfollow", (req, res) => {
    const user = req.body.user; //get current user
    const followed_user = req.body.followed_user; //get user who is getting followed
    
    const criteria = {username: user} //criteria to search for "user"
    const criteria_followed = {username: followed_user} //criteria to search for "followed_user"
    
    const update = {$pull: {following: followed_user}} //update to remove "followed_user" to "user"s following
    const update_followed = {$pull: {followers: user}} //update to remove "user" to "followed_user"s followed

    //remove "followed_user" to "user"s following
    User.findOneAndUpdate(criteria, update, function(err, users) {
    }, {collection: 'users'});

    //remove "user" to "followed_user"s followed
    User.findOneAndUpdate(criteria_followed, update_followed, function(err, users) {
        res.json(users)
    }, {collection: 'users'});
})

router.post("/block", (req, res) => {
    const user = req.body.user; //get current user
    const blocked_user = req.body.blocked_user; //get user who is getting followed
    
    const criteria = {username: user} //criteria to search for "user"
    const criteria_blocked = {username: blocked_user} //criteria to search for "followed_user"
    
    const update = {$addToSet: {blocking: blocked_user}} //update to add "followed_user" to "user"s following  
    const update_blocked = {$addToSet: {blockers: user}} //update to add "user" to "followed_user"s followed

    //add "followed_user" to "user"s following
    User.findOneAndUpdate(criteria, update, function(err, users) {
    }, {collection: 'users'});

    //add "user" to "followed_user"s followed
    User.findOneAndUpdate(criteria_blocked, update_blocked, function(err, users) {
        res.json(users)
    }, {collection: 'users'});
})

router.post("/unblock", (req, res) => {
    const user = req.body.user; //get current user
    const blocked_user = req.body.blocked_user; //get user who is getting followed
    
    const criteria = {username: user} //criteria to search for "user"
    const criteria_blocked = {username: blocked_user} //criteria to search for "followed_user"
    
    const update = {$pull: {blocking: blocked_user}} //update to remove "followed_user" to "user"s following
    const update_blocked = {$pull: {blockers: user}} //update to remove "user" to "followed_user"s followed

    //remove "followed_user" to "user"s following
    User.findOneAndUpdate(criteria, update, function(err, users) {
    }, {collection: 'users'});

    //remove "user" to "followed_user"s followed
    User.findOneAndUpdate(criteria_blocked, update_blocked, function(err, users) {
        res.json(users)
    }, {collection: 'users'});
})

router.post("/createUser", (req, res) => {
    const code = Math.floor(1000 + Math.random() * 9000); //create random confirmation code
    const username = req.body.username; //get username
    const password = req.body.password; //get password
    const email = req.body.email; //get email
    const bio = "";  //make empty bio
    const imgPath='./Blank-Profile.png'; //set default profile picture path
    const allowDM ="All";

    const newUser = new User({ //create new user object
        username,
        allowDM,
        password,
        email,
        bio,
        img: { data: Buffer, contentType: String},
        code,
        verification: false
    });

    newUser.img.data=fs.readFileSync(path.resolve(__dirname,imgPath)); //set profile picture from path
    newUser.img.contentType = "image/png";
    
    sendMailAcc(email, code) //set confirmation email

    newUser.save(); //save new user to database
    res.json("Success!");
});

router.post("/getUsers", (req, res) => {
    try {
        const request = req.body.username; //get username/email
        let criteria = (request.indexOf('@') == -1) ? {username: request} : {email: request}; //criteria to search for user

        //find user
        //return user
        User.findOne(criteria, function(err, users) {
            res.json(users)
        }, {collection: 'users'})

    } catch(e) {
        console.log("Error Detected in /getUsers");
    }
});

router.post("/getAllUsers", (req, res) => {
    try {
        User.find({}, function(err, users) {
            res.json(users)
        }, {collection: 'users'})

    } catch(e) {
        console.log("Error Detected in /getUsers");
    }
});

router.post("/getPosts", (req, res) => {
    try {
        let criteria = {}; //no criteria yet - show all posts

        //find all posts
        //return all posts
        Post.find(criteria, function(err, posts) {
            res.json(posts)
        }, {collection: 'posts'})

    } catch(e) {
        console.log("Error Detected in /getPosts");
    }
});

router.post("/getPostsFromUser", (req, res) => {
    try {
        let criteria = {author: req.body.username}; 

        //find all posts
        //return all posts
        Post.find(criteria, function(err, posts) {
            res.json(posts)
        }, {collection: 'posts'})

    } catch(e) {
        console.log("Error Detected in /getPosts");
    }
});

router.post("/emailVerification", (req, res) => {
    try {
        let criteria = {email: req.body.email, code: req.body.code};
        let update = {code: null, verification: true};

        User.findOneAndUpdate(criteria, update, function(err, users) {
            res.json(users)
        }, {collection: 'users'});
    } catch (e) {
        console.log(e);
    }
});

router.post("/changePassword", (req, res) => {
    var ObjectId = require("mongodb").ObjectId;

    const update = {password: req.body.password}; //update password
    const id = new ObjectId(req.body.id); //get object id

    let criteria = {_id: id}; //criteria to find user

    //update user with new password; return user
    User.findOneAndUpdate(criteria, update, function(err, users) {
        res.json(users)
    }, {collection: 'users'})

});

router.post("/forgotPassword", (req, res) => {
    try {
        const email = req.body.email; //get email
        let criteria = {email: email}; //criteria to find user
        const code = Math.floor(1000 + Math.random() * 9000); //generate confirmation code
        
        //find user from email
        User.findOne(criteria, function (err, info) {
            //if no user found - return null
            if (info == null) {
                res.json(null)
            } else { //if user found, send confirmation email
                sendMail(info.email, code, info._id)
                res.json(code) //return confirmation code
            }
        }, {collection: 'users'})

    } catch (e) {
        console.log(e);
    }
});

router.post("/editBio", (req, res) => {
    try {
        const newBio = req.body.bio; //get new bio
        const username = req.body.username; //get username
        let criteria = {username: username}; //criteria to find user
        let update = {bio: newBio}; //update to change bio

        //update user bio; return user
        User.findOneAndUpdate(criteria, update, function(err, users) {
            res.json(users)
        }, {collection: 'users'});

    } catch (e) {
        console.log(e);
    }
});

router.post("/editImage", (req, res) => {
    try {
        const newImage = req.body.image; //get new image
        var picdata=newImage.substring(23); //get new image data
        const username = req.body.username; //get username
        let criteria = {username: username}; //criteria to find user
        var imagedata= { //new image object
            img: { data: Buffer, contentType: String }
        }
        //make new image object
        var buf=Buffer.from(picdata,'base64') 
        imagedata.data=buf;
        imagedata.contentType = "image/png";
        let update= {img: imagedata}; //update for new image

        //update with user with new image and return user
        User.findOneAndUpdate(criteria, update, function(err, users) {
            res.json(users)
        }, {collection: 'users'});

    } catch (e) {
        console.log(e);
    }
});

router.post("/deleteUser", (req, res) => {
    try {
        const username = req.body.username; //get username
        let criteria = {username: username}; //criteria to get username

        //delete and return user
        User.findOneAndDelete(criteria, function(err, users) {
            res.json(users)
        }, {collection: 'users'});

        let postCrit = {author: username}
        Post.deleteMany(postCrit, function(err, posts){

        }, {collection: "posts"})

        Comment.deleteMany(postCrit, function(err, comments){

        }, {collection: "comments"})

        let likeCrit = {likers: username}
        const likeUpdate = {$pull: {likers: username}} //updat to remove user from likers
        Post.updateMany(likeCrit, likeUpdate, function (err, docs) {
        })

        Comment.updateMany(likeCrit, likeUpdate, function (err, docs) {
        })

        let userCrit = {    $or: [
            {followers: username},
            {following: username},
            {blockers: username},
            {blocking: username}
        ]};
        const userUpdate = {$pull: {followers: username, following: username, blockers: username, blocking: username}}
        User.updateMany(userCrit, userUpdate, function(err, users){
        })

        let dmCrit = {    $or: [
            {creator: username},
            {user: username}
        ]};

        DM.deleteMany(dmCrit, function(err, dms){

        }, {collection: "dms"})

    } catch (e) {
        console.log(e);
    }
});

router.post("/deletePost", (req, res) => {
    try {
        const id = req.body.id; //get post id
        let criteria = {_id: id}; //criteria to find post

        //delete and return user
        Post.findOneAndDelete(criteria, function(err, users) {
            res.json(users)
        }, {collection: 'post'});

        let commentCrit = {post: id}
        Comment.deleteMany(commentCrit, function(err, comments){
        }, {collection: 'comments'})

    } catch (e) {
        console.log(e);
    }
});

router.post("/followPage", (req, res) => {
    const view = req.body.view; //followers or following

    const userid = req.body.username;
    const criteria = {username: userid};
    let status;
    if (view === "following") {
        status = {following: 1}
    } else {
        status = {followers: 1}
    }
    User.findOne(criteria, status, function (err, users) {
        res.json(users)
    }, {collection: "users"});

})
router.post("/createPost", (req, res) => {
    const author = req.body.username; //get username
    const contents = req.body.contents; //get post contents
    const topic = req.body.topic; //get post topic
    const anon = req.body.anon;
    const likers = []; //empty likers array - no likes yet 

    //create new post object
    const newPost = new Post({
        contents,
        topic,
        author,
        likers,
        anon
    });

    newPost.save(); //save new post in db
});

router.post("/likePost", (req, res) => {
    const username = req.body.username; //get username
    const id = req.body.id; //get id
    const criteria = {_id: id} //criteria to find post
    const update = {$addToSet: {likers: username}} //update to add user to likers 

    //find post and add add user to likers 
    Post.findOneAndUpdate(criteria, update, function(err, posts) {
        res.json(posts) //return post
        
    }, {collection: 'posts'});

    
});

router.post("/unlikePost", (req, res) => {
    const username = req.body.username; //get username
    const id = req.body.id; //get id
    const criteria = {_id: id}; //criteria to find post
    const update = {$pull: {likers: username}} //updat to remove user from likers

    //find post and remove user from likers
    Post.findOneAndUpdate(criteria, update, function(err, posts) {
        res.json(posts) //return post
    }, {collection: 'posts'});

});

router.post("/getPost", (req, res) => {
    try {
        const id = req.body.id; //get id
        let criteria = {_id: id}; //get criteria to find post

        //find and return post
        Post.findOne(criteria, function(err, posts) {
            res.json(posts)
        }, {collection: 'posts'});

    } catch (e) {
        console.log(e);
    }
});

router.post("/getLikedPosts", (req, res) => {
    try {
        const username = req.body.username; //get id
        let criteria = {likers: username}; //get criteria to find post

        //find and return post
        Post.find(criteria, function(err, posts) {
            res.json(posts)
        }, {collection: 'posts'});

    } catch (e) {
        console.log(e);
    }
});

router.post("/createComment", (req, res) => {
    const post = req.body.post; //get post
    const author = req.body.author; //get username
    const contents = req.body.contents; //get post contents
    const likers = []; //empty likers array - no likes yet

    //create new post object
    const newComment = new Comment({
        contents,
        author,
        post,
        likers
    });

    newComment.save(); //save new post in db
});

router.post("/getComments", (req, res) => {
    try {
        let criteria = {post: req.body.id};

        //find all posts
        //return all posts
        Comment.find(criteria, function(err, comments) {
            res.json(comments)
        }, {collection: 'posts'})

    } catch(e) {
        console.log(e);
    }
});

router.post("/getComment", (req, res) => {
    try {
        let criteria = {_id: req.body.id}; 

        //find all posts
        //return all posts
        Comment.findOne(criteria, function(err, comment) {
            res.json(comment)
        }, {collection: 'comments'})

    } catch(e) {
        console.log("Error Detected in /getComment");
    }
});

router.post("/likeComment", (req, res) => {
    const username = req.body.username; //get username
    const id = req.body.id; //get id
    const criteria = {_id: id} //criteria to find post
    const update = {$addToSet: {likers: username}} //update to add user to likers 

    //find post and add add user to likers 
    Comment.findOneAndUpdate(criteria, update, function(err, comment) {
        res.json(comment) //return post
        
    }, {collection: 'comments'});

    
});

router.post("/unlikeComment", (req, res) => {
    const username = req.body.username; //get username
    const id = req.body.id; //get id
    const criteria = {_id: id}; //criteria to find post
    const update = {$pull: {likers: username}} //updat to remove user from likers

    //find post and remove user from likers
    Comment.findOneAndUpdate(criteria, update, function(err, comment) {
        res.json(comment) //return post
    }, {collection: 'comments'});

});

router.post("/deleteComment", (req, res) => {
    try {
        const id = req.body.id; //get post id
        let criteria = {_id: id}; //criteria to find post

        //delete and return user
        Comment.findOneAndDelete(criteria, function(err, users) {
            res.json(users)
        }, {collection: 'comments'});

    } catch (e) {
        console.log(e);
    }
});

router.post("/followTopic", (req, res) => {
    const username = req.body.username;
    let criteria = {username: username};

    const update = {$addToSet: {topics: req.body.topic}}

    User.findOneAndUpdate(criteria, update, function(err, user){
        res.json(user)
    }, {collection: "users"})
});

router.post("/unfollowTopic", (req, res) => {
    const username = req.body.username;
    let criteria = {username: username};

    const update = {$pull: {topics: req.body.topic}}

    User.findOneAndUpdate(criteria, update, function(err, user){
        res.json(user)
    }, {collection: "users"})
});
router.post("/createDM", (req, res) => {
    const creator = req.body.author; //get post contents
    const user = req.body.target;
    const messages=[];
    const check=false;
    //create new DM object
    const newDM = new DM({
        creator,
        user,
        messages,
        check
    });

    newDM.save(); //save new DM in db
});
router.post("/getDMS", (req, res) => {
    try {
        let criteria = {$or:[{author: req.body.creator},{target: req.body.user}]};

        //find all DMS involving user
        //return all DMS involving user
        DM.find(criteria, function(err, dms) {
            res.json(dms)
        }, {collection: 'dms'})

    } catch(e) {
        console.log(e);
    }
});

router.post("/acceptDM", (req, res) => {
    try{
        let criteria = {_id: req.body.id};
        let update = {$set: {check: true}}

        DM.findOneAndUpdate(criteria, update, function(err, dm){
            res.json(dm)
        }, {collection: 'dms'})
    }catch(e){
        console.log(e)
    }
});

router.post("/sendDM", (req, res) => {
    try{
        let criteria = {_id: req.body.id};
        let update = {$push: {messages: {author: req.body.author, content: req.body.content}}}

        DM.findOneAndUpdate(criteria, update, function(err, dm){
            res.json(dm)
        }, {collection: 'dms'})
    }catch(e){
        console.log(e)
    }
});

router.post("/deleteDM", (req, res) => {
    try{
        let criteria = {_id: req.body.id};
        
        DM.findOneAndDelete(criteria, function(err, dm){
            res.json(dm)
        }, {collection: 'dms'})

    }catch(e){
        console.log(e)
    }
});

router.post("/getDM", (req, res) => {
    try {
        let criteria = {_id: req.body.id};

        //find all DMS involving user
        //return all DMS involving user
        DM.findOne(criteria, function(err, dms) {
            res.json(dms)
        }, {collection: 'dms'})

    } catch(e) {
        console.log(e);
    }
});
router.post("/changeDMMode", (req, res) => {
    try {
        let criteria = {username: req.body.username};
        const update = {allowDM: req.body.allowDM};

        User.findOneAndUpdate(criteria, update, function(err, users) {
            res.json(users)
        }, {collection: 'users'});

    } catch(e) {
        console.log(e);
    }
});
module.exports = router;