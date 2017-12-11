  module.exports = {
    getComments(req, res) {
      if(!req.params.postId) return res.sendStatus(400)
      res.status(200).send(req.store.posts[req.params.postId].comments)
    },
    addComment(req, res) {
      if(!req.params.postId) return res.sendStatus(400)
      let newComment = req.body
      let comments = req.store.posts[req.params.postId].comments
      let commentId = comments.length
      comments.push(newComment)
      res.status(201).send({
        commentId: commentId
      })
    },
    updateComment(req, res) {
      if(!req.params.postId || !req.params.commentId) return res.sendStatus(400)
      req.store.posts[req.params.postId].comments[req.params.commentId] = Object.assign(req.store.posts[req.params.postId].comments[req.params.commentId], req.body)
      res.status(200).send(req.store.posts[req.params.postId].comments[req.params.commentId])
    },
    removeComment(req, res) {
      if(!req.params.postId || !req.params.commentId) return res.sendStatus(400)
      req.store.posts[req.params.postId].comments.splice(req.params.commentId, 1)
      res.status(204).send()
    }
  }