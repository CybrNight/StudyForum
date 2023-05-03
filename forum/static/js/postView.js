
class PostView {

    constructor(postTitle, postContent, btnUpvote, btnDownvote) {
        this.postTitle = postTitle;
        this.postContent = postContent;
        this.btnUpvote = btnUpvote;
        this.btnDownvote = btnDownvote;
        this.postCount = document.getElementById("post-vote-count");
    }

    async upvotePost() {
        const uuid = post.uuid;
        const title = post.title;

        let response = await fetch(`/posts/${uuid}/${title}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "vote-type": "UP" })
        });

        if (response.ok) {
            const data = await response.json();
            this.postCount.innerText = data.votes;
        }
    }

    async downvotePost() {
        const uuid = post.uuid;
        const title = post.title;

        let response = await fetch(`/posts/${uuid}/${title}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "vote-type": "DOWN" })
        });

        if (response.ok) {
            const data = await response.json();
            this.postCount.innerText = data.votes;
        }
    }
}

window.onload = function () {
    const postTitle = document.getElementById("post-title");
    const postContent = document.getElementById("post-content")

    const btnUpvote = document.getElementById("post-upvote")
    const btnDownvote = document.getElementById("post-downvote")

    c = new PostView(postTitle, postContent, btnUpvote, btnDownvote);

    btnUpvote.addEventListener('mouseup', button => {
        c.upvotePost();
    })

    btnDownvote.addEventListener('mouseup', button => {
        c.downvotePost();
    })
}