package Springboot;
public class Topic {
    private String name;
    private Post[] posts;
    private int postsCount;
    private Profile[] followers;
    private int followersCount;

    public Topic(String name) {
        this.name = name;
        this.posts = new Post[1000];
        this.followers = new Profile[1000];
        this.postsCount = 0;
        this.followersCount = 0;
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

    public void addPost(Post p) {
        if (postsCount == posts.length) {
            Post[] newPosts = new Post[postsCount * 2];
            for (int i = 0; i < postsCount; i++) {
                newPosts[i] = posts[i];
            }
            posts = newPosts;
        }
        posts[postsCount++] = p;
    }
}
