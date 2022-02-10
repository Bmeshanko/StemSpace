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

    public void addComment(Comment c) {
        if (commentsCount == comments.length) {
            Comment[] newComments = new Comment[commentsCount * 2];
            for (int i = 0; i < commentsCount; i++) {
                newComments[i] = comments[i];
            }
            comments = newComments;
        }
        comments[commentsCount++] = c;
    }

    public void removeComment(Comment c) {
        if (commentsCount * 2 < comments.length) {
            Comment[] newComments = new Comment[commentsCount + 1];
            for (int i = 0; i < commentsCount; i++) {
                if (comments[i] == null) break;
                newComments[i] = comments[i];
            }
            comments = newComments;
        }

        for (int i = 0; i < commentsCount; i++) {
            if (comments[i].equals(c)) {
                while (i < commentsCount - 1) {
                    comments[i] = comments[i + 1];
                }
            }
        }
        comments[commentsCount--] = null;
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
