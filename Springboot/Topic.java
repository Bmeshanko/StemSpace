package Springboot;
/*

Default List of Topics:
1. Sports
2. Compsci
3. Earth
4. Politics
5. Biology
6. Engineering
7. Math
8. Funny
9. Gaming
10. Psychology
11. Fitness
12. Blogs
13. Music
14. Art
15. Health

*/
public class Topic {
    private String name;
    private String description;
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

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public void addFollower(Profile p) {
        if (followersCount == followers.length) {
            Profile[] newFollowers = new Profile[followersCount * 2];
            for (int i = 0; i < followersCount; i++) {
                newFollowers[i] = followers[i];
            }
            followers = newFollowers;
        }
        followers[followersCount++] = p;
    }

    public void removeFollower(Profile p) {
        if (followersCount * 2 < followers.length) {
            Profile[] newFollowers = new Profile[followersCount + 1];
            for (int i = 0; i < followersCount; i++) {
                if (followers[i] == null) break;
                newFollowers[i] = followers[i];
            }
            followers = newFollowers;
        }

        for (int i = 0; i < followersCount; i++) {
            if (followers[i].equals(p)) {
                while (i < followersCount - 1) {
                    followers[i] = followers[i + 1];
                }
            }
        }
        followers[followersCount--] = null;
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
