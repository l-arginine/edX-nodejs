module.exports = {
    /* GET request to get all comments on a post */
    getComments(req, res) {
        let postID = req.params.postId;
        let commentID = req.params.comment_id;
        let comments = req.blog.posts[postID].comments;
        if(req.params.comment_id){
            res.status(200).send(comments[commentID]);
        }
        res.status(200).send(comments);
    },
    /* POST request to add a new comment to existing comments object or create a comments object with posted data */
    addComment(req, res) {
        if(req.body.comment != undefined){
            let postID = req.params.postId;
            let commentsLen = req.blog.posts[postID].comments.length;
            if (commentsLen != 0) {
                req.blog.posts[postID].comments.push(req.body.comment);
            } else {
                req.blog.posts[postID].comments = [req.body.comment];
            }
            res.status(200).send({
                comment: "added",
                post: req.blog.posts[postID]
            })
        } else {
            res.status(200).send({
                comment: "added",
                post: req.blog.posts[postID]
            })
        }
    },
    /* Update a certain comment if it exists */
    updateComment(req, res) {
        let postID = req.params.postId;
        let commentID = req.params.comment_id;
        if (req.blog.posts[postID].comments[commentID] != undefined) {
            req.blog.posts[postID].comments[commentID] = req.body.comment;
            res.status(200).send({
                comment: "updated",
                post: req.blog.posts[postID]
            })
        } else {
            res.status(404).send("Comment does not exist");
        }
    },
    /* Delete a certain comment if it exists */
    removeComment(req, res) {
        let postID = req.params.postId;
        let commentID = req.params.comment_id;
        if (req.blog.posts[postID].comments[commentID] != undefined) {
            req.blog.posts[postID].comments.splice(commentID, 1);
            res.status(204).send()
        } else {
            res.status(404).send("Comment does not exist");
        }
    }
}