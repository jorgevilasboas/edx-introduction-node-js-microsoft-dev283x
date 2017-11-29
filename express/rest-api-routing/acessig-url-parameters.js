// Accessing URL Parameters

app.get('/users/:id', (request, response) => {
    const userId = request.params.id
    fetchUser(userId, (error, user) => {
      if (error) return response.status(500).send(error)
      response.send(user)
    })
  })


  // Multiple URL Parameters

  app.get('/users/:id/transactions/:transactionId/:filter', (req, res) => {
    const usersId = request.params.id,
      transactionId = request.params.transactionId,
      filter = request.params.filter
    res.status(200).send()
  })