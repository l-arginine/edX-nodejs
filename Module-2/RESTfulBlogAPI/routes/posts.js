module.exports = {
    /* GET request for all posts or a specific post  */
    getPosts(req, res) {
        if (req.params.postId) {
            if (req.blog.posts[req.params.postId]){
                res.status(200).send(req.blog.posts[req.params.postId])
            } else {
                res.status(404).send("Post does not exist");
            }
        } else {
            res.status(200).send(req.blog.posts)
        }
    },
    /* POST request to create a new post */
    addPost(req, res) {
        let len = req.blog.posts.length
        let payload = createPayload(req);
        req.blog.posts.push(payload);
        res.status(200).send({
            id: len,
            request: req.blog.posts[len]
        });
    },
    /* PUT/PATCH request to update a certain record if it exists */
    updatePost(req, res) {
        let postId = req.params.postId;
        let payload = createPayload(req);
        if (req.blog.posts[postId] != undefined) {
            Object.keys(payload).forEach( function (k) {
                if(k == "comments") {
                    console.log(payload[k][0])
                }
                if(payload[k] != undefined && k != "comments" ) {
                    req.blog.posts[postId][k] = payload[k];
                } else if (k == "comments" && payload[k][0] != undefined) {
                    req.blog.posts[postId][k].push(payload[k][0]);
                }
            })
            res.status(200).send({Status: "Updated", PostId: postId, post: req.blog.posts[postId]});
        } else {
            res.status(404).send("Post does not exist");            
        }
    },
    /* DELETE request to remove a certain record if it exists */
    removePost(req, res) {
        let postId = req.params.postId;
        if (req.blog.posts[postId] != undefined) {
            req.blog.posts.splice(postId, 1);
            res.status(204).send();
        } else {
            res.status(404).send("Post does not exist");
        }
    }
}

/* A function that extracts only the necessary parameters from the request body before sending to server/script */
function createPayload(input) {
    let output = {
        name: input.body.name,
        url: input.body.url,
        text: input.body.text,
        comments: [
            input.body.comments
        ]
    }
    return output
}