package Springboot;
public class Profile {
    private String username;
    private String name;
    private String email;
    private String password; // Serializable?
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

    public void setPassword(String password) {
        this.password = password;
    }

    public void addFollower(Profile p) {
        // If the array is full, double its size.
        // O(1) Insertion, O(n) doubling.
        if (followersCount == followers.length) {
            Profile[] newFollowers = new Profile[followersCount * 2];
            for (int i = 0; i < followersCount; i++) {
                newFollowers[i] = followers[i];
            }
            followers = newFollowers;
        }
        followers[followersCount++] = p;
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

    public void followTopic(Topic t) {
        if (followingTopicsCount == followingTopics.length) {
            Topic[] newFollowingTopics = new Topic[followingTopicsCount * 2];
            for (int i = 0; i < followingTopicsCount; i++) {
                newFollowingTopics[i] = newFollowingTopics[i];
            }
            followingTopics = newFollowingTopics;
        }
        followingTopics[followingTopicsCount++] = t;
    }

    
}