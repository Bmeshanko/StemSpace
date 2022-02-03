package Springboot;
public class Comment {
    private String text;
    private Profile author;
    private Comment[] replies;
    private int repliesCount;
    private Post post;
    private Comment parent;

    public Comment(String text, Profile author, Post post, Comment parent) {
        this.text = text;
        this.author = author;
        this.post = post;
        this.parent = parent;

        // This will add the comment as a reply on the parent.
        if (parent != null) {
            parent.addReply(this);
        }
    }

    public void addReply(Comment c) {
        if (repliesCount == replies.length) {
            Comment[] newReplies = new Comment[repliesCount * 2];
            for (int i = 0; i < repliesCount; i++) {
                newReplies[i] = replies[i];
            }
            replies = newReplies;
        }
        replies[repliesCount++] = c;
    }
}
