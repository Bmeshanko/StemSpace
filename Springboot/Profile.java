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
}