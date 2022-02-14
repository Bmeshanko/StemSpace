package net.stemspace.springboot;
import java.sql.Timestamp;

public class Post {
    private Profile author;
    private String text;
    private Topic topic;
    private Comment[] comments;
    private int commentsCount;
    private int likes;
    private Timestamp time;

    public Post(Profile author, String text, Topic topic) {
        this.author = author;
        this.text = text;
        this.topic = topic;
        this.comments = new Comment[20];
        this.commentsCount = 0;
        this.likes = 0;
        this.time = new Timestamp(System.currentTimeMillis());
    }

    public Profile getAuthor() {
        return author;
    }

    public Comment[] getComments() {
        return comments;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public String getText(){
        return text;
    }

    public Timestamp getTime(){
        return time;
    }

    public void addComment(Comment c) {
        //if comments array is full, double the length
        if (commentsCount == comments.length) {
            Comment[] newComments = new Comment[commentsCount * 2];
            for (int i = 0; i < commentsCount; i++) {
                newComments[i] = comments[i];
            }
            comments = newComments;
        }
        //add new comment at end of array
        comments[commentsCount++] = c;
    }

    public void removeComment(Comment c) {
        //if comment array is less than half full, shorten array length
        if (commentsCount * 2 < comments.length) {
            Comment[] newComments = new Comment[commentsCount + 1];
            for (int i = 0; i < commentsCount; i++) {
                if (comments[i] == null) break;
                newComments[i] = comments[i];
            }
            comments = newComments;
        }
        //remove comment from array
        for (int i = 0; i < commentsCount; i++) {
            if (comments[i].equals(c)) {
                while (i < commentsCount - 1) {
                    comments[i] = comments[i + 1];
                }
            }
        }

        comments[commentsCount--] = null;
        //remove reply from all comments in the chain
        if (c.getParent() != null) {
            c.getParent().removeReply(c);
        }
    }

    public void addLike() {
        likes++;
    }

    public void removeLike() {
        likes--;
    }

    public int getLikes() {
        return likes;
    }
}
