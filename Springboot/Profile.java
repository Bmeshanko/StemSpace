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
    private int followngTopicsCount;
    private Post[] likedPosts;
    private int likedPostsCount;
    private Comment[] comments;
    private int commentsCount;

    public Profile(String username, String name, String email, String password) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.followers = new Profile[200];
        this.following = new Profile[200];
        this.blockedUsers = new Profile[10];
        this.mutedUsers = new Profile[10];
        this.followingTopics = new Topic[20];
        this.likedPosts = new Post[200];
        this.comments = new Comment[100];
    }
}