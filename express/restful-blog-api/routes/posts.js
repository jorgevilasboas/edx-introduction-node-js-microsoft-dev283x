module.exports = {
  getPosts(req, res) {    
    res.status(200).send(req.store.posts)
  },
  addPost(req, res) {
    // Check for bad requests
    if(!req.body) return res.sendStatus(400)
    let newPost = req.body
    store.posts.push(newPost)
    res.status(201).send(newPost)
  },
  updatePost(req, res) {
    // Check for bad requests
    if(!req.params.postId) return res.sendStatus(400)
    // update posts if there is a postId
    req.store.posts[req.params.postId] = Object.assign(req.store.posts[req.params.postId], req.body)
    // return ok status 200 with the post
    res.status(200).send(req.store.posts[req.params.postId])
  },
  removePost(req, res) {
    // Check for bad requests
    if(!req.params.postId) return res.sendStatus(400)
    // delete post
    req.store.posts.splice(req.params.postId, 1)
    // 204 No Content - The server successfully processed the request and is not returning any content
    res.status(204).send()
  }
}