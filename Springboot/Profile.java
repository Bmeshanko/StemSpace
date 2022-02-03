package Springboot;
public class Profile {
    private String id;
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

    public Profile() {
        // Needs plenty of parameters.
    }

}