package Springboot;
public class Post {
    private Profile author;
    private String text;
    private Topic topic;
    private Comment[] comments;
    private int commentsCount;
    private int likes;
    
    public Post(Profile author, String text, Topic topic) {
        this.author = author;
        this.text = text;
        this.topic = topic;
        this.comments = new Comment[20];
        this.commentsCount = 0;
        this.likes = 0;
    }
}
