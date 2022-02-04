package Springboot;
public class Topic {
    private String name;
    private Post[] posts;
    private int postCount;
    private Profile[] followers;
    private int followersCount;

    public Topic(String name) {
        this.name = name;
        this.posts = new Post[1000];
        this.followers = new Profile[1000];
        this.postCount = 0;
        this.followersCount = 0;
    }
}
