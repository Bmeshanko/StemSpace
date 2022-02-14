package net.stemspace.springboot;
import java.sql.Timestamp;

public class Comment {
    private String text;
    private Profile author;
    private Comment[] replies;
    private int repliesCount;
    private Post post;
    private Comment parent;
    private Timestamp time;

    public Comment(String text, Profile author, Post post, Comment parent) {
        this.text = text;
        this.author = author;
        this.post = post;
        this.parent = parent;
        this.time = new Timestamp(System.currentTimeMillis());

        // This will add the comment as a reply on the parent.
        if (parent != null) {
            parent.addReply(this);
        }
    }

    public Comment getParent() {
        return parent;
    }

    public Profile getAuthor() {
        return author;
    }

    public String getText() {
        return text;
    }

    public Timestamp getTime(){
        return time;
    }

    public Post getPost(){
        return post;
    }

    public Comment[] getReplies(){
        return replies;
    }

    public void addReply(Comment c) {
        //if replies array is full, double the array size
        if (repliesCount == replies.length) {
            Comment[] newReplies = new Comment[repliesCount * 2];
            for (int i = 0; i < repliesCount; i++) {
                newReplies[i] = replies[i];
            }
            replies = newReplies;
        }
        replies[repliesCount++] = c;
        this.post.addComment(c);
    }

    public void removeReply(Comment c) {
        //if replies array less than half full, shorten array size
        if (repliesCount * 2 < replies.length) {
            Comment[] newReplies = new Comment[repliesCount + 1];
            for (int i = 0; i < repliesCount; i++) {
                if (replies[i] == null) break;
                newReplies[i] = replies[i];
            }
            replies = newReplies;
        }

        //find comment in replies array and remove it
        for (int i = 0; i < repliesCount; i++) {
            if (replies[i].equals(c)) {
                while (i < repliesCount - 1) {
                    replies[i] = replies[i + 1];
                }
            }
        }
        replies[repliesCount--] = null;
    }
}
