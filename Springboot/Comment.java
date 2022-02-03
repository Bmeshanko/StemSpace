package Springboot;
public class Comment {
    private String text;
    private Profile author;
    private Comment[] replies;
    private Post post;
    private Comment parent;
    public Comment(String text, Profile author, Post post, Comment parent) {
        this.text = text;
        this.author = author;
        this.post = post;
        this.parent = parent;
    }
}
