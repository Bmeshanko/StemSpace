package Springboot;
import java.sql.Timestamp;
public class Profile {
    private String username;
    private String name;
    private String email;
    private String password; // Serializable?
    private String bio;
    private Profile[] followers;
    private int followersCount;
    private Profile[] following;
    private int followingCount;
    private Profile[] blockedUsers;
    private int blockedUsersCount;
    private Profile[] mutedUsers;
    private int mutedUsersCount;
    private Topic[] followingTopics;
    private int followingTopicsCount;
    private Post[] likedPosts;
    private int likedPostsCount;
    private Comment[] comments;
    private int commentsCount;
    private Post[] posts;
    private int postsCount;
    private Timestamp creationDate;

    public Profile(String username, String name, String email, String password) {
        this.setUsername(username);
        this.setName(name);
        this.setEmail(email);
        this.setPassword(password);
        this.followers = new Profile[200];
        this.following = new Profile[200];
        this.blockedUsers = new Profile[10];
        this.mutedUsers = new Profile[10];
        this.followingTopics = new Topic[20];
        this.likedPosts = new Post[200];
        this.comments = new Comment[100];
        this.followersCount = 0;
        this.followingCount = 0;
        this.blockedUsersCount = 0;
        this.mutedUsersCount = 0;
        this.followingTopicsCount = 0;
        this.likedPostsCount = 0;
        this.commentsCount = 0;
        this.creationDate = new Timestamp(System.currentTimeMillis());
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    //SHA-1 hashing? 
    //is the argument going to be already hashed
    //or will hashing be done in this method?
    public void setPassword(String password) {
        this.password = password;
    }

    public String getBio(){
        return bio;
    }

    public void setBio(String bio){
        this.bio = bio;
    }

    public Profile[] getBlockedUsers() {
        return blockedUsers;
    }

    public Profile[] getMutedUsers() {
        return mutedUsers;
    }

    public int getFollowersCount(){
        return followersCount;
    }

    public void addFollower(Profile p) {
        // If the array is full, double its size.
        // O(1) Insertion, O(n) Doubling.
        if (followersCount == followers.length) {
            Profile[] newFollowers = new Profile[followersCount * 2];
            for (int i = 0; i < followersCount; i++) {
                newFollowers[i] = followers[i];
            }
            followers = newFollowers;
        }
        followers[followersCount++] = p;
    }

    public void removeFollower(Profile p) {
        // If the array is less than full capacity, "half" its size.
        // O(n) Deletion, O(n) Halving.
        if (followersCount * 2 < followers.length) {
            Profile[] newFollowers = new Profile[followersCount + 1];
            for (int i = 0; i < followersCount; i++) {
                if (followers[i] == null) break;
                newFollowers[i] = followers[i];
            }
            followers = newFollowers;
        }

        for (int i = 0; i < followersCount; i++) {
            if (followers[i].equals(p)) {
                while (i < followersCount - 1) {
                    followers[i] = followers[i + 1];
                }
            }
        }
        followers[followersCount--] = null;
    }

    public int getFollowingCount(){
        return followingCount;
    }

    public void followUser(Profile p) {
        if (followingCount == following.length) {
            Profile[] newFollowing = new Profile[followingCount * 2];
            for (int i = 0; i < followingCount; i++) {
                newFollowing[i] = following[i];
            }
            following = newFollowing;
        }
        following[followingCount++] = p;
    }

    public void unfollowUser(Profile p) {
        if (followingCount * 2 < following.length) {
            Profile[] newFollowing = new Profile[followingCount + 1];
            for (int i = 0; i < followingCount; i++) {
                if (following[i] == null) break;
                newFollowing[i] = following[i];
            }
            following = newFollowing;
        }

        for (int i = 0; i < followingCount; i++) {
            if (following[i].equals(p)) {
                while (i < followingCount - 1) {
                    following[i] = following[i + 1];
                }
            }
        }
        following[followingCount--] = null;
    }

    public int getBlockedUsersCount(){
        return blockedUsersCount;
    }

    public void blockUser(Profile p) {
        if (blockedUsersCount == blockedUsers.length) {
            Profile[] newBlockedUsers = new Profile[blockedUsersCount * 2];
            for (int i = 0; i < blockedUsersCount; i++) {
                newBlockedUsers[i] = blockedUsers[i];
            }
            blockedUsers = newBlockedUsers;
        }
        blockedUsers[blockedUsersCount++] = p;
    }

    public void unblockUser(Profile p) {
        if (blockedUsersCount * 2 < blockedUsers.length) {
            Profile[] newBlockedUsers = new Profile[blockedUsersCount + 1];
            for (int i = 0; i < blockedUsersCount; i++) {
                if (blockedUsers[i] == null) break;
                newBlockedUsers[i] = blockedUsers[i];
            }
            blockedUsers = newBlockedUsers;
        }

        for (int i = 0; i < blockedUsersCount; i++) {
            if (blockedUsers[i].equals(p)) {
                while (i < blockedUsersCount - 1) {
                    blockedUsers[i] = blockedUsers[i + 1];
                }
            }
        }
        blockedUsers[blockedUsersCount--] = null;
    }

    public int getMutedUsersCount(){
        return mutedUsersCount;
    }

    public void muteUser(Profile p) {
        if (mutedUsersCount == mutedUsers.length) {
            Profile[] newMutedUsers = new Profile[mutedUsersCount * 2];
            for (int i = 0; i < mutedUsersCount; i++) {
                newMutedUsers[i] = mutedUsers[i];
            }
            mutedUsers = newMutedUsers;
        }
        mutedUsers[mutedUsersCount++] = p;
    }

    public void unmuteUser(Profile p) {
        if (mutedUsersCount * 2 < mutedUsers.length) {
            Profile[] newMutedUsers = new Profile[mutedUsersCount + 1];
            for (int i = 0; i < mutedUsersCount; i++) {
                if (mutedUsers[i] == null) break;
                newMutedUsers[i] = mutedUsers[i];
            }
            mutedUsers = newMutedUsers;
        }

        for (int i = 0; i < mutedUsersCount; i++) {
            if (mutedUsers[i].equals(p)) {
                while (i < mutedUsersCount - 1) {
                    mutedUsers[i] = mutedUsers[i + 1];
                }
            }
        }
        mutedUsers[mutedUsersCount--] = null;
    }

    public int getFollowingTopicsCount(){
        return followingTopicsCount;
    }

    public void followTopic(Topic t) {
        if (followingTopicsCount == followingTopics.length) {
            Topic[] newFollowingTopics = new Topic[followingTopicsCount * 2];
            for (int i = 0; i < followingTopicsCount; i++) {
                newFollowingTopics[i] = followingTopics[i];
            }
            followingTopics = newFollowingTopics;
        }
        followingTopics[followingTopicsCount++] = t;
    }

    public void unfollowTopic(Topic t) {
        if (followingTopicsCount * 2 < followingTopics.length) {
            Topic[] newFollowingTopics = new Topic[followingTopicsCount + 1];
            for (int i = 0; i < followingTopicsCount; i++) {
                if (followingTopics[i] == null) break;
                newFollowingTopics[i] = followingTopics[i];
            }
            followingTopics = newFollowingTopics;
        }

        for (int i = 0; i < followingTopicsCount; i++) {
            if (followingTopics[i].equals(t)) {
                while (i < followingTopicsCount - 1) {
                    followingTopics[i] = followingTopics[i + 1];
                }
            }
        }
        followingTopics[followingTopicsCount--] = null;
    }

    public int getLikedPostsCount(){
        return likedPostsCount;
    }

    public void likePost(Post p) {
        if (likedPostsCount == likedPosts.length) {
            Post[] newLikedPosts = new Post[likedPostsCount * 2];
            for (int i = 0; i < likedPostsCount; i++) {
                newLikedPosts[i] = likedPosts[i];
            }
            likedPosts = newLikedPosts;
        }
        likedPosts[likedPostsCount++] = p;
        p.addLike();
    }

    public void unlikePost(Post p) {
        if (likedPostsCount * 2 < likedPosts.length) {
            Post[] newLikedPosts = new Post[likedPostsCount + 1];
            for (int i = 0; i < likedPostsCount; i++) {
                if (likedPosts[i] == null) break;
                newLikedPosts[i] = likedPosts[i];
            }
            likedPosts = newLikedPosts;
        }

        for (int i = 0; i < likedPostsCount; i++) {
            if (likedPosts[i].equals(p)) {
                while (i < likedPostsCount - 1) {
                    likedPosts[i] = likedPosts[i + 1];
                }
            }
        }
        likedPosts[likedPostsCount--] = null;
        p.removeLike();
    }

    public int getCommentsCount(){
        return commentsCount;
    }

    public void comment(String text, Post post, Comment parent) {
        Comment c = new Comment(text, this, post, parent);
        if (commentsCount == comments.length) {
            Comment[] newComments = new Comment[commentsCount * 2];
            for (int i = 0; i < commentsCount; i++) {
                newComments[i] = comments[i];
            }
            comments = newComments;
        }
        comments[commentsCount++] = c;
        post.addComment(c);
        if (parent != null) {
            parent.addReply(c);
        }
    }

    public void removeComment(Comment c) {
        if (commentsCount * 2 < comments.length) {
            Comment[] newComments = new Comment[commentsCount + 1];
            for (int i = 0; i < commentsCount; i++) {
                if (comments[i] == null) break;
                newComments[i] = comments[i];
            }
            comments = newComments;
        }

        for (int i = 0; i < commentsCount; i++) {
            if (comments[i].equals(c)) {
                while (i < commentsCount - 1) {
                    comments[i] = comments[i + 1];
                }
            }
        }
        comments[commentsCount--] = null;
        if (c.getParent() != null) {
            c.getParent().removeReply(c);
        }
        // Java's Garbage collector should kick in here - not entirely sure though.
    }

    public int getPostsCount(){
        return postsCount;
    }

    public void post(String text, Topic topic) {
        Post p = new Post(this, text, topic);
        if (postsCount == posts.length) {
            Post[] newPosts = new Post[postsCount * 2];
            for (int i = 0; i < postsCount; i++) {
                newPosts[i] = posts[i];
            }
            posts = newPosts;
        }

        posts[postsCount++] = p;
        if (topic != null) {
            topic.addPost(p);
        }
    }

    public void deletePost(Post p) {
        if (postsCount * 2 < posts.length) {
            Post[] newPosts = new Post[postsCount + 1];
            for (int i = 0; i < postsCount; i++) {
                if (posts[i] == null) break;
                newPosts[i] = posts[i];
            }
            posts = newPosts;
        }

        for (int i = 0; i < postsCount; i++) {
            if (posts[i].equals(p)) {
                while (i < postsCount - 1) {
                    posts[i] = posts[i + 1];
                }
            }
        }
        posts[postsCount--] = null;
        
        if (p.getTopic() != null) {
            p.getTopic().removePost(p);
        }

        for (int i = 0; i < p.getComments().length; i++) {
            Comment c = p.getComments()[i];
            c.getAuthor().removeComment(c);
        }
    }

    public Timestamp getCreationDate(){
        return creationDate;
    }
}