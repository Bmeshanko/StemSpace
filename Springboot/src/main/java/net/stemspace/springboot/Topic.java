package net.stemspace.springboot;
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

    public int getFollowersCount(){
        return followersCount;
    }

    public void addFollower(Profile p) {
        //if follwers array is full, double array size
        if (followersCount == followers.length) {
            Profile[] newFollowers = new Profile[followersCount * 2];
            for (int i = 0; i < followersCount; i++) {
                newFollowers[i] = followers[i];
            }
            followers = newFollowers;
        }
        //add new follower at end of array + increase followersCount
        followers[followersCount++] = p;
    }

    public void removeFollower(Profile p) {
        //if followers array is less than half full, shorten array
        if (followersCount * 2 < followers.length) {
            Profile[] newFollowers = new Profile[followersCount + 1];
            for (int i = 0; i < followersCount; i++) {
                if (followers[i] == null) break;
                newFollowers[i] = followers[i];
            }
            followers = newFollowers;
        }
        //remove follower and decrease followersCount
        for (int i = 0; i < followersCount; i++) {
            if (followers[i].equals(p)) {
                while (i < followersCount - 1) {
                    followers[i] = followers[i + 1];
                }
            }
        }
        followers[followersCount--] = null;
    }

    public int getPostCount(){
        return postsCount;
    }

    public void addPost(Post p) {
        //if post array is full, double array length, add new post to end of array, increase postCount
        if (postsCount == posts.length) {
            Post[] newPosts = new Post[postsCount * 2];
            for (int i = 0; i < postsCount; i++) {
                newPosts[i] = posts[i];
            }
            posts = newPosts;
        }
        posts[postsCount++] = p;
    }

    public void removePost(Post p) {
        //if post array is less than half full, shorten array
        if (postsCount * 2 < posts.length) {
            Post[] newPosts = new Post[postsCount + 1];
            for (int i = 0; i < postsCount; i++) {
                if (posts[i] == null) break;
                newPosts[i] = posts[i];
            }
            posts = newPosts;
        }
        //remove post and decrease postCount
        for (int i = 0; i < postsCount; i++) {
            if (posts[i].equals(p)) {
                while (i < postsCount - 1) {
                    posts[i] = posts[i + 1];
                }
            }
        }
        posts[postsCount--] = null;
    }
}
